const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/hostaway', reviewController.getHostawayReviews);

module.exports = router;
