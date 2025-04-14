import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { analyzeImage } from "@/services/plantAnalyzer";
import MobileLayout from "@/components/MobileLayout";
import ImageGallery from "@/components/plant-analyzer/ImageGallery";
import { PlantData, DiseaseData } from "@/data/plantsData";

interface AnalysisResult {
  plant?: Partial<PlantData>;
  disease?: Partial<DiseaseData>;
  confidence: number;
}

const PlantAnalyzer: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFile = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages([...images, e.target.result.toString()]);
        }
      };
      
      reader.readAsDataURL(newFile);
    }
  };
  
  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      if (e.target instanceof HTMLInputElement && e.target.files) {
        handleFileChange({
          target: e.target
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };
    input.click();
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    if (selectedImageIndex >= newImages.length && newImages.length > 0) {
      setSelectedImageIndex(newImages.length - 1);
    } else if (newImages.length === 0) {
      setAnalysisResult(null);
    }
  };

  const analyzeSelectedImage = async () => {
    if (images.length === 0 || selectedImageIndex >= images.length) {
      toast({
        title: "No image selected",
        description: "Please add an image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const imageBase64 = images[selectedImageIndex];
      const byteString = atob(imageBase64.split(',')[1]);
      const mimeString = imageBase64.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const file = new File([ab], "plant-image.jpg", { type: mimeString });
      
      const result = await analyzeImage(file);
      
      const mappedResult: AnalysisResult = {
        confidence: result.confidence || 0,
        plant: result.plant_details ? {
          species: result.plant_details.species || '',
          common_name: result.plant_details.common_name || '',
          water_requirement: result.water_requirement || 'Low',
          water_amount_ml_per_day: 0,
          light_requirement: 'Low',
          humidity_preference: 'Low',
          description: result.plant_details.description || '',
          care_tips: []
        } : undefined,
        disease: result.disease_details ? {
          disease_name: result.disease_name || '',
          description: result.disease_details.description || '',
          symptoms: result.disease_details.symptoms || [],
          treatments: result.disease_details.treatments || [],
          prevention: result.disease_details.preventions || []
        } : undefined
      };
      
      setAnalysisResult(mappedResult);
      
      toast({
        title: "Analysis complete",
        description: `Identified as ${mappedResult.plant?.common_name || mappedResult.disease?.disease_name} with ${(mappedResult.confidence * 100).toFixed(1)}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <MobileLayout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Plant Analyzer</h1>
        
        <ImageGallery 
          images={images}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
        />
        
        {images.length > 0 && (
          <>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="analysis" disabled={!analysisResult}>Analysis Results</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                        <img 
                          src={images[selectedImageIndex]} 
                          alt="Selected plant" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <Button 
                        onClick={analyzeSelectedImage} 
                        disabled={isAnalyzing}
                        className="w-full"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : "Analyze Plant"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analysis">
                {analysisResult && (
                  <div className="space-y-4">
                    {analysisResult.plant && (
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <h2 className="text-xl font-semibold">Plant Information</h2>
                          <div className="space-y-2">
                            <p><span className="font-semibold">Name:</span> {analysisResult.plant.common_name}</p>
                            <p><span className="font-semibold">Scientific Name:</span> {analysisResult.plant.species}</p>
                            <p><span className="font-semibold">Description:</span> {analysisResult.plant.description}</p>
                          </div>
                          
                          <h3 className="text-lg font-semibold mt-4">Care Instructions</h3>
                          <div className="space-y-2">
                            <p><span className="font-semibold">Watering:</span> {analysisResult.plant.water_requirement}</p>
                            <p><span className="font-semibold">Sunlight:</span> {analysisResult.plant.light_requirement}</p>
                            <p><span className="font-semibold">Humidity:</span> {analysisResult.plant.humidity_preference}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {analysisResult.disease && (
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <h2 className="text-xl font-semibold">Disease Information</h2>
                          <div className="space-y-2">
                            <p><span className="font-semibold">Name:</span> {analysisResult.disease.disease_name}</p>
                            <p><span className="font-semibold">Description:</span> {analysisResult.disease.description}</p>
                          </div>
                          
                          <h3 className="text-lg font-semibold mt-4">Treatments</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {analysisResult.disease.treatments.map((treatment, index) => (
                              <li key={index}>{treatment}</li>
                            ))}
                          </ul>
                          
                          <h3 className="text-lg font-semibold mt-4">Prevention</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {analysisResult.disease.preventions.map((prevention, index) => (
                              <li key={index}>{prevention}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </MobileLayout>
  );
};

export default PlantAnalyzer;
