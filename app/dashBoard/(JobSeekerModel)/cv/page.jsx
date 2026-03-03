"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function CvPage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("السيرة الذاتية");
    setnumberOfSideBar(3);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>CvPage page</div>;
}

export default CvPage;
