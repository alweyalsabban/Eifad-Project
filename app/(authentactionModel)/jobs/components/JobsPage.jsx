"use client";
import Header from "../../homePage/components/Header";
import Footer from "../../homePage/components/Footer";
import SearchSection from "./../components/SearchSection";
import ResultSearchSection from "./../components/ResultSearchSection";
import { useState } from "react";

function JobsPage() {
  const [keyword, setkeyword] = useState("");
  return (
    <>
      <Header />
      <SearchSection keyword={keyword} setkeyword={setkeyword} />
      <ResultSearchSection keyword={keyword} />
      <Footer />
    </>
  );
}

export default JobsPage;
