import Link from "next/link";
import { MdOutlineAutoAwesome } from "react-icons/md";

function RecommedAI({ title, description, textBtn }) {
  return (
    <div
      className="w-[98%] m-auto rounded-2xl bg-linear-to-r from-[#009966] to-[#00C950]
     text-auxiliaryColorWhite px-10 py-5 mt-5 flex "
    >
      <MdOutlineAutoAwesome size={30} className="mt-2" />
      <div className="flex flex-col gap-4 w-full mr-10 flex-wrap">
        <h1 className="font-bold text-xl"> {title}</h1>
        <p> {description} </p>
        <Link
          href={"/dashBoard/trend-market"}
          className="bg-auxiliaryColorWhite rounded-2xl w-30 flex-wrap py-3
           text-[#00A63E] mainAnimation flex items-center justify-center font-bold"
        >
          {textBtn}
        </Link>
      </div>
    </div>
  );
}

export default RecommedAI;
