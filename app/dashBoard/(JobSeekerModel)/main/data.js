import { LuCircleCheckBig } from "react-icons/lu";

import { HiOutlineTrendingUp } from "react-icons/hi";
import { LuTarget } from "react-icons/lu";
import { MdSearch } from "react-icons/md";
import { LuUpload } from "react-icons/lu";

export const InfoCardMain = [
  {
    id: 1,
    icons: (
      <LuCircleCheckBig
        size={40}
        className="bg-primaryBlue text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "75%",
    name: "اكتمال الملف",
  },
  {
    id: 2,
    icons: (
      <LuCircleCheckBig
        size={40}
        className="bg-[#00C950] text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "23",
    name: "الوظائف المطابقة",
  },
  {
    id: 3,
    icons: (
      <LuCircleCheckBig
        size={40}
        className="bg-[#AD46FF] text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "12",
    name: "الطلبات النشطة",
  },
  {
    id: 4,
    icons: (
      <LuCircleCheckBig
        size={40}
        className="bg-[#FF6900] text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "5%",
    name: "دعوات المقابلات",
  },
];

export const InfoCardAction = [
  {
    id: 1,
    icons: <LuUpload size={45} className="text-primaryBlue p-2 rounded-xl" />,
    name: "رفع السيرة الذاتية",
  },
  {
    id: 2,
    icons: <MdSearch size={45} className=" text-[#00C950] p-2 rounded-xl" />,
    name: "البحث عن وظائف",
  },
  {
    id: 3,
    icons: <LuTarget size={45} className=" text-[#AD46FF] p-2 rounded-xl" />,
    name: "الوظائف الموصى بها",
  },
  {
    id: 4,
    icons: (
      <HiOutlineTrendingUp
        size={45}
        className=" text-[#FF6900] p-2 rounded-xl"
      />
    ),
    name: "خارطة الطريق",
  },
];

export const RecommedJobs = [
  {
    id: 1,
    title: "مهندس برمجيات أول",
    company: "Google",
    timeAgo: "يومين مضت",
    status: (
      <span className="px-3 py-1 text-xs text-green-700 bg-green-100 border border-green-200 rounded-full">
        تقدم
      </span>
    ),
  },
  {
    id: 2,
    title: "مصمم واجهات",
    company: "Microsoft",
    timeAgo: "5 أيام مضت",
    status: (
      <span className="px-3 py-1 text-xs text-green-700 bg-green-100 border border-green-200 rounded-full">
        تقدم
      </span>
    ),
  },
  {
    id: 3,
    title: "مدير منتجات",
    company: "Amazon",
    timeAgo: "أسبوع مضى",
    status: (
      <span className="px-3 py-1 text-xs text-green-700 bg-green-100 border border-green-200 rounded-full">
        تقدم
      </span>
    ),
  },
];
