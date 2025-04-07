
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, CheckCircle2, AlertCircle, Camera, Undo2, Clipboard, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import { useDiagnosis } from "@/context/DiagnosisContext";

const PlantDiagnosis = () => {
  const [dragActive, setDragActive] = useState(false);
  const [previewStage, setPreviewStage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const isMobile = useIsMobile();
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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
    setUseCameraMode(false);
  };

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
    if (fileInputRef.current) {
      if (useCameraMode && isMobile) {
        fileInputRef.current.setAttribute('capture', 'environment');
      } else {
        fileInputRef.current.removeAttribute('capture');
      }
      fileInputRef.current.click();
    }
  };

  const takePhoto = () => {
    setUseCameraMode(true);
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const uploadFromGallery = () => {
    setUseCameraMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Report details have been copied to your clipboard.",
      variant: "default",
    });
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
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Powered Plant Disease Detection
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Upload a photo of your plant and our advanced AI will identify the species, 
              diagnose any potential issues, and provide tailored care recommendations.
            </p>
            <ul className="space-y-3 mb-8">
              {["Early detection of 1,000+ plant diseases", 
                "Instant species identification", 
                "Personalized treatment recommendations"].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-plantguard-green flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              Our AI model has been trained on millions of plant images to ensure accuracy 
              for 10,000+ plant species and varieties.
            </p>
          </div>
          
          <div className="w-full lg:w-1/2">
            <Card className="border-dashed overflow-hidden">
              {previewStage === null && (
                <div 
                  className={`p-8 text-center flex flex-col items-center justify-center h-96 transition-colors ${dragActive ? 'bg-plantguard-green/10' : 'bg-muted/50'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  role="button"
                  aria-label="Upload plant photo"
                  tabIndex={0}
                >
                  <div className="mb-4 p-4 rounded-full bg-plantguard-green/10">
                    <Camera className="h-10 w-10 text-plantguard-green" />
                  </div>
                  <p className="mb-4 font-medium">
                    Get an instant plant diagnosis
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">Choose an option below</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex items-center gap-2"
                      onClick={takePhoto}
                      disabled={isProcessing}
                    >
                      <Camera className="h-4 w-4" /> {isProcessing ? "Processing..." : "Take Photo"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={uploadFromGallery}
                      disabled={isProcessing}
                    >
                      <Upload className="h-4 w-4" /> {isProcessing ? "Processing..." : "Upload Image"}
                    </Button>
                  </div>
                  
                  <input 
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    className="hidden" 
                    accept="image/jpeg,image/png,image/jpg,image/heic,image/heif"
                    onChange={handleChange}
                  />
                </div>
              )}
              
              {previewStage === 'analyzing' && (
                <div className="p-8 text-center flex flex-col items-center justify-center h-96">
                  {imagePreview && (
                    <div className="relative mb-8 w-48 h-48 mx-auto">
                      <img src={imagePreview} alt="Plant preview" className="w-full h-full object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-plantguard-green"></div>
                      </div>
                    </div>
                  )}
                  
                  {!imagePreview && (
                    <div className="mb-8">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-plantguard-green"></div>
                    </div>
                  )}
                  
                  <p className="text-lg font-medium">Analyzing your plant...</p>
                  <p className="text-sm text-muted-foreground mt-2">This will just take a moment</p>
                </div>
              )}
              
              {previewStage === 'results' && (
                <div className="p-8 h-96 flex flex-col">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold">Plant Analysis Results</h3>
                    {imagePreview && (
                      <div className="ml-auto">
                        <div className="w-14 h-14 rounded-md overflow-hidden">
                          <img src={imagePreview} alt="Plant thumbnail" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Plant Species</p>
                      <p className="font-medium">Monstera Deliciosa</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Health Status</p>
                      <p className="font-medium text-yellow-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> Needs Attention
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Issues Detected</p>
                    <p className="font-medium">Early signs of leaf spot disease</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-4 flex-1 overflow-auto">
                    <p className="text-sm text-muted-foreground mb-1">Recommendation</p>
                    <ul className="text-sm space-y-2">
                      <li>• Isolate the plant from others to prevent spread</li>
                      <li>• Remove affected leaves with sterilized scissors</li>
                      <li>• Decrease watering frequency to prevent moisture</li>
                      <li>• Apply neem oil solution once weekly for 3 weeks</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end mt-auto">
                    <Button 
                      variant="ghost" 
                      className="mr-2 flex items-center gap-1" 
                      onClick={() => setPreviewStage(null)}
                    >
                      <Undo2 className="h-4 w-4" /> New Photo
                    </Button>
                    <Button 
                      className="flex items-center gap-1"
                      onClick={() => copyToClipboard(generateReportText())}
                    >
                      <Clipboard className="h-4 w-4" /> Copy Report
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantDiagnosis;
