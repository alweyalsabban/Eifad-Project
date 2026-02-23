import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

function AdsJob({ jobAds }) {
  const postedAt = jobAds.PostedAt;
  const formattedDatepostedAt = new Date(postedAt).toLocaleDateString("en-GB");

  const ExpiryDate = jobAds.ExpiryDate;
  const formattedDateExpiryDate = new Date(ExpiryDate).toLocaleDateString(
    "en-GB",
  );
  const router = useRouter();

  return (
    <div
      className="border border-auxiliaryColorGray rounded-xl flex flex-col gap-3 px-10 py-4 
    hover:cursor-pointer hover:shadow-xl hover:scale-105 active:scale-90 duration-500"
    >
      <h1 className="text-xl font-bold">{jobAds.Title}</h1>
      <p className="text-secondColorBlack">{jobAds.company.CompanyName}</p>
      <div className="flex gap-6 flex-wrap">
        <span className="flex justify-center items-center gap-2">
          <IoLocationOutline /> {jobAds.Location}
        </span>
        <span className="flex justify-center items-center gap-2">
          <IoTimeOutline size={30} /> {jobAds.WorkType} {jobAds.WorkplaceType}
        </span>
        <span className="flex justify-center items-center gap-2  flex-wrap">
          <FaRegCalendarAlt /> {formattedDatepostedAt} إلى
          <h1 className="font-bold">{formattedDateExpiryDate}</h1>
        </span>
      </div>

      {/* Skill */}
      <div className="flex flex-wrap gap-3 my-2  ">
        {jobAds.skills.map((b) => (
          <span
            key={b.SkillID}
            className="px-3 py-1 whitespace-nowrap rounded-full bg-sky-50 text-sky-700 border border-sky-100 text-sm font-semibold"
          >
            {b.skill.SkillName}
          </span>
        ))}
      </div>

      <div className="flex gap-3 font-bold text-blue-800">
        <h1>
          {jobAds.SalaryMin || ""} - {jobAds.SalaryMax || ""}
        </h1>
        <h1>{jobAds.Currency || ""}</h1>
      </div>

      <button
        disabled={jobAds.Status !== "Active"}
        className={`block md:hidden px-5 py-2 rounded-xl text-white font-semibold bg-linear-to-r from-sky-600 to-violet-500 
          hover:opacity-95 transition hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50`}
        onClick={() => {
          sessionStorage.setItem("JobAdID", jobAds.JobAdID);

          router.push("/login");
        }}
      >
        {jobAds.Status === "Active" ? " قدم الآن" : "أغلق التقديم"}
      </button>
    </div>
  );
}

export default AdsJob;
