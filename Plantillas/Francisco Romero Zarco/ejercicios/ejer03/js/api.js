"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton');
    const resultado = document.getElementById('resultado');

    // Evento click para obtener una quote
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
            console.log(result); // Verifica la estructura del objeto

            // Manejo del error si el personaje no se encuentra
            if (result.error) {
                resultado.textContent = `Error: ${result.error}. Los personajes disponibles son: ${result.availableCharacters.join(', ')}`;
                return;
            }

            // Mostrar el resultado en el elemento correspondiente
            resultado.textContent = `"${result.quote}" - ${result.character}`;
        } catch (error) {
            console.error(error);
            resultado.textContent = 'Ocurrió un error al obtener la quote.';
        }
    });
});
