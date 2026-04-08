import { IconType } from "react-icons";

export interface StatusCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  borderColor: string;
  iconColor?: string;
}

export interface tInfoCard {
  title: string;
  value: string;
  description: string;
  icon: IconType;
  iconBg: string;
}

export interface tInfoCardData {
  id: number;
  title: string;
  value: string;
  description: string;
  icon: IconType;
  iconBg: string;
}

export interface tAleartCardData {
  id: number;
  title: string;
  value: number | string;
  icon: IconType;
  borderColor: string;
  iconColor?: string;
}

export interface ActivityItem {
  id: number;
  title: string;
  time: string;
}

export interface RecentActivitiesProps {
  heading?: string;
  activities: ActivityItem[];
}

export interface QuickActionItem {
  id: number;
  title: string;
  icon: IconType;
  onClick?: () => void;
}

export interface QuickActionsProps {
  heading?: string;
  actions: QuickActionItem[];
}
