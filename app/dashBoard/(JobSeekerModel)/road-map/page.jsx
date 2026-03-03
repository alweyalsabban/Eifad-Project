"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function RoadMap() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("خارطة الطريق المهنية");
    setnumberOfSideBar(8);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>road-map page</div>;
}

export default RoadMap;
