"use strict";
window.onload = function() {
    const form = document.getElementById('loginForm');
    const divlog = document.getElementById('login');
    const contenidoSecreto = document.getElementById('contenido'); // Div que se oculta

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        // Comprobación de las credenciales
        if (user === "zarco" && pass === "12345") {
            alert("Acceso concedido. ¡Bienvenido!");

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
};