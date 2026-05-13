import { FiUser, FiFileText, FiTarget } from "react-icons/fi";
import { IoMdSearch, IoMdTrendingUp, IoIosLogOut } from "react-icons/io";

import { RiHome3Line } from "react-icons/ri";
import { IoSparklesOutline } from "react-icons/io5";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa6";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { LuBuilding2 } from "react-icons/lu";
import { LuBriefcase } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";

import { MdOutlineMarkunreadMailbox } from "react-icons/md";

import { FiGrid, FiUsers } from "react-icons/fi";
import { LiaCertificateSolid } from "react-icons/lia";
import { FiBriefcase } from "react-icons/fi";

export const JobseekerSideBar = (number) => [
  {
    id: 1,
    name: "لوحة التحكم",
    icon: (
      <RiHome3Line
        size={20}
        className={`iconSildeBarStyle ${number === 1 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/main",
  },
  {
    id: 2,
    name: "الملف الشخصي",
    icon: (
      <FiUser
        size={20}
        className={`iconSildeBarStyle ${number === 2 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/profile",
  },
  {
    id: 3,
    name: "السيرة الذاتية",
    icon: (
      <FiFileText
        size={20}
        className={`iconSildeBarStyle ${number === 3 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/cv",
  },
  {
    id: 4,
    name: "تحليل السيرة الذاتية",
    icon: (
      <IoSparklesOutline
        size={20}
        className={`iconSildeBarStyle ${number === 4 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/analaize-cv",
  },
  {
    id: 5,
    name: "البحث عن وظائف",
    icon: (
      <IoMdSearch
        size={20}
        className={`iconSildeBarStyle ${number === 5 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/search-job",
  },
  {
    id: 6,
    name: "الوظائف الموصى بها",
    icon: (
      <FiTarget
        size={20}
        className={`iconSildeBarStyle ${number === 6 && "text-[#155DFC]!"} `}
      />
    ),
    href: "/dashBoard/recommed-job",
  },
  {
    id: 7,
    name: "متابعة الطلبات",
    icon: (
      <MdOutlineMarkunreadMailbox
        size={20}
        className={`iconSildeBarStyle ${number === 7 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/job-applications",
  },
  {
    id: 8,
    name: "خارطة الطريق المهنية",
    icon: (
      <IoMdTrendingUp
        size={20}
        className={`iconSildeBarStyle ${number === 8 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/road-map",
  },
  {
    id: 9,
    name: "إتجاهات السوق",
    icon: (
      <AiOutlineBarChart
        size={20}
        className={`iconSildeBarStyle ${number === 9 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/trend-market",
  },
  {
    id: 10,
    name: "الوظائف المفضلة",
    icon: (
      <FaRegStar
        size={20}
        className={`iconSildeBarStyle ${number === 10 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/favorite-jobs",
  },
  {
    id: 11,
    name: "الصفحات",
    icon: (
      <BsLayoutTextWindowReverse
        size={20}
        className={`iconSildeBarStyle ${number === 11 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/search-pages",
  },
  /*   {
    id: 12,
    name: "الرسائل",
    icon: (
      <BiMessage
        size={20}
        className={`iconSildeBarStyle ${number === 12 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/messages",
  }, */
];

export const CompanySideBar = (number) => [
  {
    id: 1,
    name: "الواجهة الرئيسية",
    icon: (
      <RiHome3Line
        size={20}
        className={`iconSildeBarStyle ${number === 1 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/panale",
  },
  {
    id: 2,
    name: "ملف الشركة",
    icon: (
      <LuBuilding2
        size={20}
        className={`iconSildeBarStyle ${number === 2 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/my-profile",
  },
  {
    id: 3,
    name: "إدارة الوظائف",
    icon: (
      <LuBriefcase
        size={20}
        className={`iconSildeBarStyle ${number === 3 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/job-management",
  },
  {
    id: 4,
    name: "إدارة المرشحين",
    icon: (
      <LuUsers
        size={20}
        className={`iconSildeBarStyle ${number === 4 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/candidates",
  },
  {
    id: 5,
    name: "البحث عن موظفين",
    icon: (
      <IoMdSearch
        size={23}
        className={`iconSildeBarStyle ${number === 5 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/search-employee",
  },
  /*  {
    id: 6,
    name: "الرسائل",
    icon: (
      <BiMessage
        size={20}
        className={`iconSildeBarStyle ${number === 6 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/message",
  }, */
  {
    id: 7,
    name: "حالة التحقق",
    icon: (
      <GoShieldCheck
        size={20}
        className={`iconSildeBarStyle ${number === 7 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/verification",
  },
];

export const AdminSideBar = (number) => [
  {
    id: 1,
    name: "لوحة التحكم",
    icon: (
      <FiGrid
        size={20}
        className={`iconSildeBarStyle ${number === 1 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/controll",
  },
  {
    id: 2,
    name: "إدارة المستخدمين",
    icon: (
      <FiUsers
        size={20}
        className={`iconSildeBarStyle ${number === 2 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/User-Management",
  },
  {
    id: 3,
    name: "التحقق من الشركات",
    icon: (
      <LuBuilding2
        size={20}
        className={`iconSildeBarStyle ${number === 3 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/Company-verification",
  },
  {
    id: 4,
    name: "التحقق من الشهادات",
    icon: (
      <LiaCertificateSolid
        size={25}
        className={`iconSildeBarStyle ${number === 4 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/Certificate-verification",
  },
  {
    id: 5,
    name: "إدارة الإعلانات الوظيفية",
    icon: (
      <FiBriefcase
        size={20}
        className={`iconSildeBarStyle ${number === 5 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/Job-posting-management",
  },
  /* {
    id: 6,
    name: "مراقبة التطبيقات",
    icon: (
      <FiFileText
        size={20}
        className={`iconSildeBarStyle ${number === 6 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/App-monitoring",
  },
  {
    id: 7,
    name: "التقارير و التحليلات",
    icon: (
      <AiOutlineBarChart
        size={23}
        className={`iconSildeBarStyle ${number === 7 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/Reports-analyses",
  },
  {
    id: 8,
    name: "صندوق الدعم",
    icon: (
      <BiMessage
        size={20}
        className={`iconSildeBarStyle ${number === 8 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/Support-Fund",
  }, */
];

export const TwoIcon = (number) => [
  /* {
    id: 13,
    name: "الإعادات",
    icon: (
      <LuSettings
        size={20}
        className={`iconSildeBarStyle ${number === 13 && "text-[#155DFC]!"}`}
      />
    ),
    href: "/dashBoard/Settings",
  }, */
  {
    id: 14,
    name: "الخروج",
    icon: (
      <IoIosLogOut size={20} className="iconSildeBarStyle text-red-500! " />
    ),
    href: "/login",
  },
];

export const personInformation = {
  name: "",
  gmail: "",
  role: "",
  gender: "",
};
