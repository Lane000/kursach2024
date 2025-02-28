function initMap() {
  var map = new ymaps.Map("map", {
    center: [51.765334, 55.124147], // Координаты центра карты (Москва)
    zoom: 10,
  });

  var placemark = new ymaps.Placemark([51.765334, 55.124147], {
    hintContent: "Мы здесь!",
    balloonContent: "Наш офис находится здесь.",
  });

  map.geoObjects.add(placemark);
}

ymaps.ready(initMap);
initMap();

function openForm(formId) {
  const form = document.getElementById(formId);
  form.style.display = "block";
  
 
  form.style.position = "fixed";
  form.style.top = "50%";
  form.style.left = "50%";
  form.style.transform = "translate(-50%, -50%)";
  

  setTimeout(() => {
      document.addEventListener('click', closeFormOnClickOutside);
  }, 0); 
}

function closeForm(formId) {
  const form = document.getElementById(formId);
  form.style.display = "none";
  document.removeEventListener('click', closeFormOnClickOutside);
}

function closeFormOnClickOutside(e) {
  const forms = document.querySelectorAll('.form-popup');
  
  forms.forEach((form) => {
      if (form.style.display === "block" && !form.contains(e.target) && !e.target.closest('.btn-gast')) {
          form.style.display = "none"; 
      }
  });
}







// Открытие модального окна
document.getElementById('openModal').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'flex';
});

// Закрытие модального окна
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', function(event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
});

// Переключение на форму регистрации
document.getElementById('switchToRegister').addEventListener('click', function() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
});

// Переключение на форму авторизации
document.getElementById('switchToLogin').addEventListener('click', function() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

// Проверка совпадения паролей
document.getElementById('registerFormElement').addEventListener('submit', function(event) {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const passwordError = document.getElementById('passwordError');

  if (password !== confirmPassword) {
    passwordError.style.display = 'block'; // Показываем ошибку
    event.preventDefault(); // Отменяем отправку формы
  } else {
    passwordError.style.display = 'none'; // Скрываем ошибку, если пароли совпали
  }
});