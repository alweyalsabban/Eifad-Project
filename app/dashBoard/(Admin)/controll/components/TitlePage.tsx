"use client";
import { NamePageContex } from "@/app/dashBoard/(JobSeekerModel)/context/NamePageContext";
import { useContext, useEffect } from "react";

type tTitlePagePro = {
  title: string;
  number: number;
};

function TitlePage({ title, number }: tTitlePagePro) {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);

  useEffect(() => {
    setnameOfSideBar(title);
    setnumberOfSideBar(number);
  }, [setnameOfSideBar, setnumberOfSideBar, title, number]);
  return <></>;
}

export default TitlePage;
