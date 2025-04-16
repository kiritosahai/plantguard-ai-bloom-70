
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

app.listen(PORT, () => {
  console.log(`🌱 Server listening at http://localhost:${PORT}`);
});
