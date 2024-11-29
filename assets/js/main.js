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
document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
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

// Функция для отображения кнопок выбора недели
function showWeeks(semester) {
    // Скрыть все блоки с неделями
    const allWeeks = document.querySelectorAll('.semester-weeks');
    allWeeks.forEach(week => {
        week.style.display = 'none';
    });

    // Скрыть блок с расписанием, но показать блок с консультациями при выборе семестра
    var scheduleContainer = document.getElementById("schedule-container");
    if (scheduleContainer.style.display === "block") {
        scheduleContainer.style.display = "none";
    }

    // Показать выбранный семестр
    const selectedSemester = document.getElementById(semester);
    if (selectedSemester) {
        selectedSemester.style.display = 'block';
    }

    // Скрыть все расписания
    const allSchedules = document.querySelectorAll('.schedule-day');
    allSchedules.forEach(schedule => {
        schedule.style.display = 'none';
    });

    // Показать консультации для выбранного семестра
    showConsultation(true); // Открыть консультации при выборе семестра
}

// Функция для отображения расписания для дня недели и блоков консультаций
function toggleScheduleVisibility(day) {
    var scheduleContainer = document.getElementById("schedule-container");

    // Если блок с расписанием скрыт, показать его
    if (scheduleContainer.style.display === "none") {
        scheduleContainer.style.display = "block";
    }

    showSchedule(day);  // Показать расписание для выбранного дня

    // Скрыть консультации, когда день выбран
    showConsultation(false); // Закрыть консультации после выбора дня
}

// Функция для отображения расписания для дня недели
function showSchedule(day) {
    // Скрыть все расписания
    const allSchedules = document.querySelectorAll('.schedule-day');
    allSchedules.forEach(schedule => {
        schedule.style.display = 'none';
    });

    // Показать расписание для выбранного дня
    const selectedDay = document.getElementById(day);
    if (selectedDay) {
        selectedDay.style.display = 'block';
    }
}

// Функция для отображения консультаций
function showConsultation(isVisible) {
    const consultations = document.getElementById('consultations-container');
    if (consultations) {
        if (isVisible) {
            consultations.style.display = 'block';  // Показать блок с консультациями
        } else {
            consultations.style.display = 'none';  // Скрыть блок с консультациями
        }
    }
}

const currentMonth = new Date().getMonth();
const months = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];

// Функция для ограничения выбора месяца
function limitMonthSelection() {
    const monthSelect = document.getElementById("month");
    const options = monthSelect.options;

    // Отключаем все месяцы после июня (начало учебного года - сентябрь)
    // Июль и август также исключаем (каникулы)
    for (let i = 0; i < options.length; i++) {
        if (i < 8 || i > currentMonth) { // Июль и август — каникулы, и после текущего месяца
            options[i].disabled = true;
        } else {
            options[i].disabled = false;
        }
    }
}

// Запускаем функцию при загрузке страницы
window.onload = function () {
    limitMonthSelection();
};
