"use strict"

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

    
    boton.addEventListener('click', async () => {
        const personajeSeleccionado = document.getElementById('personaje').value;
        const url = `https://star-wars-quotes-api-character-collection.p.rapidapi.com/quote?character=${personajeSeleccionado}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'e4e9ad3badmsh2a13355db09dec4p17a8c1jsn1f0533d14d68',
                'x-rapidapi-host': 'star-wars-quotes-api-character-collection.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            // Manejo del error si el personaje no se encuentra
            if (result.error) {
                resultado.textContent = `Error: ${result.error}. Los personajes disponibles son: ${result.availableCharacters.join(', ')}`;
                return;
            }

            // Mostrar la quote y el personaje
            resultado.textContent = `"${result.quote}" - ${result.character}`;

            // Mostrar la imagen del personaje
            const imagenSrc = imagenesPersonajes[personajeSeleccionado];
            if (imagenSrc) {
                imagenPersonaje.innerHTML = `<img src="${imagenSrc}" alt="${result.character}" class="imagen-personaje-borde">`;
            } else {
                imagenPersonaje.innerHTML = '';
            }
        } catch (error) {
            console.error(error);
            resultado.textContent = 'Ocurrió un error al obtener la quote.';
        }
    });
});
