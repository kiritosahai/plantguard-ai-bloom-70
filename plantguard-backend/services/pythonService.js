
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
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

module.exports = { runPlantDiagnosis, analyzeImage };
