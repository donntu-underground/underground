document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit-btn'); // Кнопка подтверждения регистрации
    const warningAlert = document.querySelector('.warning-alert'); // Алерт по "забытым" данным
    const alertMessage = warningAlert.querySelector('strong');
    const alertDetails = warningAlert.querySelector('br').nextSibling;
    const successAlert = document.querySelector('sl-alert[variant="success"]'); // Алерт успешной регистрации



    button.addEventListener('click', () => {
        const missingFields = [];

        const fields = [{
            id: 'first_name',
            label: 'Фамилия'
        }, {
            id: 'name',
            label: 'Имя'
        }, {
            id: 'email',
            label: 'Почта'
        }, {
            id: 'password',
            label: 'Пароль'
        }, {
            id: 'secret_word',
            label: 'Кодовое слово'
        }, {
            id: 'group',
            label: 'Группа'
        }];

        fields.forEach(field => {
            const el = document.getElementById(field.id);
            if (!el || !el.value.trim()) {
                missingFields.push(field.label);
            }
        });

        if (missingFields.length > 0) {
            alertMessage.textContent = 'Проблема с данными';
            alertDetails.textContent = `Не заполнены поля: ${missingFields.join(', ')}`;
            warningAlert.toast();
            return;
        }

        // Отправка данных
        fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: document.getElementById('first_name').value,
                    name: document.getElementById('name').value,
                    patronomic: document.getElementById('patronomic').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                    secret_word: document.getElementById('secret_word').value,
                    group: document.getElementById('group').value
                })
            })
            .then(res => {
                if (res.ok) {
                    successAlert.toast();
                } else {
                    alertMessage.textContent = 'Ошибка регистрации';
                    alertDetails.textContent = 'Сервер вернул ошибку. Попробуйте позже.';
                    warningAlert.toast();
                }
            })
            .catch(err => {
                console.error('Ошибка сети:', err);
                alertMessage.textContent = 'Сервер недоступен';
                alertDetails.textContent =
                    'Проверьте подключение к интернету или повторите попытку позже.';
                warningAlert.toast();
            });
    });
});
