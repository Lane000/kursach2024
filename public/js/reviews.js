document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM полностью загружен');

  // Проверка существования элемента #reviewModal
  const reviewModal = document.getElementById('reviewModal');
  if (reviewModal) {
    console.log('Элемент #reviewModal найден');
  } else {
    console.error('Элемент #reviewModal не найден');
  }

  // Функция для настройки кнопки "Оставить отзыв"
  function setupReviewButton() {
    const myBtn = document.getElementById('myBtn');
    if (myBtn) {
      myBtn.addEventListener('click', function (event) {
        event.preventDefault();

        // Проверка авторизации
        fetch('/auth/check', {
          method: 'GET',
          credentials: 'include',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Ошибка сети: ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            if (data.isAuthenticated) {
              // Пользователь авторизован, показываем форму
              const reviewModal = document.getElementById('reviewModal');
              if (reviewModal) {
                reviewModal.style.display = 'block';
              } else {
                console.error('Элемент #reviewModal не найден в DOM');
              }
            } else {
              // Пользователь не авторизован, показываем сообщение
              alert('Для оставления отзыва необходимо авторизоваться.');
            }
          })
          .catch(error => {
            console.error('Ошибка при проверке авторизации:', error);
          });
      });
    } else {
      console.error('Кнопка "Оставить отзыв" не найдена');
    }
  }

  // Настройка кнопки "Оставить отзыв" при загрузке страницы
  setupReviewButton();

  // Функция для загрузки отзывов
  function loadReviews() {
    fetch('/api/reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          const reviewsContainer = document.getElementById('reviewsContainer');
          reviewsContainer.innerHTML = ''; // Очищаем контейнер

          // Добавляем каждый отзыв на страницу
          data.reviews.forEach(review => {
            const newReview = document.createElement('div');
            newReview.className = 'reviews';

            newReview.innerHTML = `
              <img src="../imgs/default-avatar.jpg" alt="Аватар" class="ava"/>
              <div class="desc_avatar">
                <p class="name">${review.username}</p>
                <div class="text_reviews">${review.text}</div>
              </div>
            `;

            reviewsContainer.appendChild(newReview);
          });

          // Добавляем кнопку "Оставить отзыв" после отзывов
          const submitButton = document.createElement('div');
          submitButton.className = 'reviews btn';
          submitButton.innerHTML = `
            <button class="submit" id="myBtn">Оставить отзыв</button>
          `;
          reviewsContainer.appendChild(submitButton);

          // Настройка кнопки "Оставить отзыв" после добавления
          setupReviewButton();
        } else {
          console.error('Ошибка при загрузке отзывов:', data.message);
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }

  // Загружаем отзывы при загрузке страницы
  loadReviews();

  // Закрытие модального окна при клике вне формы
  window.addEventListener('click', function (event) {
    const modal = document.getElementById('reviewModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Обработка отправки формы отзыва
  document.getElementById('reviewForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const reviewText = document.getElementById('reviewText').value;

    // Отправка данных на сервер
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ text: reviewText }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Закрываем модальное окно
          const reviewModal = document.getElementById('reviewModal');
          if (reviewModal) {
            reviewModal.style.display = 'none';
          } else {
            console.error('Элемент #reviewModal не найден в DOM');
          }

          // Добавляем новый отзыв на страницу
          const reviewsContainer = document.getElementById('reviewsContainer');
          const newReview = document.createElement('div');
          newReview.className = 'reviews';

          newReview.innerHTML = `
                <img src="../imgs/default-avatar.jpg" alt="Аватар" class="ava"/>
                <div class="desc_avatar">
                    <p class="name">${data.username}</p>
                    <div class="text_reviews">${reviewText}</div>
                </div>
            `;

          reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);

          // Очищаем форму
          document.getElementById('reviewText').value = '';
        } else {
          alert('Ошибка при отправке отзыва: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  });
});