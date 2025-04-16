
const { PythonShell } = require('python-shell');
const path = require('path');

// Service for interacting with Python scripts
const pythonService = {
  /**
   * Analyze an image using the Python AI model
   * @param {string} imagePath - Path to the uploaded image
   * @returns {Promise} - Promise resolving to analysis results
   */
  analyzeImage: function(imagePath) {
    return new Promise((resolve, reject) => {
      const options = {
        mode: 'json',
        pythonPath: 'python3', // Adjust based on your environment
        pythonOptions: ['-u'], // unbuffered output
        scriptPath: path.join(__dirname, '..'),
        args: [imagePath]
      };

      PythonShell.run('plantguard_ai.py', options)
        .then(results => {
          if (results && results.length > 0) {
            resolve(results[0]); // Return the analysis result
          } else {
            reject(new Error('No analysis results returned'));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

module.exports = pythonService;
