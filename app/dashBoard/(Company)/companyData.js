import { FiBriefcase, FiUsers, FiUserCheck } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

export const InfoMainCard = [
  {
    id: 1,
    icons: (
      <FiBriefcase
        size={40}
        className="bg-primaryBlue text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "8",
    name: "الإعلانات النشطة",
  },
  {
    id: 2,
    icons: (
      <FiUsers
        size={40}
        className="bg-green-500 text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "127",
    name: "إجمالي المتقدمين",
  },
  {
    id: 3,
    icons: (
      <FiUserCheck
        size={40}
        className="bg-purple-600 text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "18",
    name: "المرشحين المختارين",
  },
  {
    id: 4,
    icons: (
      <BiMessageDetail
        size={40}
        className="bg-orange-400 text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "12",
    name: "الرسائل الجديدة",
  },
];

export const InfoCardActionCompany = [
  {
    id: 1,
    icons: <FaPlus size={45} className="text-primaryBlue p-2 rounded-xl" />,
    name: "رفع السيرة الذاتية",
  },
  {
    id: 2,
    icons: <FaSearch size={45} className="text-green-500 p-2 rounded-xl" />,
    name: "البحث عن مرشحين",
  },
  {
    id: 3,
    icons: <FiUsers size={45} className="text-purple-500 p-2 rounded-xl" />,
    name: "عرض الطلبات",
  },
];

export const jobs = [
  {
    id: 1,
    title: "مهندس برمجيات أول",
    applicants: 28,
    views: 342,
    daysAgo: 3,
  },
  {
    id: 2,
    title: "مصمم واجهات المستخدم",
    applicants: 35,
    views: 521,
    daysAgo: 3,
  },
  {
    id: 3,
    title: "مدير منتجات",
    applicants: 19,
    views: 289,
    daysAgo: 3,
  },
];
