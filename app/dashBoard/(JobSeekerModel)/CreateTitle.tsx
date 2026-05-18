"use client";
import { useContext } from "react";
import { NamePageContex } from "../(JobSeekerModel)/context/NamePageContext";
import { useEffect } from "react";

type tCteateProp = {
  title: string;
  number: number;
  showBack?: boolean;
};

function CreateTitle({ title, number, showBack = false }: tCteateProp) {
  const { setnameOfSideBar, setnumberOfSideBar, setShowBackBtn } = useContext(NamePageContex) || {};

  useEffect(() => {
    if (setnameOfSideBar) setnameOfSideBar(title);
    if (setnumberOfSideBar) setnumberOfSideBar(number);
    if (setShowBackBtn) setShowBackBtn(showBack);
  }, [title, number, showBack, setnameOfSideBar, setnumberOfSideBar, setShowBackBtn]);
  
  return null;
}

export default CreateTitle;
