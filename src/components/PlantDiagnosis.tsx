
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";

const PlantDiagnosis = () => {
  const [dragActive, setDragActive] = useState(false);
  const [previewStage, setPreviewStage] = useState<null | 'analyzing' | 'results'>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Show demo analysis
    setPreviewStage("analyzing");
    setTimeout(() => {
      setPreviewStage("results");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // Show demo analysis
      setPreviewStage("analyzing");
      setTimeout(() => {
        setPreviewStage("results");
      }, 2000);
    }
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
                >
                  <div className="mb-4 p-4 rounded-full bg-plantguard-green/10">
                    <Upload className="h-10 w-10 text-plantguard-green" />
                  </div>
                  <p className="mb-4 font-medium">Drag and drop a plant photo or click to upload</p>
                  <p className="text-sm text-muted-foreground mb-6">Supported formats: JPG, PNG</p>
                  <Button 
                    variant="outline" 
                    className="relative"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Select Photo
                    <input 
                      id="file-upload"
                      type="file"
                      className="absolute inset-0 w-full opacity-0 cursor-pointer" 
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleChange}
                    />
                  </Button>
                </div>
              )}
              
              {previewStage === 'analyzing' && (
                <div className="p-8 text-center flex flex-col items-center justify-center h-96">
                  <div className="mb-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-plantguard-green"></div>
                  </div>
                  <p className="text-lg font-medium">Analyzing your plant...</p>
                  <p className="text-sm text-muted-foreground mt-2">This will just take a moment</p>
                </div>
              )}
              
              {previewStage === 'results' && (
                <div className="p-8 h-96 flex flex-col">
                  <h3 className="text-xl font-semibold mb-4">Plant Analysis Results</h3>
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
                    <Button variant="ghost" className="mr-2" onClick={() => setPreviewStage(null)}>
                      Upload New Photo
                    </Button>
                    <Button>View Detailed Report</Button>
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
