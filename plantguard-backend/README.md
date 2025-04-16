
# PlantGuard Backend API

This backend server provides the AI-powered image analysis capabilities for the PlantGuard application.

## Setup

1. Install Node.js dependencies:
```
npm install
```

2. Install Python requirements:
```
pip install -r requirements.txt
```

## Directory Structure

```
plantguard-backend/
├── app.js                 # Main Express server
├── routes/
│   └── analyze.js         # API routes for plant analysis
├── services/
│   └── pythonService.js   # Service for interacting with Python scripts
├── plantguard_ai.py       # Python script for AI plant analysis
├── uploads/               # Directory for uploaded images (created automatically)
├── package.json           # Node.js dependencies
└── README.md              # Documentation
```

## API Endpoints

### POST /api/analyze
Upload and analyze a plant image.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with an "image" field containing the image file

**Response:**
```json
{
  "plant_detected": true,
  "confidence": 0.87,
  "plant_details": {
    "species": "Monstera deliciosa",
    "common_name": "Swiss Cheese Plant",
    "description": "Popular tropical houseplant with distinctive split leaves",
    "water_requirement": "Moderate",
    "water_amount_ml_per_day": 50,
    "light_requirement": "Bright indirect light",
    "humidity_preference": "High",
    "care_tips": ["Allow soil to dry between waterings", "Wipe leaves to remove dust"],
    "mature_size": "2-3 meters tall indoors",
    "propagation_methods": ["Stem cuttings", "Air layering"],
    "common_issues": ["Yellowing leaves", "Brown leaf edges"]
  },
  "disease_detected": false
}
```

## Running the Server

Start the server with:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

## Note About the AI Model

The current implementation includes a placeholder Python script that simulates AI analysis. In a production environment, you would integrate with:

1. A real machine learning model (TensorFlow, PyTorch, etc.)
2. Image processing libraries (OpenCV, PIL)
3. Pre-trained models for plant species identification and disease detection

To create a complete implementation, replace the `analyze_image` function in `plantguard_ai.py` with your actual model inference code.
