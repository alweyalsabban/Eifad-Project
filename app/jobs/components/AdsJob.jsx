import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";

function AdsJob({ jobAds }) {
  return (
    <div
      className="border border-auxiliaryColorGray rounded-xl flex flex-col gap-3 px-10 py-4 
    hover:cursor-pointer hover:shadow-xl hover:scale-105 duration-500"
    >
      <h1 className="text-xl font-bold">{jobAds.title}</h1>
      <p className="text-secondColorBlack">{jobAds.company}</p>
      <div className="flex gap-6">
        <span className="flex justify-center items-center gap-2">
          <IoLocationOutline /> {jobAds.location}
        </span>
        <span className="flex justify-center items-center gap-2">
          <IoTimeOutline /> {jobAds.type}
        </span>
        <span className="flex justify-center items-center gap-2">
          <FaRegCalendarAlt /> {jobAds.data}
        </span>
      </div>
      <h1>
        {jobAds.salary.min} - {jobAds.salary.max} <span>{jobAds.currency}</span>
      </h1>
    </div>
  );
}

export default AdsJob;
