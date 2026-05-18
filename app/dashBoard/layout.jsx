import React from "react";
import Header from "./ui/Header";
import SideBarComponents from "./ui/SideBarComponents";
import SmHeader from "./ui/SmHeader";

function MainPage({ children }) {
  return (
    <main className="" dir="rtl">
      <span className="hidden md:block ">
        <Header />
      </span>
      <span className="block md:hidden  w-[85%] m-auto">
        <SmHeader />
      </span>

      <SideBarComponents child={children} />
    </main>
  );
}
export default MainPage;
