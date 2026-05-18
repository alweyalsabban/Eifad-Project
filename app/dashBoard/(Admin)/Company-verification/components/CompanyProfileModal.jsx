import { Building2, FileText } from "lucide-react";
import ModalShell from "./ModalShell";
import Link from "next/link";

export default function CompanyProfileModal({ open, onClose, company }) {
  console.log(company);
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={company.CompanyName}
      icon={<Building2 size={18} />}
    >
      <div>
        <div>
          <p className="text-gray-500">وصف الشركة</p>
          <p className="mb-6 pt-2">{company.Description || "لا يوجد وصف"}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <div>
          <p className="text-gray-500">العنوان</p>
          <p className="font-semibold">{company.Address || "لا يوجد عنوان"}</p>
        </div>

        <div>
          <p className="text-gray-500">سنة التأسيس</p>
          <p className="font-semibold">
            {company?.EstablishedYear || "غير موجود"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">رقم التسجيل</p>
          <p className="font-semibold">
            {company.registrationNumber || "غير موجود"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">مجال العمل</p>
          <p className="font-semibold">{company?.FieldOfWork || "غير موجود"}</p>
        </div>

        <div>
          <p className="text-gray-500">الموقع الإلكتروني</p>
          <Link
            href={company?.WebsiteURL || "#"}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {company?.WebsiteURL || "غير موجود"}
          </Link>
        </div>

        <div>
          <p className="text-gray-500">عدد الموظفين</p>
          <p className="font-semibold">
            {company.EmployeeCount + " موظف" || "لا يوجد موظفين"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">بريد صاحب الشركة</p>
          <p className="font-semibold">{company?.user.Email}</p>
        </div>

        <div>
          <p className="text-gray-500">اسم صاحب الشركة</p>
          <p className="font-semibold">{company.user.FullName}</p>
        </div>
      </div>

      {/* Documents */}
      <div className="mt-6">
        <p className="mb-3 text-sm text-gray-500">المستندات</p>

        <div className="space-y-2" dir="rtlss">
          {company?.VerificationDocuments?.length === 0 ||
          company?.VerificationDocuments === null ? (
            <p className="text-center text-gray-500">لا يوجد مستندات مرفوعة</p>
          ) : (
            company?.VerificationDocuments?.map((doc, index) => (
              <Link
                href={doc.path}
                target="_blank"
                rel="noreferrer"
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
              >
                <FileText size={16} />
                <span className="text-sm">{doc.name}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </ModalShell>
  );
}
