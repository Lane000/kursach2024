const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// Роуты для отзывов
router.post('/reviews', reviewController.createReview);
router.get('/reviews', reviewController.getAllReviews);

module.exports = router;