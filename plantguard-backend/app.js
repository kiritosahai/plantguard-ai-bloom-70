
const express = require('express');
const cors = require('cors');
const analyzeRoutes = require('./routes/analyze');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use(express.static('public'));

// Routes
app.use('/api', analyzeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('PlantGuard Analysis API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
