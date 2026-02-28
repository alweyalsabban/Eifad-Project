import type { Metadata } from "next";
import RegesterPage from "../components/RegesterPage";

export const metadata: Metadata = {
  title: "إنشاء حساب",
};

export default function Page() {
  return <RegesterPage />;
}
