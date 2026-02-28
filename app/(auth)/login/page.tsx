import type { Metadata } from "next";
import LogInPage from "../components/LogInPage";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default function Page() {
  return <LogInPage />;
}
