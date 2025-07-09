document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.success-button');
    if (!container) {
        console.error('Контейнер не найден!');
        return;
    }

    const button = container.querySelector('sl-button');
    const successAlert = container.querySelector('sl-alert[variant="success"]');

    if (!button || !successAlert) {
        console.error('Кнопка или алерт не найдены!');
        return;
    }

    button.addEventListener('click', () => {
        successAlert.toast(); // Всегда показываем success-алерт
    });
});
