"use client";
import { useContext, useEffect } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";

function JobManagement() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("إدارة الوظائف");
    setnumberOfSideBar(3);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>page</div>;
}

export default JobManagement;
