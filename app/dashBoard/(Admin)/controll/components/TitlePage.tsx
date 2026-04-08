"use client";
import { NamePageContex } from "@/app/dashBoard/(JobSeekerModel)/context/NamePageContext";
import { useContext, useEffect } from "react";

function TitlePage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);

  useEffect(() => {
    setnameOfSideBar("لوحة التحكم");
    setnumberOfSideBar(1);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <></>;
}

export default TitlePage;
