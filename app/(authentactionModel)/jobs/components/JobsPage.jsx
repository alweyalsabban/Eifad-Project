"use client";

import SearchSection from "./SearchSection";
import ResultSearchSection from "./ResultSearchSection";
import { useState } from "react";

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
