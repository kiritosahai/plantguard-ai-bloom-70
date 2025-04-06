
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileImage, Camera, Activity } from "lucide-react";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { useIsMobile } from "@/hooks/use-mobile";

const DiseaseDiagnosis = () => {
  const { triggerFileUpload, setUseCameraMode } = useDiagnosis();
  const isMobile = useIsMobile();

  const handleStartDiagnosis = (useCamera = false) => {
    setUseCameraMode(useCamera);
    setTimeout(() => {
      triggerFileUpload();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-16 bg-gradient-to-b from-white to-plantguard-green-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                Plant Disease Diagnosis
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Identify and treat plant diseases with our AI-powered diagnostic tool
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
              <Button 
                size="lg" 
                onClick={() => handleStartDiagnosis(false)}
                className="h-16 text-lg font-medium"
              >
                <FileImage className="mr-2 h-5 w-5" />
                Upload Plant Image
              </Button>
              
              {isMobile && (
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => handleStartDiagnosis(true)}
                  className="h-16 text-lg font-medium"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Take Photo
                </Button>
              )}
            </div>

            <div className="mt-16 p-6 border rounded-xl bg-white shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Common Plant Diseases</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {["Powdery Mildew", "Leaf Spot", "Root Rot"].map((disease, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center mb-3">
                      <Activity className="h-5 w-5 text-plantguard-green mr-2" />
                      <h3 className="font-medium">{disease}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Our AI can detect and provide treatment recommendations for this common plant issue.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiseaseDiagnosis;
