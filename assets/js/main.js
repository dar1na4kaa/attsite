document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === "admin@gmail.com" && password === "1234") {
        alert("Вход выполнен успешно!");
        window.location.href = "personal_account.html";
    } else {
        var errorMessage = document.getElementById('error-message');
        errorMessage.style.display = "block";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        const confirmation = confirm("Вы уверены, что хотите выйти?");

        if (confirmation) {
            window.location.href = 'index.html';
        }
    });
});