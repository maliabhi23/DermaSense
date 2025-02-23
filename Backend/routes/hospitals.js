const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = express.Router();

const { searchHospitals } = require('../controllers/searchController');

router.get('/nearby', searchHospitals);

module.exports = router;
