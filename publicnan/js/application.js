// Обработка отправки формы
document.getElementById('applicationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

    const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        alert('Заявка успешно отправлена!');
        document.getElementById('applicationForm').reset();
    } else {
        alert('Ошибка при отправке заявки');
    }
});