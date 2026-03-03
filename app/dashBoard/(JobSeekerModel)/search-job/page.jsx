"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function JobSearchPage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("البحث عن وظائف");
    setnumberOfSideBar(5);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>search-job page</div>;
}

export default JobSearchPage;
