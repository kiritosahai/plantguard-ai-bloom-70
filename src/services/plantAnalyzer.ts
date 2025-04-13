
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
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would be an actual API call to a backend service
      // For this demo, we'll randomly select a plant and potentially a disease from our database
      
      // 95% chance of detecting a plant
      const plantDetected = Math.random() < 0.95;
      
      if (!plantDetected) {
        resolve({ plant_detected: false });
        return;
      }

      // Randomly select a plant from our database
      const randomPlantIndex = Math.floor(Math.random() * plantDatabase.length);
      const selectedPlant = plantDatabase[randomPlantIndex];
      
      // 50% chance of detecting a disease
      const diseaseDetected = Math.random() < 0.5;
      let diseaseDetails = null;
      let diseaseName = null;
      
      if (diseaseDetected) {
        const randomDiseaseIndex = Math.floor(Math.random() * diseaseDatabase.length);
        const selectedDisease = diseaseDatabase[randomDiseaseIndex];
        diseaseDetails = selectedDisease;
        diseaseName = selectedDisease.disease_name;
      }
      
      // Generate a random confidence score between 0.7 and 0.99
      const confidence = 0.7 + Math.random() * 0.29;
      
      resolve({
        plant_detected: true,
        species: selectedPlant.species,
        common_name: selectedPlant.common_name,
        water_requirement: selectedPlant.water_requirement,
        water_amount_ml_per_day: selectedPlant.water_amount_ml_per_day,
        disease_detected: diseaseDetected,
        disease_name: diseaseName || undefined,
        disease_details: diseaseDetails || undefined,
        plant_details: selectedPlant,
        confidence: parseFloat(confidence.toFixed(2))
      });
    }, 2000); // 2-second delay to simulate processing
  });
};
