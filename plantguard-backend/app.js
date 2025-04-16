
const express = require('express');
const cors = require('cors');
const path = require('path');
const analyzeRoute = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/analyze', analyzeRoute);

app.get('/', (req, res) => {
  res.send("🌿 PlantGuard Backend is Running!");
});

// Add endpoint to check if the backend is ready
app.get('/status', (req, res) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    features: {
      image_analysis: true,
      plant_identification: true,
      disease_detection: true
    }
  });
});

app.listen(PORT, () => {
  console.log(`🌱 Server listening at http://localhost:${PORT}`);
  console.log(`- Check status at http://localhost:${PORT}/status`);
  console.log(`- Check model status at http://localhost:${PORT}/analyze/model/status`);
  console.log(`- To train the model: POST to http://localhost:${PORT}/analyze/model/train`);
});
