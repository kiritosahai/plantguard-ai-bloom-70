
import { plantDatabase, diseaseDatabase, PlantData, DiseaseData } from "@/data/plantsData";

export interface AnalysisResult {
  plant_detected: boolean;
  species?: string;
  common_name?: string;
  water_requirement?: "Low" | "Moderate" | "High";
  water_amount_ml_per_day?: number;
  disease_detected?: boolean;
  disease_name?: string;
  disease_details?: DiseaseData;
  plant_details?: PlantData;
  confidence?: number;
}

export const analyzeImage = async (imageFile: File): Promise<AnalysisResult> => {
  // In a real implementation, you would send the image to an actual plant identification API
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    // Replace with your actual plant identification API endpoint
    const response = await fetch('https://your-plant-api.com/identify', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Plant identification failed');
    }

    const data = await response.json();

    return {
      plant_detected: data.plant_detected,
      species: data.species,
      common_name: data.common_name,
      water_requirement: data.water_requirement,
      water_amount_ml_per_day: data.water_amount_ml_per_day,
      disease_detected: data.disease_detected,
      disease_name: data.disease_name,
      disease_details: data.disease_details,
      plant_details: data.plant_details,
      confidence: data.confidence
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    return { plant_detected: false };
  }
};
