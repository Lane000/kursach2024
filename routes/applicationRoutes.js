const express = require('express');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

// Роуты для заявок
router.post('/applications', applicationController.createApplication);

module.exports = router;