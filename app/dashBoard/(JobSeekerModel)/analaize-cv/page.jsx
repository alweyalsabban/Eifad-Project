"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function AnalaizeCv() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("تحليل السيرة الذاتية");
    setnumberOfSideBar(4);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>analaizeCV page</div>;
}

export default AnalaizeCv;
