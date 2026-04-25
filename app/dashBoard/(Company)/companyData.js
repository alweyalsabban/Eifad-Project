import { FiBriefcase, FiUsers, FiUserCheck } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FiMapPin, FiDollarSign } from "react-icons/fi";

console.log("===============================");
export const InfoMainCard = (data) => [
  {
    id: 1,
    icons: (
      <FiBriefcase
        size={40}
        className="bg-primaryBlue text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: data.total_jobs_posted,
    name: "إجمالي الوظائف المنشورة",
  },
  {
    id: 2,
    icons: (
      <FiUsers
        size={40}
        className="bg-green-500 text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: data.total_applications_received,
    name: "إجمالي الطلبات المستلمة",
  },
  {
    id: 3,
    icons: (
      <FiUserCheck
        size={40}
        className="bg-purple-600 text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: data.profile_views,
    name: "مشاهدات الملف الشخصي",
  },
  /*   {
    id: 4,
    icons: (
      <BiMessageDetail
        size={40}
        className="bg-orange-400 text-auxiliaryColorWhite p-2 rounded-xl"
      />
    ),
    number: "12",
    name: "الرسائل الجديدة",
  }, */
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

export const basicFields = [
  {
    label: "المسمى الوظيفي*",
    name: "title",
    placeholder: "مثال: مهندس برمجيات أول",
    icon: FiBriefcase,
    colSpan: "sm:col-span-2",
  },
  {
    label: "الفئة*",
    name: "category",
    colSpan: "sm:col-span-2",
  },
  {
    label: "الموقع*",
    name: "location",
    icon: FiMapPin,
  },
  {
    label: "نوع العمل*",
    name: "workType",
  },
  {
    label: "مستوى الخبرة*",
    name: "experienceLevel",
  },
  {
    label: "نوع التوظيف*",
    name: "employmentType",
  },
  {
    label: "الحد الأدنى",
    name: "salaryMin",
    placeholder: "الحد الأدنى",
    icon: FiDollarSign,
  },
  {
    label: "الحد الأقصى",
    name: "salaryMax",
    placeholder: "الحد الأقصى",
    icon: FiDollarSign,
  },
];

export const detailsFields = [
  {
    label: "وصف الوظيفة*",
    name: "description",
    placeholder: "اكتب وصفًا تفصيليًا للوظيفة...",
    textarea: true,
    rows: 5,
  },
  {
    label: "المتطلبات*",
    name: "requirements",
    placeholder: "اكتب متطلبات الوظيفة (كل متطلب في سطر جديد)",
    textarea: true,
    rows: 5,
  },
  {
    label: "المسؤوليات*",
    name: "responsibilities",
    placeholder: "اكتب مسؤوليات الدور (كل مسؤولية في سطر جديد)",
    textarea: true,
    rows: 5,
  },
  {
    label: "المهارات المطلوبة*",
    name: "skills",
    placeholder: "React, Node.js, AWS",
  },
  {
    label: "من تاريخ",
    name: "startDate",
    type: "date",
  },
  {
    label: "إلى تاريخ",
    name: "endDate",
    type: "date",
  },
];
