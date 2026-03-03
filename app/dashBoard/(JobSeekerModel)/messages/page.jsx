"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function Messages() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الرسائل");
    setnumberOfSideBar(12);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>messages page</div>;
}

export default Messages;
