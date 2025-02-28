const express = require('express');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

// Роуты для заявок
router.post('/requests', applicationController.createApplication);

module.exports = router;