
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MobileLayout from "@/components/MobileLayout";
import ImageGallery from "@/components/plant-analyzer/ImageGallery";
import AnalysisSection from "@/components/plant-analyzer/AnalysisSection";
import AnalysisResults from "@/components/plant-analyzer/AnalysisResults";
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
                    
                    <AnalysisSection 
                      selectedImage={images[selectedImageIndex]}
                      setAnalysisResult={setAnalysisResult}
                      isAnalyzing={isAnalyzing}
                      setIsAnalyzing={setIsAnalyzing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis">
              {analysisResult && <AnalysisResults analysisResult={analysisResult} />}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MobileLayout>
  );
};

export default PlantAnalyzer;
