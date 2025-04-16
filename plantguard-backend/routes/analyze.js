
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pythonService = require('../services/pythonService');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Route for plant analysis
router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    console.log(`Processing image: ${req.file.path}`);
    
    const result = await pythonService.analyzeImage(req.file.path);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return res.status(500).json({ error: 'Failed to analyze image', details: error.message });
  }
});

// Get analysis status
router.get('/status/:id', (req, res) => {
  // For future implementation: check status of long-running analysis jobs
  res.status(200).json({ status: 'completed' });
});

module.exports = router;
