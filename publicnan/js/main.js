// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});

// Функция для проверки статуса авторизации
function checkAuthStatus() {
    fetch('/auth/check', {
        method: 'GET',
        credentials: 'include', // Для работы с куки или сессиями
    })
    .then(response => response.json())
    .then(data => {
        if (data.isAuthenticated) {
            showUserInfo(data.username);
        } else {
            showLoginButton();
        }
    })
    .catch(error => {
        console.error('Ошибка при проверке авторизации:', error);
    });
}

// Функция для отображения информации о пользователе
function showUserInfo(username) {
    document.getElementById('login-link').style.display = 'none'; // Скрыть кнопку "Войти"
    document.getElementById('user-info').style.display = 'flex'; // Показать блок с логином
    document.getElementById('username').textContent = username; // Установить логин
}

// Функция для отображения кнопки "Войти"
function showLoginButton() {
    document.getElementById('login-link').style.display = 'block'; // Показать кнопку "Войти"
    document.getElementById('user-info').style.display = 'none'; // Скрыть блок с логином
}

// Обработка выхода из системы
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();
    fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include', // Для работы с куки или сессиями
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Выход выполнен успешно') {
            showLoginButton(); // Показать кнопку "Войти"
        }
    })
    .catch(error => {
        console.error('Ошибка при выходе:', error);
    });
});