"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function RecommedJob() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الوظائف الموصى بها");
    setnumberOfSideBar(6);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>recommed-job page</div>;
}

export default RecommedJob;
