document.addEventListener('DOMContentLoaded', function () {
    // Get the logout button by its ID
    const logoutButton = document.getElementById('logoutButton');

    // Add event listener to the logout button
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default action (link navigation)

        // Show confirmation dialog
        const confirmation = confirm("Вы уверены, что хотите выйти?");

        // If user confirms, redirect to the login page
        if (confirmation) {
            window.location.href = 'index.html'; // Replace with your actual login page URL
        }
    });
});