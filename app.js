const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const db = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Настройка сессий
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Маршруты
app.use('/api', applicationRoutes);
app.use('/api', reviewRoutes);
app.use('/auth', authRoutes);

// Маршруты для статических страниц
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

app.get('/catalog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'catalog.html'));
});

app.get('/contacts', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'contacts.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'about.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'lk.html'));
});

module.exports = app;

// Middleware для обработки данных из формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Папка для статических файлов (HTML, CSS, JS)

let feedbacks = []; // Массив для хранения отзывов

// Маршрут для получения всех отзывов
app.get('/feedbacks', (req, res) => {
    res.json(db.feedbacks);
});

// Маршрут для получения отзывов в формате HTML для вставки в div
app.get('/feedbacks/html', (req, res) => {
    let feedbacksHtml = db.feedbacks.map(feedback => `
        <div>
            <h3>${feedback.name}</h3>
            <p>${feedback.message}</p>
        </div>
    `).join('');

    res.send(feedbacksHtml);
});

// Маршрут для обработки отправки отзыва
app.post('/feedback', (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        const newFeedback = {
            id: db.feedbacks.length + 1, // Генерируем новый ID
            name,
            message,
        };
        db.feedbacks.push(newFeedback); // Добавляем отзыв в локальные данные
        res.json({ success: true, feedback: newFeedback });
    } else {
        res.status(400).json({ success: false, message: 'Необходимо указать имя и сообщение' });
    }
});

module.exports = app;
