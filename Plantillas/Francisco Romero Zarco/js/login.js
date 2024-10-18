"use strict";
window.onload = function() {
    const form = document.getElementById('loginForm');
    const divlog = document.getElementById('login');
    const contenidoSecreto = document.getElementById('contenido'); // Div que se oculta

    // Función para establecer datos en localStorage
    function setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    // Función para obtener datos de localStorage
    function getLocalStorage(key) {
        return localStorage.getItem(key);
    }

    // Función para eliminar datos de localStorage
    function removeLocalStorage(key) {
        localStorage.removeItem(key);
    }

    // Comprobar si el usuario ya ha iniciado sesión
    const loggedInUser = getLocalStorage('username');
    if (loggedInUser) {
        alert(`Bienvenido de nuevo, ${loggedInUser}!`);
        divlog.style.display = 'none';
        contenidoSecreto.style.display = 'block';
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        // Comprobación de las credenciales
        if (user === "zarco" && pass === "12345") {
            alert("Acceso concedido. ¡Bienvenido!");
            setLocalStorage('username', user); // Guarda el nombre de usuario en localStorage

            // Ocultar el formulario de login
            divlog.style.display = 'none';

            // Mostrar el contenido oculto
            contenidoSecreto.style.display = 'block';
        } else {
            let intento = confirm("Usuario o contraseña incorrectos. ¿Quieres intentarlo de nuevo?");
            if (intento) {
                form.reset(); // Reinicia el formulario para volver a intentarlo
            } else {
                alert("Acceso denegado.");
            }
        }
    });

    // Función para cerrar sesión
    function cerrarSesion() {
        // Eliminar los datos del usuario en localStorage
        removeLocalStorage('username');

        // Mostrar de nuevo el formulario de inicio de sesión
        divlog.style.display = 'flex'; // Asegúrate de que sea 'flex' para mantener el centrado

        // Ocultar el contenido secreto
        contenidoSecreto.style.display = 'none';
    }

    // Asociar el evento del botón de cerrar sesión
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', cerrarSesion);
    }
};
