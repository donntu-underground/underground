document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit-btn');
    const warningAlert = document.querySelector('.warning-alert');
    const alertMessage = warningAlert.querySelector('strong');
    const alertDetails = warningAlert.querySelector('br').nextSibling;
    const successAlert = document.querySelector('sl-alert[variant="success"]');

    button.addEventListener('click', () => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const missingFields = [];
        if (!email) missingFields.push('Почта');
        if (!password) missingFields.push('Пароль');

        if (missingFields.length > 0) {
            alertMessage.textContent = 'Проблема с данными';
            alertDetails.textContent = `Не заполнены поля: ${missingFields.join(', ')}`;
            warningAlert.toast();
            return;
        }

        // Отправка данных
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            if (res.ok) {
                successAlert.toast();
            } else {
                alertMessage.textContent = 'Ошибка входа';
                alertDetails.textContent = 'Неверный логин или пароль';
                warningAlert.toast();
            }
        }).catch(err => {
            alertMessage.textContent = 'Сервер недоступен';
            alertDetails.textContent =
                'Проверьте подключение к интернету или повторите попытку позже.';
            warningAlert.toast();
        });
    });
});
