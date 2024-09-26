"use strict"

function mostrar(resultado) {
    console.log(`Estoy mostrando el resultado del ${resultado.getAttribute('name')}`);
    resultado.innerHTML = `Estoy mostrando el resultado del ${resultado.getAttribute('name')}`;
}
