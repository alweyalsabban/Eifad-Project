// import Image from "next/image";
// import { cookies } from "next/headers";
// import Link from "next/link";
// import { GoBell } from "react-icons/go";
// import { GrLanguage } from "react-icons/gr";
// import { FiSearch } from "react-icons/fi";
// import { personInformation } from "../data";
// import { ApiFetchServer } from "../../lib/ApiFetchServer";
// async function Header() {
//   const cookieStore = await cookies();
//   const role = cookieStore.get("role")?.value;
//   const name = cookieStore.get("name")?.value;
//   async function getData() {
//     if (role === "JobSeeker") {
//       const res = await ApiFetchServer("/profile");
//       return res.dataResponse.data.PersonalPhoto;
//     }
//     if (role === "Employer") {
//       const res = await ApiFetchServer("/auth/me");
//       return res.dataResponse.data.company_profile.LogoPath;
//     }
//     if (role === "Admin") {
//       const res = await ApiFetchServer("/profile");
//       return res.dataResponse.data.PersonalPhoto;
//     }
//   }

//   const URL = await getData();

//   return (
//     <div
//       className="bg-auxiliaryColorWhite border border-secondGray w-[80%] py-1 px-5
//       m-auto my-10 rounded-full flex  items-center justify-between"
//       dir="rtl"
//     >
//       <div className="flex justify-center items-center gap-4">
//         <div className="border w-15 h-15 rounded-full flex items-center justify-center">
//           {URL === null ? (
//             <div className="bg-auxiliaryColorGray w-13 h-13 rounded-full"></div>
//           ) : (
//             <Image
//               src={URL}
//               width={100}
//               height={100}
//               alt="صورة الملف الشخصي"
//               className=" w-15 h-15 object-cover rounded-full "
//             />
//           )}
//         </div>
//         <div>
//           <h1 className="font-bold text-[18px]">
//             {personInformation.name || name}
//           </h1>
//           <h1 className="font-light text-[14px]">
//             {personInformation.role || role === "JobSeeker"
//               ? "باحث عن عمل"
//               : personInformation.role || role === "Employer"
//                 ? "صاحب شركة"
//                 : personInformation.role || role === "Admin"
//                   ? "مسؤول النظام"
//                   : ""}
//           </h1>
//         </div>
//         <div className="flex gap-4 text-[#C6C8CC]">
//           <GoBell
//             size={20}
//             /*       onClick={() => {
//               // To show Notif
//             }} */
//             className="hover:cursor-pointer"
//           />
//           <GrLanguage
//             size={20}
//             /*      onClick={() => {
//               // To change language
//             }} */
//             className="hover:cursor-pointer"
//           />
//         </div>
//       </div>
//       <div className="flex items-center justify-between gap-4 w-xl h-12 bg-[#FAFAFA] rounded-full">
//         <input
//           type="text"
//           className=" w-full h-full rounded-full outline-none p-6"
//           placeholder={`${
//             role === "JobSeeker"
//               ? "إبحث عن وظيفة ..."
//               : role === "Employer"
//                 ? "إبحث عن موظف ..."
//                 : "إبحث عن مستخدم ...."
//           }`}
//         />
//         <div
//           className="p-2 bg-primaryColorBlue text-auxiliaryColorWhite rounded-full
//         items-center flex justify-center hover:cursor-pointer ml-4"
//         >
//           <FiSearch size={20} className="rotate-100" />
//         </div>
//       </div>
//       <div>
//         <Link href="/dashBoard/main">
//           <Image src="/assets/logo.svg" alt="logo" width={120} height={60} />
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Header;
import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";

import { personInformation } from "../data";
import { ApiFetchServer } from "../../lib/ApiFetchServer";
import HeaderSearch from "./HeaderSearch";
import AlertLanguageBtn from "./AlertLanguageBtn";

async function Header() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  const name = cookieStore.get("name")?.value;

  async function getData() {
    try {
      if (role === "JobSeeker") {
        const res = await ApiFetchServer("/profile");
        return res?.dataResponse?.data?.PersonalPhoto ?? null;
      }

      if (role === "Employer") {
        const res = await ApiFetchServer("/auth/me");
        return res?.dataResponse?.data?.company_profile?.LogoPath ?? null;
      }

      if (role === "Admin") {
        const res = await ApiFetchServer("/profile");
        return res?.dataResponse?.data?.PersonalPhoto ?? null;
      }

      return null;
    } catch {
      return null;
    }
  }

  const URL = await getData();

  const roleText =
    role === "JobSeeker"
      ? "باحث عن عمل"
      : role === "Employer"
        ? "صاحب شركة"
        : role === "Admin"
          ? "مسؤول النظام"
          : "";

  const homeLink =
    role === "JobSeeker"
      ? "/dashBoard/main"
      : role === "Employer"
        ? "/dashBoard/panale"
        : "/dashBoard/controll";

  return (
    <div
      className="bg-auxiliaryColorWhite border border-secondGray w-[80%] py-1 px-5 
      m-auto my-10 rounded-full flex items-center justify-between"
      dir="rtl"
    >
      <div className="flex justify-center items-center gap-4">
        <div className="border w-15 h-15 rounded-full flex items-center justify-center">
          {!URL ? (
            <div className="bg-auxiliaryColorGray w-13 h-13 rounded-full"></div>
          ) : (
            <Image
              src={URL}
              width={100}
              height={100}
              alt="صورة الملف الشخصي"
              className="w-15 h-15 object-cover rounded-full"
            />
          )}
        </div>

        <div>
          <h1 className="font-bold text-[18px]">
            {personInformation.name || name}
          </h1>
          <h1 className="font-light text-[14px]">
            {personInformation.role || roleText}
          </h1>
        </div>

        <AlertLanguageBtn />
      </div>

      <HeaderSearch role={role} />

      <div>
        <Link href={homeLink}>
          <Image src="/assets/logo.svg" alt="logo" width={120} height={60} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
