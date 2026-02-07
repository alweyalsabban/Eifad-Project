import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatcherAI from "./components/FeatcherAI";
import StartNow from "./components/StartNow";
import Footer from "./components/Footer";

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
