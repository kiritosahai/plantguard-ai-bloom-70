
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
  try {
    // Convert image file to base64
    const base64Image = await fileToBase64(imageFile);
    
    const response = await fetch('https://api.plant.id/v2/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': 'YOUR_PLANT_ID_API_KEY' // Replace with your API key
      },
      body: JSON.stringify({
        images: [base64Image],
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: [
          "common_names",
          "url",
          "name_authority",
          "wiki_description",
          "taxonomy",
          "synonyms",
          "watering"
        ],
        disease_details: [
          "common_names",
          "description",
          "treatment",
          "classification"
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Plant identification failed');
    }

    const data = await response.json();
    
    if (!data.suggestions || data.suggestions.length === 0) {
      return { plant_detected: false };
    }

    const bestMatch = data.suggestions[0];
    const plantDetails = mapToPlantData(bestMatch);
    const diseaseDetails = detectDisease(bestMatch);

    return {
      plant_detected: true,
      species: plantDetails.species,
      common_name: plantDetails.common_name,
      water_requirement: determineWaterRequirement(bestMatch.plant_details?.watering),
      water_amount_ml_per_day: calculateWaterAmount(bestMatch.plant_details?.watering),
      disease_detected: !!diseaseDetails,
      disease_name: diseaseDetails?.disease_name,
      disease_details: diseaseDetails,
      plant_details: plantDetails,
      confidence: bestMatch.probability
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    return { plant_detected: false };
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

const mapToPlantData = (suggestion: any): PlantData => {
  return {
    species: suggestion.plant_details?.scientific_name || suggestion.plant_name,
    common_name: suggestion.plant_details?.common_names?.[0] || suggestion.plant_name,
    family: suggestion.plant_details?.taxonomy?.family,
    description: suggestion.plant_details?.wiki_description?.value || '',
    water_requirement: determineWaterRequirement(suggestion.plant_details?.watering),
    water_amount_ml_per_day: calculateWaterAmount(suggestion.plant_details?.watering),
    light_requirement: 'Moderate', // Default value as Plant.id doesn't provide this directly
    humidity_preference: 'Moderate', // Default value as Plant.id doesn't provide this directly
    care_tips: extractCareTips(suggestion.plant_details),
    growth_rate: 'Medium', // Default value
    mature_size: 'Medium', // Default value
    propagation_methods: ['Seeds', 'Cuttings'], // Default values
    common_issues: []
  };
};

const determineWaterRequirement = (watering: any): "Low" | "Moderate" | "High" => {
  if (!watering) return "Moderate";
  
  const waterValue = typeof watering === 'string' 
    ? watering.toLowerCase() 
    : watering.min_water_freq;

  if (waterValue.includes('frequent') || waterValue < 3) return "High";
  if (waterValue.includes('minimal') || waterValue > 14) return "Low";
  return "Moderate";
};

const calculateWaterAmount = (watering: any): number => {
  // Default to 50ml if no specific guidance
  if (!watering) return 50;
  
  const waterReq = determineWaterRequirement(watering);
  switch (waterReq) {
    case "Low": return 30;
    case "High": return 100;
    default: return 50;
  }
};

const extractCareTips = (plantDetails: any): string[] => {
  const tips = [];
  
  if (plantDetails?.watering) {
    tips.push(`Water ${plantDetails.watering}`);
  }
  
  if (plantDetails?.wiki_description?.value) {
    tips.push("See plant description for detailed care information");
  }
  
  return tips;
};

const detectDisease = (suggestion: any): DiseaseData | undefined => {
  if (!suggestion.disease_details || suggestion.health_probability > 0.8) {
    return undefined;
  }

  return {
    disease_name: suggestion.disease_details.name || "Unknown Issue",
    description: suggestion.disease_details.description || "",
    severity: suggestion.disease_details.severity || "Medium",
    treatments: suggestion.disease_details.treatment || [],
    symptoms: suggestion.disease_details.symptoms || [],
    prevention: suggestion.disease_details.prevention || [],
    affected_parts: suggestion.disease_details.affected_parts || []
  };
};

