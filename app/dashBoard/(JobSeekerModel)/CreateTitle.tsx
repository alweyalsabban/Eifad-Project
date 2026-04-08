"use client";
import { useContext } from "react";
import { NamePageContex } from "../(JobSeekerModel)/context/NamePageContext";
import { useEffect } from "react";

type tCteateProp = {
  title: string;
  number: number;
};

function CreateTitle({ title, number }: tCteateProp) {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);

  useEffect(() => {
    setnameOfSideBar(title);
    setnumberOfSideBar(number);
  }, [title, number, setnameOfSideBar, setnumberOfSideBar]);
  return null;
}

export default CreateTitle;
