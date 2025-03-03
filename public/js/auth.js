document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const logoutButton = document.getElementById('logoutButton');
    const loginLink = document.getElementById('loginLink');

    // Переключение между формами авторизации и регистрации
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Отправка формы авторизации
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            });
    });

    // Отправка формы регистрации
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Форма регистрации отправлена"); // Отладка

        const username = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('#password').value;
        const confirmPassword = registerForm.querySelector('#confirmPassword').value;

        console.log("Данные формы:", { username, email, password, confirmPassword }); // Логирование

        if (password !== confirmPassword) {
            document.getElementById('passwordError').style.display = 'block';
            return; // Остановить выполнение, если пароли не совпадают
        }

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Показываем сообщение об успешной регистрации
                    document.getElementById('registrationSuccess').style.display = 'block';

                    // Перезагружаем страницу через 2 секунды
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error("Ошибка при отправке запроса:", error);
            });
        if (data.success) {
            document.getElementById('registrationSuccess').style.display = 'block';
            registerForm.reset(); // Очистка формы
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    });

    // Проверка авторизации при загрузке страницы
    fetch('/check-auth')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Показываем контент личного кабинета
                document.querySelector('.profile-content').style.display = 'block';
                document.querySelector('.profile-header h1').textContent = `Добро пожаловать, ${data.user.username}`;

                // Показываем кнопку "Выйти"
                logoutButton.style.display = 'block';

                // Скрываем надпись "Войти"
                loginLink.style.display = 'none';
            } else {
                // Показываем надпись "Войти"
                loginLink.style.display = 'block';

                // Скрываем кнопку "Выйти"
                logoutButton.style.display = 'none';

                // Показываем модальное окно авторизации
                modal.style.display = 'flex';
            }
        });

    // Обработка выхода из системы
    logoutButton.addEventListener('click', () => {
        fetch('/logout', {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.reload();
                }
            });
    });

    // Обработка клика на "Войти"
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });
});