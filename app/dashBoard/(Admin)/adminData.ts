import { HiOutlineDocumentText } from "react-icons/hi2";
import { FiBriefcase } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";

import { RiBrainLine, RiMedalLine, RiErrorWarningLine } from "react-icons/ri";
import { QuickActionItem, tAleartCardData, tInfoCardData } from "./TypeAdmin";

import {
  RiBuildingLine,
  RiAwardLine,
  RiUserSettingsLine,
} from "react-icons/ri";

export const InfoCardData: tInfoCardData[] = [
  {
    id: 1,
    title: "إجمالي التطبيقات",
    value: "28,456",
    description: "from last month 23%+",
    icon: HiOutlineDocumentText,
    iconBg: "#ff5c00",
  },
  {
    id: 2,
    title: "الإعلانات النشطة",
    value: "1,892",
    description: "from last month 15%+",
    icon: FiBriefcase,
    iconBg: "#9333ea",
  },
  {
    id: 3,
    title: "إجمالي الشركات",
    value: "3,247",
    description: "from last month 8%+",
    icon: LuBuilding2,
    iconBg: "#16a34a",
  },
  {
    id: 4,
    title: "إجمالي المستخدمين",
    value: "12,458",
    description: "from last month 12%+",
    icon: LuUsers,
    iconBg: "#2563eb",
  },
];

export const AleartCardData: tAleartCardData[] = [
  {
    id: 1,
    title: "تنبيهات الذكاء الاصطناعي",
    value: 7,
    icon: RiBrainLine,
    borderColor: "border-red-500",
    iconColor: "text-red-500",
  },
  {
    id: 2,
    title: "مراجعات الشهادات المعلقة",
    value: 18,
    icon: RiMedalLine,
    borderColor: "border-orange-500",
    iconColor: "text-orange-500",
  },
  {
    id: 3,
    title: "التحقق من الشركات المعلقة",
    value: 24,
    icon: RiErrorWarningLine,
    borderColor: "border-yellow-500",
    iconColor: "text-yellow-500",
  },
];

export const RecentActivitiesData = [
  {
    id: 1,
    title: "New user registration: Ahmed Hassan",
    time: "2 minutes ago",
  },
  {
    id: 2,
    title: "Company verification request: Tech Solutions Ltd",
    time: "15 minutes ago",
  },
  {
    id: 3,
    title: "New job posted: Senior Developer at ABC Corp",
    time: "1 hour ago",
  },
  {
    id: 4,
    title: "Certificate review pending: Sara Ali - AWS Certificate",
    time: "2 hours ago",
  },
  {
    id: 5,
    title: "AI flagged suspicious document for review",
    time: "3 hours ago",
  },
];

export const quickActionsData: QuickActionItem[] = [
  {
    id: 1,
    title: "التحقق من شركة",
    icon: RiBuildingLine,
  },
  {
    id: 2,
    title: "مراجعة الشهادات",
    icon: RiAwardLine,
  },
  {
    id: 3,
    title: "إدارة المستخدمين",
    icon: RiUserSettingsLine,
  },
];
