
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create model directory if it doesn't exist
const modelDir = path.join(__dirname, '..', 'model');
if (!fs.existsSync(modelDir)) {
  fs.mkdirSync(modelDir, { recursive: true });
}

const runPlantDiagnosis = (plantId, callback) => {
  const scriptPath = path.join(__dirname, '..', 'plantguard_ai.py');
  if (!/^[a-zA-Z0-9_]+$/.test(plantId)) {
    return callback(new Error('Invalid plantId'), null);
  }
  exec(`python3 ${scriptPath} ${plantId}`, (error, stdout, stderr) => {
    if (error) return callback(error, null);
    try {
      const result = JSON.parse(stdout);
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  });
};

const analyzeImage = (imagePath, callback) => {
  const scriptPath = path.join(__dirname, '..', 'plantguard_ai.py');
  
  // Make sure the image exists
  if (!fs.existsSync(imagePath)) {
    return callback(new Error('Image file not found'), null);
  }
  
  exec(`python3 ${scriptPath} "${imagePath}"`, (error, stdout, stderr) => {
    if (error) return callback(error, null);
    try {
      const result = JSON.parse(stdout);
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  });
};

const trainModel = (callback) => {
  const scriptPath = path.join(__dirname, '..', 'plantguard_ai.py');
  
  console.log('Starting model training...');
  exec(`python3 ${scriptPath} --train`, (error, stdout, stderr) => {
    if (error) {
      console.error('Training error:', error);
      return callback(error, null);
    }
    
    try {
      const result = JSON.parse(stdout);
      callback(null, result);
    } catch (err) {
      console.error('Error parsing training result:', err);
      callback(err, null);
    }
  });
};

// Check if the model exists
const checkModelStatus = () => {
  const modelPath = path.join(__dirname, '..', 'model', 'plant_disease_model.h5');
  return fs.existsSync(modelPath);
};

module.exports = { runPlantDiagnosis, analyzeImage, trainModel, checkModelStatus };
