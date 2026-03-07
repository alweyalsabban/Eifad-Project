"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SearchSection from "./SearchSection";

const ResultSearchSection = dynamic(() => import("./ResultSearchSection"));

function JobsPage() {
  const [keyword, setkeyword] = useState("");
  return (
    <>
      <SearchSection keyword={keyword} setkeyword={setkeyword} />
      <ResultSearchSection keyword={keyword} />
    </>
  );
}

export default JobsPage;
