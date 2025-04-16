const express = require('express');
const cors = require('cors');
const analyzeRoute = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/analyze-image', analyzeRoute);

app.get('/', (req, res) => {
  res.send("🌿 PlantGuard Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`🌱 Server listening at http://localhost:${PORT}`);
});
