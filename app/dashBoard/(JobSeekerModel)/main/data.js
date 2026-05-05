import { LuCircleCheckBig } from "react-icons/lu";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { LuTarget } from "react-icons/lu";
import { MdSearch } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
export const InfoCardMain = (data) => [
  {
    id: 1,
    icons: (
      <LuCircleCheckBig
        size={40}
        className="bg-primaryBlue text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number:
      data?.dataResponse?.data?.accepted_applications ?? "خطأ في جلب البيانات",
    name: "الطلبات المقبولة",
  },
  {
    id: 2,
    icons: (
      <LuCircleCheckBig
        size={40}
        className="bg-[#00C950] text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: data?.dataResponse?.data?.profile_views ?? "خطأ في جلب البيانات",
    name: "عدد المشاهدات للملف ",
  },
  {
    id: 3,
    icons: (
      <LuCircleCheckBig
        size={40}
        className="bg-[#AD46FF] text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number:
      data?.dataResponse?.data?.rejected_applications ?? "خطأ في جلب البيانات",
    name: "الطلبات المرفوضة",
  },
  {
    id: 4,
    icons: (
      <LuCircleCheckBig
        size={40}
        className="bg-[#FF6900] text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: data.dataResponse.data?.total_applications ?? "خطأ في جلب البيانات",
    name: "إجمالي الطلبات",
  },
];

export const InfoCardAction = [
  /*   {
    id: 1,
    icons: <LuUpload size={45} className="text-primaryBlue p-2 rounded-xl" />,
    name: "رفع السيرة الذاتية",
    link: "/dashBoard/cv",
  }, */
  {
    id: 2,
    icons: <MdSearch size={45} className=" text-[#00C950] p-2 rounded-xl" />,
    name: "البحث عن وظائف",
    link: "/dashBoard/search-job",
  },
  {
    id: 3,
    icons: <LuTarget size={45} className=" text-[#AD46FF] p-2 rounded-xl" />,
    name: "الوظائف الموصى بها",
    link: "/dashBoard/recommed-job",
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
    link: "/dashBoard/road-map",
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
