import React from "react";
import Link from "next/link";

export default function NoCvMessage({ Message }) {
  return (
    <Link href={"/dashBoard/cv"}>
      <h1 className="bg-red-500 text-white px-4 py-3 rounded-xl w-fit mt-5 hover:bg-red-600 ">
        {Message}
      </h1>
    </Link>
  );
}
