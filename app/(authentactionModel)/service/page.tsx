import dynamic from "next/dynamic";
import HeroSection from "./components/HeroSection";

const Advantage = dynamic(() => import("./components/Advantage"));
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدماتنا",
};

function ServicePage() {
  return (
    <>
      <HeroSection />
      <Advantage />
    </>
  );
}

export default ServicePage;
