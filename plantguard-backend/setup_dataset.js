
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create necessary directories
const modelDir = path.join(__dirname, 'model');
const dataDir = path.join(__dirname, 'data');

if (!fs.existsSync(modelDir)) {
  fs.mkdirSync(modelDir, { recursive: true });
  console.log('Created model directory');
}

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Created data directory');
}

// Function to set up the Kaggle dataset
const setupKaggleDataset = () => {
  // Check if Kaggle credentials exist
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const kaggleDir = path.join(homeDir, '.kaggle');
  const kaggleJson = path.join(kaggleDir, 'kaggle.json');
  
  if (!fs.existsSync(kaggleJson)) {
    console.log(`
    Kaggle API credentials not found at ${kaggleJson}
    
    To download datasets from Kaggle:
    1. Create a Kaggle account if you don't have one
    2. Go to your account settings (https://www.kaggle.com/account)
    3. Create an API token - this will download a kaggle.json file
    4. Place this file in ${kaggleDir} (create the directory if needed)
    5. Run this script again
    
    For this project, you'll need:
    - Plant disease dataset (e.g., plant-pathology-2020-fgvc7)
    `);
    
    return false;
  }
  
  // If credentials exist, download dataset
  console.log('Downloading dataset from Kaggle...');
  
  // Example dataset download command - you can modify this to use a different dataset
  const cmd = 'kaggle datasets download -d plantpathology/plant-pathology-2020-fgvc7 --unzip -p ./data';
  
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error downloading dataset: ${error.message}`);
      return;
    }
    
    console.log('Dataset downloaded successfully!');
    console.log(stdout);
    
    // After downloading, you can train the model
    console.log('To train the model, run: python3 plantguard_ai.py --train');
  });
  
  return true;
};

// Run the setup
console.log('Setting up PlantGuard AI dataset...');
setupKaggleDataset();
