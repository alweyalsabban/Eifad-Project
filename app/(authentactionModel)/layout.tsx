import React from "react";
import Header from "./homePage/components/Header";
import Footer from "./homePage/components/Footer";
function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Page;
