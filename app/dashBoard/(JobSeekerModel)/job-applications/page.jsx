"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function JobApplication() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("متابعة الطلبات");
    setnumberOfSideBar(7);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>job-applications page</div>;
}

export default JobApplication;
