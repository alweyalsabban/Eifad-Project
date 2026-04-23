import Image from "next/image";
import Link from "next/link";
import { GoBell } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { cookies } from "next/headers";
import { personInformation } from "../data";
import { ApiFetchServer } from "../../lib/ApiFetchServer";

async function SmHeader() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  const name = cookieStore.get("name")?.value;

  async function getData() {
    const res = await ApiFetchServer("/profile");
    return res.dataResponse.data.PersonalPhoto;
  }

  const URL = await getData();

  const currentName = personInformation.name || name || "";

  const currentRole =
    personInformation.role || role === "JobSeeker"
      ? "باحث عن عمل"
      : personInformation.role || role === "Employer"
        ? "صاحب شركة"
        : personInformation.role || role === "Admin"
          ? "مسؤول النظام"
          : "";

  return (
    <header dir="rtl" className="mx-auto my-10 w-[95%] lg:w-[80%]">
      <div
        className="
          bg-auxiliaryColorWhite border border-secondGray
          px-4 lg:px-5 py-3
          rounded-2xl lg:rounded-full
          flex flex-col lg:flex-row
          gap-4
          lg:items-center lg:justify-between
        "
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="border w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              {URL === null ? (
                <div className="bg-auxiliaryColorGray w-10 h-10 rounded-full" />
              ) : (
                <Image
                  src={URL}
                  width={100}
                  height={100}
                  alt="صورة الملف الشخصي"
                  className="w-10 h-10 object-cover rounded-full"
                />
              )}
            </div>

            <div className="min-w-0">
              <h1 className="font-bold text-[16px] lg:text-[18px] truncate">
                {currentName}
              </h1>
              <p className="font-light text-[12px] lg:text-[14px] text-gray-500 truncate">
                {currentRole}
              </p>
            </div>

            <div className="hidden sm:flex gap-4 text-[#C6C8CC] mr-2">
              <GoBell className="hover:cursor-pointer" size={20} />
              <GrLanguage className="hover:cursor-pointer" size={20} />
            </div>
          </div>

          <Link href="/dashBoard/main" className="shrink-0">
            <Image src="/assets/logo.svg" alt="logo" width={120} height={60} />
          </Link>
        </div>

        <div className="flex sm:hidden gap-4 text-[#C6C8CC]">
          <GoBell className="hover:cursor-pointer" size={20} />
          <GrLanguage className="hover:cursor-pointer" size={20} />
        </div>

        <div className="w-full lg:w-130">
          <div className="flex items-center gap-3 h-12 bg-[#FAFAFA] rounded-full border border-transparent">
            <input
              type="text"
              className="w-full h-full rounded-full outline-none px-6 bg-transparent text-sm"
              placeholder={`${
                role === "JobSeeker"
                  ? "إبحث عن وظيفة ..."
                  : role === "Employer"
                    ? "إبحث عن موظف ..."
                    : "إبحث عن مستخدم ...."
              }`}
            />
            <button
              className="p-2 bg-primaryColorBlue text-auxiliaryColorWhite rounded-full
                         flex items-center justify-center hover:cursor-pointer ml-3"
              aria-label="search"
            >
              <FiSearch size={20} className="rotate-100" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SmHeader;
