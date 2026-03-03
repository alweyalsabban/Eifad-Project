"use client";
import { JobseekerSideBar } from "../data";
import { TwoIcon } from "../data";
import logout from "@/app/lib/deleteCookies";
import Link from "next/link";

export default function Sidebar({
  setName,
  numberOfSideBar,
  setnumberOfSideBar,
}) {
  const sidebar = JobseekerSideBar(numberOfSideBar);
  const smallSidebar = TwoIcon(numberOfSideBar);

  return (
    <div className="w-20 p-3 bg-auxiliaryColorWhite border border-secondGray rounded-full my-10 mr-10 scale-80 absolute top-[-90] ">
      <div className="flex flex-col items-center justify-center gap-9 py-10 ">
        {sidebar.map((j) => {
          return (
            <div key={j.id}>
              <span
                onClick={() => {
                  setnumberOfSideBar(j.id);
                  setName(j.name);
                }}
              >
                <Link href={j.href}>{j.icon}</Link>
              </span>
            </div>
          );
        })}
        <span className="border w-full border-secondGray"></span>
        {smallSidebar.map((j) => {
          return (
            <div key={j.id}>
              <span
                onClick={() => {
                  setnumberOfSideBar(j.id);
                  if (j.id === 14) {
                    localStorage.clear();
                    logout();
                  }
                }}
              >
                <Link href={j.href}>{j.icon}</Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
