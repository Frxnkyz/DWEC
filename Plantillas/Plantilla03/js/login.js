"use strict"
window.onload = function() {
    let user = "";
    let pass = "";

    // Solicita el nombre de usuario hasta que se ingrese uno válido
    do {
        user = prompt("Por favor, ingrese su nombre de usuario:");
        if (!user || user.trim() === "") {
            alert("El nombre de usuario es obligatorio.");
        }
    } while (!user || user.trim() === "");

    // Solicita la contraseña hasta que se ingrese una válida
    do {
        pass = prompt("Ingrese su contraseña:");
        if (!pass || pass.trim() === "") {
            alert("Debe proporcionar una contraseña válida.");
        }
    } while (!pass || pass.trim() === "");

    // Comprobación de las credenciales
    if (user === "zarco" && pass === "12345") {
        alert("Acceso concedido. ¡Bienvenido!");
        document.getElementsByTagName("body")[0].style.display="block" ; 
    } else {
        let intento = confirm("Usuario o contraseña incorrectos. ¿Quieres intentarlo de nuevo?");
        if (intento) {
            location.reload(); // Recarga la página para reiniciar el proceso
        } else {
            alert("Acceso denegado.");
            window.close(); // Cierra la ventana si es una emergente
        }
    }
};
