import TitlePage from "../controll/components/TitlePage";
import CertificatesTable from "./components/CertificatesTable";

const data = [
  {
    id: 1,
    user: "Ahmed Hassan",
    name: "AWS Solutions Architect",
    provider: "Amazon Web Services",
    date: "2024-03-01",
    status: "قيد الانتظار" as const,
    score: 88,
  },
  {
    id: 2,
    user: "Sara Ali",
    name: "Google Cloud Professional",
    provider: "Google Cloud",
    date: "2024-03-05",
    status: "موثق" as const,
    score: 95,
  },
];
function Certificateverification() {
  return (
    <div className="p-6" dir="rtl">
      <TitlePage title="التحقق من الشهادات" number={4} />
      <CertificatesTable data={data} />
    </div>
  );
}

export default Certificateverification;
