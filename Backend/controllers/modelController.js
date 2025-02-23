const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const fs = require('fs');

// Function to send image file to Flask API for prediction
async function getPrediction(file) {
  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(file.tempFilePath));
    const url = process.env.FLASK_URL;
    const response = await fetch(String(url), {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching prediction:", error);
    return null;
  }
}


module.exports = { getPrediction };