"use client";
import React from "react";
import HeroSection from "./components/HeroSection";
import FeatcherAI from "./components/FeatcherAI";
import StartNow from "./components/StartNow";
import Header from "./components/Header";
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
