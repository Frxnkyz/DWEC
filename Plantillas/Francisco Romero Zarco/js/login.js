"use strict";
window.onload = function() {
    const form = document.getElementById('loginForm');
    const divlog = document.getElementById('login');
    const contenidoSecreto = document.getElementById('contenido'); // Div que se oculta

    // Función para establecer las cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Función para obtener las cookies
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Comprobar si el usuario ya ha iniciado sesión
    const loggedInUser = getCookie('username');
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
            setCookie('username', user, 1 / 1440); // Guarda el nombre de usuario en una cookie por 1 minuto

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
        // Eliminar la cookie de la sesión
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Eliminar la cookie de usuario
    
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
