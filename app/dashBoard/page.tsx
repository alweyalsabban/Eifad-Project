import type { Metadata } from "next";
import DashBoard from "./DashBoard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "لوحة التحكم",
};

export default function Page() {
  return <DashBoard />;
}
