document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('text-danger', 'text-center', 'mt-3');

    // Функция для проверки правильности данных
    function validateForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Проверка на пустоту полей
        if (!email || !password) {
            errorMessage.textContent = 'Все поля должны быть заполнены!';
            loginForm.appendChild(errorMessage);
            return false;
        }

        // Проверка на правильность email
        if (!validEmailRegex.test(email)) {
            errorMessage.textContent = 'Пожалуйста, введите правильный email!';
            loginForm.appendChild(errorMessage);
            return false;
        }

        return true;
    }

    // Обработчик события на отправку формы
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Отменяем стандартное поведение формы

        // Убираем предыдущее сообщение об ошибке (если оно есть)
        if (loginForm.contains(errorMessage)) {
            loginForm.removeChild(errorMessage);
        }

        // Проверка данных перед отправкой
        if (!validateForm()) {
            return;
        }

        // Получаем данные из полей формы
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Примерная имитация успешной авторизации
        // Сохраняем данные в localStorage (для демонстрации)
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

        // Проверка правильности введенных данных (имитация)
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if (storedEmail === email && storedPassword === password) {
            // Успешная авторизация (редирект на главную страницу)
            alert('Авторизация успешна!');
            window.location.href = 'dashboard.html'; // Перенаправление на главную страницу (замените на свою)
        } else {
            // Ошибка авторизации
            errorMessage.textContent = 'Неправильный email или пароль!';
            loginForm.appendChild(errorMessage);
        }
    });
});
document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    alert('Пользователь удалён!');
    window.location.href = 'list_users.html'; // Перенаправление на список пользователей
});
document.getElementById('addPostForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Получаем данные формы
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (title && content) {
        // Добавляем запись в список (для примера)
        const postList = document.querySelector('.posts-list');
        const newPost = document.createElement('div');
        newPost.classList.add('post-item');
        newPost.innerHTML = `
            <h5>${title}</h5>
            <p>${content}</p>
        `;
        postList.prepend(newPost);

        // Очищаем форму
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
});
