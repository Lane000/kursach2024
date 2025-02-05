const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Роуты для авторизации и регистрации
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check', authController.check);

module.exports = router;