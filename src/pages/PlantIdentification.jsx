
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileImage, Camera } from "lucide-react";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { useIsMobile } from "@/hooks/use-mobile";

const PlantIdentification = () => {
  const { triggerFileUpload, setUseCameraMode } = useDiagnosis();
  const isMobile = useIsMobile();

  const handleStartIdentification = (useCamera = false) => {
    setUseCameraMode(useCamera);
    setTimeout(() => {
      triggerFileUpload();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="py-16 bg-gradient-to-b from-white to-plantguard-blue-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold font-serif text-plantguard-green-dark mb-4">
                AI Plant Identification
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload a photo or take a picture of any plant and our AI will identify it within seconds
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
              <Button 
                size="lg" 
                onClick={() => handleStartIdentification(false)}
                className="h-16 text-lg font-medium"
              >
                <FileImage className="mr-2 h-5 w-5" />
                Upload Plant Image
              </Button>
              
              {isMobile && (
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => handleStartIdentification(true)}
                  className="h-16 text-lg font-medium"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Take Photo
                </Button>
              )}
            </div>

            <div className="mt-16 p-6 border rounded-xl bg-white shadow-sm">
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
