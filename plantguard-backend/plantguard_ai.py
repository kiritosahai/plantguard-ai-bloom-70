import sys
import json

def get_plant_info(plant_id):
    return {
        "plant": "Aloe Vera",
        "disease": "Leaf Spot",
        "water_need": "Every 10–14 days, let soil dry.",
        "nutrients": "Add balanced liquid fertilizer monthly."
    }

if __name__ == "__main__":
    plant_id = sys.argv[1] if len(sys.argv) > 1 else "Unknown"
    result = get_plant_info(plant_id)
    print(json.dumps(result))
    sys.stdout.flush()
    sys.stderr.flush()      
