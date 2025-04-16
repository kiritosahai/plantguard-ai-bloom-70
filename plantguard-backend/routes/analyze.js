const express = require('express');
const router = express.Router();
const { runPlantDiagnosis } = require('../services/pythonService');

router.get('/:plantId', (req, res) => {
  const { plantId } = req.params;
  runPlantDiagnosis(plantId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Diagnosis failed.' });
    res.json(result);
  });
});

module.exports = router;
