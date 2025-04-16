
import sys
import json
import numpy as np
from PIL import Image
import io
import base64
import os

# This would be replaced by actual ML model loading in production
# For example:
# from tensorflow.keras.models import load_model
# model = load_model('plant_disease_model.h5')

# Mock database of plant information
PLANT_DATABASE = {
    "aloe_vera": {
        "plant": "Aloe Vera",
        "disease": None,
        "water_need": "Every 3 weeks, let soil dry completely.",
        "nutrients": "Fertilize sparingly, once per season with cactus fertilizer."
    },
    "monstera": {
        "plant": "Monstera Deliciosa",
        "disease": None,
        "water_need": "Weekly, allow top inch of soil to dry.",
        "nutrients": "Monthly with balanced liquid fertilizer during growing season."
    },
    "leaf_spot_aloe": {
        "plant": "Aloe Vera",
        "disease": "Leaf Spot",
        "water_need": "Every 10–14 days, let soil dry.",
        "nutrients": "Add balanced liquid fertilizer monthly."
    },
    "root_rot_monstera": {
        "plant": "Monstera Deliciosa",
        "disease": "Root Rot",
        "water_need": "Reduce watering, let soil dry completely.",
        "nutrients": "Hold fertilizer until recovery."
    }
}

def analyze_image(image_path):
    """
    Analyze plant image and identify plant type and possible diseases
    In a real implementation, this would use the loaded ML model
    """
    try:
        # Load and preprocess the image
        image = Image.open(image_path)
        
        # In a real implementation, we'd do real analysis here
        # For example:
        # image_array = np.array(image.resize((224, 224))) / 255.0
        # prediction = model.predict(np.expand_dims(image_array, axis=0))
        
        # For demo purposes, we'll use file size to determine the "prediction"
        # This is just a mock implementation
        file_size = os.path.getsize(image_path)
        
        # Mock logic to pick a result based on file size
        if file_size % 4 == 0:
            return PLANT_DATABASE["aloe_vera"]
        elif file_size % 4 == 1:
            return PLANT_DATABASE["monstera"]
        elif file_size % 4 == 2:
            return PLANT_DATABASE["leaf_spot_aloe"]
        else:
            return PLANT_DATABASE["root_rot_monstera"]
            
    except Exception as e:
        return {"error": str(e)}

def get_plant_info(plant_id):
    """Get plant information from database"""
    if plant_id in PLANT_DATABASE:
        return PLANT_DATABASE[plant_id]
    
    # Default response with generic plant data
    return {
        "plant": "Unknown Plant",
        "disease": "Cannot determine",
        "water_need": "Check specific plant requirements.",
        "nutrients": "Use balanced fertilizer according to plant type."
    }

if __name__ == "__main__":
    # Check if an image path was provided
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        result = analyze_image(sys.argv[1])
    else:
        # Fall back to plant ID lookup if no image or image doesn't exist
        plant_id = sys.argv[1] if len(sys.argv) > 1 else "aloe_vera"
        result = get_plant_info(plant_id)
    
    # Return the result as JSON
    print(json.dumps(result))
    sys.stdout.flush()
    sys.stderr.flush()
