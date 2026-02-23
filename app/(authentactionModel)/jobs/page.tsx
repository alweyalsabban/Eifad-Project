import type { Metadata } from "next";
import JobsPage from "./components/JobsPage";

export const metadata: Metadata = {
  title: "الوظائف",
};

export default function Page() {
  return <JobsPage />;
}
