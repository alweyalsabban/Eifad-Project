"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function SearchPages() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الصفحات");
    setnumberOfSideBar(11);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>SearchPages</div>;
}

export default SearchPages;
