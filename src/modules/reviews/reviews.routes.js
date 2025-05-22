const express = require('express');
const router = express.Router();
const { getAllReviews } = require('./reviews.controller');

router.get('/', getAllReviews);

module.exports = router;