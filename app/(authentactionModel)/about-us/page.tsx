import dynamic from "next/dynamic";
import HeroSection from "./components/HeroSection";
import WhoWe from "./components/WhoWe";

const Team = dynamic(() => import("./components/Team"));
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "معلمات عنا",
};

function AboutUs() {
  return (
    <>
      <HeroSection />
      <WhoWe />
      <Team />
    </>
  );
}

export default AboutUs;
