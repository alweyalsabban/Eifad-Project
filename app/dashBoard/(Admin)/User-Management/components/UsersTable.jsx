"use client";

import { useState } from "react";
import UserTableRow from "./UserTableRow";
import UserDetailsModal from "./UserDetailsModal";
import ResumePage from "@/app/dashBoard/(JobSeekerModel)/cv/components/CVPDF";
import { UseManagmentAPI } from "../../CallApiForAdmin";

export default function UsersTable({ users }) {
  const [openCv, setOpenCv] = useState(false);
  const [openUsrDeail, setOpenUsrDeail] = useState(false);
  const [CVInfo, setCVInfo] = useState([]);
  const [Profile, setProfile] = useState([]);
  const [usetDeatil, setUsrDeatail] = useState([]);

  async function onView(UserId) {
    const res = await UseManagmentAPI("DeatilCv", { UserId });
    setCVInfo(res?.dataResponse?.data?.cv);
    setProfile({
      FullName: res?.dataResponse?.data?.FullName,
      Phone: res?.dataResponse?.data?.Phone,
      Email: res?.dataResponse?.data?.Email,
      Location: res?.dataResponse?.data?.Location,
    });
    setOpenCv(true);
  }

  return (
    <>
      {openUsrDeail && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur h-lvw z-50">
          <div className="min-h-screen flex items-center justify-center">
            <UserDetailsModal
              setOpenUsrDeail={setOpenUsrDeail}
              user={usetDeatil}
            />
          </div>
        </div>
      )}

      {openCv && (
        <div className="fixed inset-0 z-50 bg-black/60 h-lvw">
          <button
            type="button"
            onClick={() => {
              setOpenCv(false);
            }}
            className="fixed top-4 left-1/2 z-100 -translate-x-1/2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-100"
          >
            إغلاق المعاينة
          </button>

          <div className="h-screen overflow-y-auto overflow-x-hidden pt-20">
            <div className="mx-auto w-full max-w-[230mm] px-4 md:px-6">
              <ResumePage CVInfo={CVInfo} Profile={Profile} />
            </div>
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250 border-collapse text-sm">
            <thead className="bg-[#fafafa]">
              <tr className="text-right text-base font-semibold text-[#1f2a44]">
                <th className="px-4 py-4">الاسم</th>
                <th className="px-4 py-4">البريد الإلكتروني</th>
                <th className="px-4 py-4">الدور</th>
                <th className="px-4 py-4">حالة التحقق</th>
                <th className="px-4 py-4">حالة الحساب</th>
                <th className="px-4 py-4">تاريخ الإنشاء</th>
                <th className="px-4 py-4">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <UserTableRow
                  key={user.UserID}
                  user={user}
                  onView={() => {
                    onView(user.UserID);
                  }}
                  setUsrDeatail={setUsrDeatail}
                  setOpenUsrDeail={setOpenUsrDeail}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
