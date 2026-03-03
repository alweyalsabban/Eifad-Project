"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function Setting() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الإعدادات");
    setnumberOfSideBar(13);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>Settings page</div>;
}

export default Setting;
