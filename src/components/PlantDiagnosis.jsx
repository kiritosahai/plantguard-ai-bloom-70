
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useDiagnosis } from "@/context/DiagnosisContext";

// Import the new component files
import PlantBenefits from "./plant-diagnosis/PlantBenefits";
import UploadSection from "./plant-diagnosis/UploadSection";
import AnalyzingSection from "./plant-diagnosis/AnalyzingSection";
import ResultsSection from "./plant-diagnosis/ResultsSection";

const PlantDiagnosis = () => {
  const [dragActive, setDragActive] = useState(false);
  const [previewStage, setPreviewStage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();
  const { setTriggerFileUpload, useCameraMode, setUseCameraMode } = useDiagnosis();

  useEffect(() => {
    setTriggerFileUpload(() => {
      triggerFileInput();
    });
    
    return () => {
      setUseCameraMode(false);
    };
  }, [setTriggerFileUpload, setUseCameraMode]);

  const handleFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic', 'image/heif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a JPG, PNG, or HEIC image.",
        variant: "destructive",
      });
      return;
    }

    // Create image preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);

    // Start processing
    setIsProcessing(true);
    toast({
      title: "Image uploaded",
      description: "Analyzing your plant...",
      variant: "default",
    });

    setPreviewStage("analyzing");
    
    // Simulate AI processing time with more realistic timing
    setTimeout(() => {
      setIsProcessing(false);
      setPreviewStage("results");
      toast({
        title: "Analysis complete!",
        description: "We've identified your plant and its condition.",
        variant: "default",
      });
    }, 3000);
  };

  const triggerFileInput = () => {
    // This function is now only responsible for triggering an event
    // The actual file input is in the UploadSection component
    document.getElementById('file-upload').click();
  };

  const generateReportText = () => {
    return `Plant Analysis Report:
Species: Monstera Deliciosa
Health Status: Needs Attention
Issue: Early signs of leaf spot disease
Recommendations:
- Isolate the plant from others to prevent spread
- Remove affected leaves with sterilized scissors
- Decrease watering frequency to prevent moisture
- Apply neem oil solution once weekly for 3 weeks`;
  };

  return (
    <section id="diagnosis" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <PlantBenefits />
          
          <div className="w-full lg:w-1/2">
            <Card className="border-dashed overflow-hidden">
              {previewStage === null && (
                <UploadSection 
                  handleFile={handleFile} 
                  isProcessing={isProcessing} 
                  useCameraMode={useCameraMode}
                  setUseCameraMode={setUseCameraMode}
                />
              )}
              
              {previewStage === 'analyzing' && (
                <AnalyzingSection imagePreview={imagePreview} />
              )}
              
              {previewStage === 'results' && (
                <ResultsSection 
                  imagePreview={imagePreview}
                  setPreviewStage={setPreviewStage}
                  generateReportText={generateReportText}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantDiagnosis;
