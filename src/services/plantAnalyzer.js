import { plantDatabase, diseaseDatabase } from "@/data/plantsData";

export const analyzeImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('plant_image', imageFile);
    
    const response = await fetch('http://localhost:3000/analyze/image', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.error('Server response error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Server error details:', errorText);
      throw new Error(`Plant identification failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Analysis response:', data);
    
    // Handle the server response
    if (data.error) {
      console.error('Server reported error:', data.error);
      throw new Error(data.error);
    }
    
    // If we have a proper analysis result
    return {
      plant_detected: data.plant_detected || false,
      species: data.species || 'Unknown',
      common_name: data.common_name || data.species || 'Unknown Plant',
      water_requirement: data.plant_details?.water_requirement || 'Moderate',
      water_amount_ml_per_day: data.plant_details?.water_amount_ml_per_day || 50,
      disease_detected: data.disease_detected || false,
      disease_name: data.disease_name || null,
      disease_details: data.disease_details || null,
      plant_details: data.plant_details || null,
      confidence: data.confidence || 0.8,
      image_path: data.image_path ? `http://localhost:3000/uploads/${data.image_path}` : null
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// Helper function to convert File to base64
export const fileToBase64 = (file) => {
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

const mapToPlantData = (suggestion) => {
  return {
    species: suggestion.plant_details?.scientific_name || suggestion.plant_name,
    common_name: suggestion.plant_details?.common_names?.[0] || suggestion.plant_name,
    description: suggestion.plant_details?.wiki_description?.value || '',
    water_requirement: determineWaterRequirement(suggestion.plant_details?.watering),
    water_amount_ml_per_day: calculateWaterAmount(suggestion.plant_details?.watering),
    light_requirement: 'Medium',
    humidity_preference: 'Medium',
    care_tips: extractCareTips(suggestion.plant_details),
    mature_size: 'Medium',
    propagation_methods: ['Seeds', 'Cuttings'],
    common_issues: []
  };
};

const determineWaterRequirement = (watering) => {
  if (!watering) return "Moderate";
  
  const waterValue = typeof watering === 'string' 
    ? watering.toLowerCase() 
    : watering.min_water_freq;

  if (waterValue.includes('frequent') || waterValue < 3) return "High";
  if (waterValue.includes('minimal') || waterValue > 14) return "Low";
  return "Moderate";
};

const calculateWaterAmount = (watering) => {
  if (!watering) return 50;
  
  const waterReq = determineWaterRequirement(watering);
  switch (waterReq) {
    case "Low": return 30;
    case "High": return 100;
    default: return 50;
  }
};

const extractCareTips = (plantDetails) => {
  const tips = [];
  
  if (plantDetails?.watering) {
    tips.push(`Water ${plantDetails.watering}`);
  }
  
  if (plantDetails?.wiki_description?.value) {
    tips.push("See plant description for detailed care information");
  }
  
  return tips;
};

const detectDisease = (suggestion) => {
  if (!suggestion.disease_details || suggestion.health_probability > 0.8) {
    return undefined;
  }

  return {
    disease_name: suggestion.disease_details.name || "Unknown Issue",
    description: suggestion.disease_details.description || "",
    treatments: suggestion.disease_details.treatment || [],
    symptoms: suggestion.disease_details.symptoms || [],
    prevention: suggestion.disease_details.prevention || [],
  };
};
