
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/card";
import { FileImage, Camera, Activity, Loader2 } from "lucide-react";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

const DiseaseDiagnosis = () => {
  const { triggerFileUpload, setUseCameraMode } = useDiagnosis();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartDiagnosis = (useCamera = false) => {
    setIsAnalyzing(true);
    setUseCameraMode(useCamera);
    
    toast({
      title: "Ready for diagnosis",
      description: "Select a clear photo showing the affected plant parts",
      duration: 3000,
    });
    
    setTimeout(() => {
      triggerFileUpload();
    }, 100);
    
    // Reset analyzing state after a delay (in real app would be after API response)
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-12 md:py-16 bg-gradient-to-b from-white to-plantguard-green-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                Plant Disease Diagnosis
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Identify and treat plant diseases with our AI-powered diagnostic tool
              </p>
            </div>

            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border mb-12">
              <h2 className="text-xl font-semibold mb-4 text-center">Diagnose Plant Issues</h2>
              <p className="text-muted-foreground text-sm mb-4 text-center">
                Take a clear, close-up photo of the affected plant parts
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button 
                  variant="default"
                  onClick={() => handleStartDiagnosis(false)}
                  className="h-14 text-base font-medium w-full sm:w-auto relative bg-plantguard-green hover:bg-plantguard-green-dark text-white"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FileImage className="mr-2 h-5 w-5" />
                      Upload Plant Image
                    </>
                  )}
                </Button>
                
                {isMobile && (
                  <Button 
                    variant="outline"
                    onClick={() => handleStartDiagnosis(true)}
                    className="h-14 text-base font-medium w-full sm:w-auto"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-5 w-5" />
                        Take Photo
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-16 p-6 border rounded-xl bg-white shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Common Plant Diseases</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Powdery Mildew",
                    description: "White powdery spots on leaves that can spread to cover the entire surface"
                  },
                  {
                    name: "Leaf Spot",
                    description: "Brown or black spots on leaves that may have yellow halos around them"
                  },
                  {
                    name: "Root Rot",
                    description: "Roots turn brown and soft, often with a foul odor and wilting foliage"
                  }
                ].map((disease, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center mb-3">
                      <Activity className="h-5 w-5 text-plantguard-green mr-2" />
                      <h3 className="font-medium">{disease.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {disease.description}
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
