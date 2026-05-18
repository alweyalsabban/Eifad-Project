"use client";
import { NamePageContex } from "@/app/dashBoard/(JobSeekerModel)/context/NamePageContext";
import { useContext, useEffect } from "react";

type tTitlePagePro = {
  title: string;
  number: number;
  showBack?: boolean;
};

function TitlePage({ title, number, showBack = false }: tTitlePagePro) {
  const { setnameOfSideBar, setnumberOfSideBar, setShowBackBtn } = useContext(NamePageContex) || {};

  useEffect(() => {
    if (setnameOfSideBar) setnameOfSideBar(title);
    if (setnumberOfSideBar) setnumberOfSideBar(number);
    if (setShowBackBtn) setShowBackBtn(showBack);
  }, [setnameOfSideBar, setnumberOfSideBar, setShowBackBtn, title, number, showBack]);
  
  return <></>;
}

export default TitlePage;
