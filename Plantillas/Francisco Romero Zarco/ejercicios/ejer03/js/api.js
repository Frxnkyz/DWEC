"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton');
    const resultado = document.getElementById('resultado');
    const imagenPersonaje = document.getElementById('imagen-personaje');

    const imagenesPersonajes = {
        yoda: './img/yoda.png',
        darthvader: './img/darthvader.png',
        obiwan: './img/obiwan.png',
        leia: './img/leia.png',
        lukeskywalker: './img/lukeskywalker.png',
        hansolo: './img/hansolo.png',
        emperor: './img/emperor.png',
        c3po: './img/c3po.png'
    };

    // Variables para controlar las solicitudes
    let requestCount = 0;
    const requestLimit = 5; // Límite de peticiones antes de bloquear
    const blockTime = 60000; // Tiempo de bloqueo en milisegundos (1 minuto)
    let blocked = false;

    // Función para verificar si se ha alcanzado el límite
    const checkRequestLimit = () => {
        if (requestCount >= requestLimit) {
            blocked = true;
            resultado.textContent = 'Has alcanzado el límite de solicitudes. Espera un minuto para intentar de nuevo.';
            setTimeout(() => {
                requestCount = 0; // Reinicia el contador después del tiempo de bloqueo
                blocked = false;
                resultado.textContent = ''; // Limpia el mensaje después del bloqueo
            }, blockTime);
            return false;
        }
        return true;
    };

    boton.addEventListener('click', async () => {
        if (blocked) {
            resultado.textContent = 'Espera un momento antes de hacer otra solicitud.';
            return;
        }

        if (!checkRequestLimit()) {
            return; // Bloquea la solicitud si se alcanzó el límite
        }

        const personajeSeleccionado = document.getElementById('personaje').value;
        const url = `https://star-wars-quotes-api-character-collection.p.rapidapi.com/quote?character=${personajeSeleccionado}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '7be93deea5msh413f0c4245ad8bdp104169jsnbaea2ed7cf36', // Nuevo API Key
                'x-rapidapi-host': 'star-wars-quotes-api-character-collection.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            requestCount++; // Incrementa el contador de solicitudes
            const result = await response.json(); // Cambiado a .json() para manejar JSON

            // Formato requerido: "la quota" -El nombre del personaje
            resultado.textContent = `"${result.quote}" - ${result.character}`;

            // Mostrar la imagen del personaje
            const imagenSrc = imagenesPersonajes[personajeSeleccionado];
            if (imagenSrc) {
                imagenPersonaje.innerHTML = `<img src="${imagenSrc}" alt="${personajeSeleccionado}" class="imagen-personaje-borde">`;
            } else {
                imagenPersonaje.innerHTML = '';
            }
        } catch (error) {
            console.error(error);
            resultado.textContent = 'Ocurrió un error al obtener la quote.';
        }
    });
});
