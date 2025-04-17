
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
  exec(`python3 "${scriptPath}" ${plantId}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Python execution error:", error);
      console.error("Python stderr:", stderr);
      return callback(error, null);
    }
    
    try {
      const result = JSON.parse(stdout);
      callback(null, result);
    } catch (err) {
      console.error("JSON parse error:", err);
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
  
  console.log(`Executing: python3 "${scriptPath}" "${imagePath}"`);
  
  // Add quotes around the path to handle spaces
  exec(`python3 "${scriptPath}" "${imagePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("Python execution error:", error);
      console.error("Python stderr:", stderr);
      return callback(error, null);
    }
    
    try {
      console.log("Python output:", stdout);
      const result = JSON.parse(stdout);
      callback(null, result);
    } catch (err) {
      console.error("JSON parse error:", err);
      callback(err, null);
    }
  });
};

const checkModelStatus = (callback) => {
  const scriptPath = path.join(__dirname, '..', 'plantguard_ai.py');
  
  exec(`python3 "${scriptPath}" --status`, (error, stdout, stderr) => {
    if (error) {
      console.error("Status check error:", error);
      return callback(error, null);
    }
    
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
  exec(`python3 "${scriptPath}" --train`, (error, stdout, stderr) => {
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

module.exports = { runPlantDiagnosis, analyzeImage, trainModel, checkModelStatus };
