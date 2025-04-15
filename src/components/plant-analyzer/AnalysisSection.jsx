
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeImage } from "@/services/plantAnalyzer";

const AnalysisSection = ({
  selectedImage,
  setAnalysisResult,
  isAnalyzing,
  setIsAnalyzing,
}) => {
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const imageBase64 = selectedImage;
      const byteString = atob(imageBase64.split(',')[1]);
      const mimeString = imageBase64.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const file = new File([ab], "plant-image.jpg", { type: mimeString });
      
      const result = await analyzeImage(file);
      
      const mappedResult = {
        confidence: result.confidence || 0,
        plant: result.plant_details ? {
          species: result.plant_details.species || '',
          common_name: result.plant_details.common_name || '',
          description: result.plant_details.description || '',
          water_requirement: result.plant_details.water_requirement,
          water_amount_ml_per_day: result.plant_details.water_amount_ml_per_day,
          light_requirement: result.plant_details.light_requirement,
          humidity_preference: result.plant_details.humidity_preference,
          care_tips: result.plant_details.care_tips,
          mature_size: result.plant_details.mature_size,
          propagation_methods: result.plant_details.propagation_methods,
          common_issues: result.plant_details.common_issues
        } : undefined,
        disease: result.disease_details ? {
          disease_name: result.disease_details.disease_name || '',
          description: result.disease_details.description || '',
          symptoms: result.disease_details.symptoms || [],
          treatments: result.disease_details.treatments || [],
          prevention: result.disease_details.prevention || []
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
    <Button 
      onClick={handleAnalyze} 
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
  );
};

export default AnalysisSection;
