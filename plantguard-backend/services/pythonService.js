const { exec } = require('child_process');
const path = require('path');

const runPlantDiagnosis = (plantId, callback) => {
  const scriptPath = path.join(__dirname, '..', 'plantguard_ai.py');
  if (!/^[a-zA-Z0-9]+$/.test(plantId)) {
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

module.exports = { runPlantDiagnosis };
