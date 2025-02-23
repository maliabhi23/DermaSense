// require('dotenv').config();

// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// const searchHospitals = async (req, res) => {
//   const { lat, lng } = req.query;
//   if (!lat || !lng) {
//     return res.status(400).json({ error: 'Latitude and longitude are required' });
//   }

//   try {
//     const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${lng},${lat}&limit=10&access_token=${accessToken}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     const hospitals = data.features.map((hospital) => ({
//       name: hospital.text,
//       address: hospital.place_name,
//       lat: hospital.geometry.coordinates[1],
//       lng: hospital.geometry.coordinates[0],
//     }));

//     res.json(hospitals);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch hospitals', details: error.message });
//   }
// };

// module.exports = { searchHospitals };

require("dotenv").config();
//new
const searchHospitals = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const accessToken = process.env.MAPBOX_ACCESS_TOKEN;

    // Define bounding box for India (approximate values)
    const indiaBoundingBox = '68.17665,6.74714,97.40256,35.67454'; // [westLng,southLat,eastLng,northLat]

    const proximity = `${lng},${lat}`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${proximity}&bbox=${indiaBoundingBox}&limit=5&access_token=${accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      return res.status(404).json({ error: 'No nearby hospitals found' });
    }

    const hospitals = data.features.map((hospital) => ({
      name: hospital.text,
      address: hospital.place_name,
      lat: hospital.geometry.coordinates[1],
      lng: hospital.geometry.coordinates[0],
    }));

    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hospitals', details: error.message });
  }
};




//old
// const searchHospitals = async (req, res) => {
//   const { lat, lng } = req.query;
//   if (!lat || !lng) {
//     return res.status(400).json({ error: 'Latitude and longitude are required' });
//   }

//   try {
//     const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
//     const boundingBox = `${lng - 1},${lat - 1},${lng + 1},${lat + 1}`;
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?bbox=${boundingBox}&limit=10&access_token=${accessToken}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     const hospitals = data.features.map((hospital) => ({
//       name: hospital.text,
//       address: hospital.place_name,
//       lat: hospital.geometry.coordinates[1],
//       lng: hospital.geometry.coordinates[0],
//     }));

//     res.json(hospitals);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch hospitals', details: error.message });
//   }
// };

module.exports = { searchHospitals };
