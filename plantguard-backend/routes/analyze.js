
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { runPlantDiagnosis, analyzeImage, trainModel, checkModelStatus } = require('../services/pythonService');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'plant-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Check model status
router.get('/model/status', (req, res) => {
  const modelExists = checkModelStatus();
  res.json({
    model_loaded: modelExists,
    ready_for_analysis: modelExists
  });
});

// Route for training the model
router.post('/model/train', (req, res) => {
  trainModel((err, result) => {
    if (err) {
      console.error("Training error:", err);
      return res.status(500).json({ 
        error: 'Model training failed', 
        details: err.message 
      });
    }
    
    res.json({
      status: 'success',
      message: 'Model training complete',
      details: result
    });
  });
});

// Route for plant ID lookup
router.get('/:plantId', (req, res) => {
  const { plantId } = req.params;
  runPlantDiagnosis(plantId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Diagnosis failed.' });
    res.json(result);
  });
});

// Route for image upload and analysis
router.post('/image', upload.single('plant_image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  
  const imagePath = req.file.path;
  
  analyzeImage(imagePath, (err, result) => {
    if (err) {
      console.error("Analysis error:", err);
      return res.status(500).json({ error: 'Image analysis failed' });
    }
    
    // Add the image path to the result
    result.image_path = req.file.filename;
    
    res.json(result);
    
    // Clean up: You can choose to delete the uploaded file or keep it
    // fs.unlink(imagePath, () => {}); // Uncomment to delete after processing
  });
});

module.exports = router;
