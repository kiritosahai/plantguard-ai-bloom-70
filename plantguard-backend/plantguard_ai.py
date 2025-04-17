
#!/usr/bin/python3
import sys
import json
import os
import numpy as np
from PIL import Image
import random
import time

# Check if running as script directly
if __name__ == "__main__":
    # Simple CLI arguments processing
    args = sys.argv[1:]
    
    if len(args) == 0:
        # No arguments - return error
        print(json.dumps({"error": "No input provided"}))
        sys.exit(1)
    
    # Check if training mode is requested
    if args[0] == "--train":
        # Mock training process
        print(json.dumps({
            "status": "completed",
            "accuracy": 0.92,
            "training_time": "10 minutes",
            "message": "Model trained successfully"
        }))
        sys.exit(0)
    
    # Check if it's a model status check
    if args[0] == "--status":
        # Check if model file exists
        model_path = os.path.join(os.path.dirname(__file__), "model", "plant_disease_model.h5")
        model_exists = os.path.exists(model_path)
        
        print(json.dumps({
            "model_loaded": model_exists,
            "ready": model_exists,
            "version": "1.0",
            "last_updated": "2025-04-17" if model_exists else None
        }))
        sys.exit(0)
    
    # Process an image file
    image_path = args[0]
    
    # Check if file exists
    if not os.path.exists(image_path):
        print(json.dumps({"error": "Image file not found"}))
        sys.exit(1)
    
    try:
        # Load and process the image
        img = Image.open(image_path)
        img = img.resize((224, 224))  # Resize for the model
        
        # Simulate analysis delay
        time.sleep(1)
        
        # Mock detection results - in a real app this would use the ML model
        plant_types = ["Monstera Deliciosa", "Snake Plant", "Peace Lily", "Pothos", "Fiddle Leaf Fig"]
        diseases = ["Healthy", "Leaf Spot", "Powdery Mildew", "Root Rot", "Aphid Infestation"]
        
        # Random selection for demo purposes
        is_healthy = random.random() > 0.3
        confidence = random.uniform(0.75, 0.98)
        
        if is_healthy:
            plant_type = random.choice(plant_types)
            result = {
                "plant_detected": True,
                "species": plant_type,
                "common_name": plant_type,
                "confidence": confidence,
                "health_status": "Healthy",
                "plant_details": {
                    "species": plant_type,
                    "common_name": plant_type,
                    "description": f"This appears to be a healthy {plant_type}.",
                    "water_requirement": random.choice(["Low", "Moderate", "High"]),
                    "water_amount_ml_per_day": random.randint(50, 200),
                    "light_requirement": random.choice(["Low", "Medium", "High"]),
                    "humidity_preference": random.choice(["Low", "Medium", "High"]),
                }
            }
        else:
            disease = random.choice(diseases)
            if disease == "Healthy":
                disease = "Leaf Spot"  # Ensure it's not healthy in this branch
                
            plant_type = random.choice(plant_types)
            result = {
                "plant_detected": True,
                "species": plant_type,
                "common_name": plant_type,
                "disease_detected": True,
                "disease_name": disease,
                "confidence": confidence,
                "health_status": "Needs Attention",
                "plant_details": {
                    "species": plant_type,
                    "common_name": plant_type,
                    "description": f"This appears to be a {plant_type} with {disease}.",
                    "water_requirement": random.choice(["Low", "Moderate", "High"]),
                },
                "disease_details": {
                    "disease_name": disease,
                    "description": f"{disease} is affecting this plant.",
                    "severity": random.choice(["Mild", "Moderate", "Severe"]),
                    "symptoms": [
                        "Discolored leaves",
                        "Wilting",
                        "Stunted growth"
                    ],
                    "treatments": [
                        "Isolate the plant from others",
                        "Remove affected leaves with sterilized scissors",
                        "Apply neem oil spray weekly",
                        "Reduce watering frequency"
                    ],
                    "prevention": [
                        "Maintain proper watering schedule",
                        "Ensure good air circulation",
                        "Clean leaves regularly",
                        "Inspect plants weekly for early signs of problems"
                    ]
                }
            }
        
        # Print the result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
