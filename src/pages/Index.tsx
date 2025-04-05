
import React from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PlantDiagnosis from "@/components/PlantDiagnosis";
import EnvDashboard from "@/components/EnvDashboard";
import Community from "@/components/Community";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <PlantDiagnosis />
        <EnvDashboard />
        <Community />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
