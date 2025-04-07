
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileImage, Camera, Loader2 } from "lucide-react";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import PlantHeroImg from "@/components/PlantHeroImg";

const PlantIdentification = () => {
  const { triggerFileUpload, setUseCameraMode } = useDiagnosis();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartIdentification = (useCamera = false) => {
    setUseCameraMode(useCamera);
    
    toast({
      title: "Ready to identify",
      description: "Please select or take a clear photo of the plant",
      duration: 3000,
    });
    
    setTimeout(() => {
      triggerFileUpload();
    }, 100);
  };

  // Handling identification feedback for better UX
  const handleIdentificationProcess = (useCamera = false) => {
    setIsAnalyzing(true);
    handleStartIdentification(useCamera);
    
    // Simulate analysis complete for demo
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Plant identified successfully!",
        description: "View the detailed results and care instructions.",
        variant: "success",
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-12 md:py-16 bg-gradient-to-b from-white to-plantguard-blue-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div className="text-center md:text-left md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                  AI Plant Identification
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Upload a photo or take a picture of any plant and our AI will identify it within seconds
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <PlantHeroImg />
              </div>
            </div>

            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border mb-12">
              <h2 className="text-xl font-semibold mb-4 text-center">Identify Your Plant</h2>
              <p className="text-muted-foreground text-sm mb-4 text-center">
                For best results, take a clear photo of the plant in good lighting
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button 
                  size="lg" 
                  onClick={() => handleIdentificationProcess(false)}
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
                      <FileImage className="mr-2 h-5 w-5" />
                      Upload Plant Image
                    </>
                  )}
                </Button>
                
                {isMobile && (
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => handleIdentificationProcess(true)}
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
              
              {isAnalyzing && (
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Analyzing your plant image... Please wait a moment
                </div>
              )}
            </div>

            <div className="mt-8 p-6 border rounded-xl bg-white shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-plantguard-green-light/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-plantguard-green">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Upload a Photo</h3>
                  <p className="text-muted-foreground">Take a clear photo of the plant you want to identify</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-plantguard-green-light/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-plantguard-green">2</span>
                  </div>
                  <h3 className="font-medium mb-2">AI Analysis</h3>
                  <p className="text-muted-foreground">Our advanced AI analyzes the image to identify the plant species</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-plantguard-green-light/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-plantguard-green">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Get Results</h3>
                  <p className="text-muted-foreground">Receive detailed information about the identified plant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlantIdentification;
