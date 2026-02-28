import HeroSection from "./components/HeroSection";
import Advantage from "./components/Advantage";
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
