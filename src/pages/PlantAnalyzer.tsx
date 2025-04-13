
import React, { useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Camera, ImagePlus, AlertCircle, Loader2, Download } from "lucide-react";
import { AnalysisResult, analyzeImage } from "@/services/plantAnalyzer";
import ImageGallery from "@/components/plant-analyzer/ImageGallery";

const PlantAnalyzer: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<(AnalysisResult | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prevImages) => [...prevImages, event.target!.result as string]);
          setAnalysisResults((prevResults) => [...prevResults, null]);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setAnalysisResults((prevResults) => prevResults.filter((_, i) => i !== index));
    
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    } else if (selectedImageIndex !== null && selectedImageIndex > index) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const analyzeSelectedImage = async () => {
    if (selectedImageIndex === null) {
      toast({
        title: "No image selected",
        description: "Please select an image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Convert base64 to blob
      const base64 = images[selectedImageIndex];
      const response = await fetch(base64);
      const blob = await response.blob();
      
      // Analyze the image
      const result = await analyzeImage(blob);
      
      // Update the analysis results
      setAnalysisResults((prevResults) => {
        const newResults = [...prevResults];
        newResults[selectedImageIndex] = result;
        return newResults;
      });

      toast({
        title: "Analysis complete",
        description: result.plant_detected 
          ? `Identified: ${result.common_name || result.species}` 
          : "No plant detected in the image",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderAnalysisResult = () => {
    if (selectedImageIndex === null || !analysisResults[selectedImageIndex]) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Analysis Available</h3>
          <p className="text-muted-foreground mb-4">
            Select an image and click "Analyze" to get detailed plant information
          </p>
          <Button onClick={analyzeSelectedImage} disabled={isAnalyzing || selectedImageIndex === null}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Selected Image"
            )}
          </Button>
        </div>
      );
    }

    const result = analysisResults[selectedImageIndex];

    return (
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-medium">
          {result.plant_detected ? result.common_name || result.species : "No plant detected"}
        </h3>
        
        {result.plant_detected && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="text-sm text-muted-foreground mb-1">Scientific Name</h4>
                <p className="font-medium">{result.species}</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="text-sm text-muted-foreground mb-1">Water Requirement</h4>
                <p className="font-medium">{result.water_requirement}</p>
              </Card>
            </div>
            
            {result.disease_detected && result.disease_name && (
              <Card className="p-4 border-yellow-300">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-1" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Health Issue Detected</h4>
                    <p className="text-muted-foreground">{result.disease_name}</p>
                    {result.disease_details?.symptoms && (
                      <>
                        <h5 className="mt-2 font-medium text-sm">Symptoms</h5>
                        <p className="text-sm text-muted-foreground">{result.disease_details.symptoms}</p>
                      </>
                    )}
                    {result.disease_details?.treatment && (
                      <>
                        <h5 className="mt-2 font-medium text-sm">Recommended Treatment</h5>
                        <p className="text-sm text-muted-foreground">{result.disease_details.treatment}</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            )}
            
            <Card className="p-4">
              <h4 className="font-medium mb-2">Care Instructions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Water {result.water_amount_ml_per_day}ml per day</li>
                <li>• {result.plant_details?.light_requirement || "Prefers medium light"}</li>
                <li>• {result.plant_details?.soil_type || "Use well-draining soil"}</li>
                <li>• {result.plant_details?.growth_habit || "Regular growth habit"}</li>
              </ul>
            </Card>
            
            <div className="flex justify-end">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Download Report
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold font-serif text-plantguard-green-dark mb-2">
            Plant Analyzer
          </h1>
          <p className="text-muted-foreground mb-8">
            Upload multiple plant images to identify species, diagnose problems, and get care instructions
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <ImageGallery 
                images={images} 
                onAddImage={triggerFileInput} 
                onRemoveImage={removeImage}
              />
              
              {images.length > 0 && (
                <Card className="p-4">
                  <h3 className="text-lg font-medium mb-4">Your Plants</h3>
                  <div className="space-y-2">
                    {images.map((image, index) => (
                      <div 
                        key={index}
                        className={`flex items-center p-2 rounded-md cursor-pointer ${
                          selectedImageIndex === index ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <div className="w-12 h-12 rounded overflow-hidden mr-3">
                          <img src={image} alt={`Plant ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Plant {index + 1}</p>
                          <p className="text-xs text-muted-foreground">
                            {analysisResults[index] 
                              ? analysisResults[index]?.plant_detected 
                                ? analysisResults[index]?.common_name || analysisResults[index]?.species
                                : "No plant detected"
                              : "Not analyzed yet"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-full">
                {images.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
                    <ImagePlus className="h-16 w-16 text-muted-foreground mb-6" />
                    <h3 className="text-xl font-medium mb-2">Add Images to Start</h3>
                    <p className="text-muted-foreground mb-6">
                      Upload plant images to identify species, diagnose problems, and get care recommendations
                    </p>
                    <Button className="flex items-center gap-2" onClick={triggerFileInput}>
                      <ImagePlus className="h-4 w-4" /> Upload Image
                    </Button>
                  </div>
                ) : selectedImageIndex !== null ? (
                  <Tabs defaultValue="preview" className="h-full">
                    <div className="px-4 pt-4 border-b">
                      <TabsList>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="analysis">Analysis</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="preview" className="h-[500px] flex items-center justify-center p-4">
                      <img 
                        src={images[selectedImageIndex]} 
                        alt="Selected plant" 
                        className="max-h-full max-w-full object-contain"
                      />
                    </TabsContent>
                    <TabsContent value="analysis" className="h-[500px] overflow-y-auto">
                      {renderAnalysisResult()}
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Image Selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select an image from the list on the left to view and analyze
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/heic,image/heif"
        className="hidden"
        onChange={handleFileSelect}
      />
      
      <Footer />
    </div>
  );
};

export default PlantAnalyzer;
