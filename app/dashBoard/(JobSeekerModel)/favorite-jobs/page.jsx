"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function FavoritePage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الوظائف المفضلة");
    setnumberOfSideBar(10);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>favorite-jobs page</div>;
}

export default FavoritePage;
