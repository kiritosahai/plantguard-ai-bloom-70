
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlantData, DiseaseData } from "@/data/plantsData";

interface AnalysisResultsProps {
  analysisResult: {
    plant?: Partial<PlantData>;
    disease?: Partial<DiseaseData>;
    confidence: number;
  };
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysisResult }) => {
  return (
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
              {analysisResult.disease.treatments?.map((treatment, index) => (
                <li key={index}>{treatment}</li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mt-4">Prevention</h3>
            <ul className="list-disc pl-5 space-y-1">
              {analysisResult.disease.prevention?.map((prevention, index) => (
                <li key={index}>{prevention}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;
