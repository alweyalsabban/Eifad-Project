"use client";
import { useContext } from "react";
import { NamePageContex } from "../context/NamePageContext";
import { useEffect } from "react";
function ProfilePage() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);
  useEffect(() => {
    setnameOfSideBar("الملف الشخصي");
    setnumberOfSideBar(2);
  }, []);
  return <div>ProfilePage</div>;
}

export default ProfilePage;
