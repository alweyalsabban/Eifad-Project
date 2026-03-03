"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function MarketTrend() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("إتجاهات السوق");
    setnumberOfSideBar(9);
  }, [setnameOfSideBar, setnumberOfSideBar]);
  return <div>trend-market page</div>;
}

export default MarketTrend;
