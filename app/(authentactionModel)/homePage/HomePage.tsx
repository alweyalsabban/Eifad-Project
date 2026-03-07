"use client";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

const FeatcherAI = dynamic(() => import("./components/FeatcherAI"));
const StartNow = dynamic(() => import("./components/StartNow"));
const Footer = dynamic(() => import("./components/Footer"));
function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeatcherAI />
      <StartNow />
      <Footer />
    </>
  );
}

export default HomePage;
