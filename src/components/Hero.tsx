
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PlantHeroImg from "../components/PlantHeroImg";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const { triggerFileUpload, setUseCameraMode } = useDiagnosis();
  const isMobile = useIsMobile();

  const scrollToDiagnosis = () => {
    const element = document.getElementById('diagnosis');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Set camera mode if on mobile
      if (isMobile) {
        setUseCameraMode(true);
      }
      
      // Trigger file upload after scrolling to diagnosis section
      setTimeout(() => {
        triggerFileUpload();
      }, 800);
    }
  };

  return (
    <div className="leaf-pattern w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-plantguard-green-dark mb-4 leading-tight">
                Your AI-Powered Plant Health Assistant
              </h1>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-xl">
                Identify diseases, monitor growth conditions, and receive personalized plant care recommendations from our AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="font-medium"
                  onClick={scrollToDiagnosis}
                >
                  Try Plant Diagnosis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-plantguard-green border-plantguard-green"
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    if (featuresSection) {
                      featuresSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Explore Features
                </Button>
              </div>
              
              <div className="mt-10 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-white bg-plantguard-blue-light"
                    >
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium">
                  <span className="text-plantguard-green">1,000+</span> plant species recognized
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="animate-growth relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-plantguard-blue-light rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-breathing"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-plantguard-green-light rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-breathing" style={{ animationDelay: "1s" }}></div>
              <PlantHeroImg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
