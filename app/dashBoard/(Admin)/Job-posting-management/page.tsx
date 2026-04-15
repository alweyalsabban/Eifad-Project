import TitlePage from "../controll/components/TitlePage";
import JobsTable from "./components/JobsTable";
import type { JobItem } from "../TypeAdmin";

const jobsData: JobItem[] = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Ltd",
    publishDate: "2024-03-01",
    status: "نشط",
    applicantsCount: 45,
    employmentType: "Full-time",
    salaryRange: "$80,000 - $120,000",
    location: "Remote",
    description:
      "We are looking for an experienced Full Stack Developer to join our team.",
    requirements: ["5+ years experience", "React & Node.js", "Database design"],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Digital Marketing Agency",
    publishDate: "2024-03-05",
    status: "نشط",
    applicantsCount: 32,
    employmentType: "Full-time",
    salaryRange: "$50,000 - $70,000",
    location: "Remote",
    description:
      "We need a creative UI/UX Designer for web and mobile products.",
    requirements: ["Figma", "Design Systems", "UX Research"],
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Analytics Corp",
    publishDate: "2024-02-28",
    status: "قيد الانتظار",
    applicantsCount: 18,
    employmentType: "Full-time",
    salaryRange: "$90,000 - $140,000",
    location: "On-site",
    description: "Looking for a Data Scientist with strong ML background.",
    requirements: ["Python", "Machine Learning", "SQL"],
  },
];

function JobPostingManagement() {
  return (
    <div className="p-6" dir="rtl">
      <TitlePage title="إدارة الإعلانات الوظيفية" number={5} />

      <JobsTable data={jobsData} />
    </div>
  );
}

export default JobPostingManagement;
