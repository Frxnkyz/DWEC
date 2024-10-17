"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const inputTextArea = document.getElementById("textarea");
    const speedInput = document.getElementById("speed");
    const speedValueDisplay = document.getElementById("speed-value");
    const randomTransformButton = document.getElementById("random-transform");

    // Funciones de transformación
    const toUpperCase = (text) => text.toUpperCase();
    const toLowerCase = (text) => text.toLowerCase();
    const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1);
    const capitalizeLast = (text) => text.slice(0, -1) + text.charAt(text.length - 1).toUpperCase();
    const firstLowercase = (text) => text.charAt(0).toLowerCase() + text.slice(1);
    const lastLowercase = (text) => text.slice(0, -1) + text.charAt(text.length - 1).toLowerCase();
    const vowelsUppercase = (text) => text.replace(/[aeiouáéíóú]/gi, (v) => v.toUpperCase());
    const vowelsLowercase = (text) => text.replace(/[AEIOUÁÉÍÓÚ]/g, (v) => v.toLowerCase());
    const consonantsUppercase = (text) => text.replace(/[^aeiouáéíóú]/gi, (c) => c.toUpperCase());
    const consonantsLowercase = (text) => text.replace(/[^AEIOUÁÉÍÓÚ]/g, (c) => c.toLowerCase());

    // Array de transformaciones
    const transformations = [
        toUpperCase,
        toLowerCase,
        capitalizeFirst,
        capitalizeLast,
        firstLowercase,
        lastLowercase,
        vowelsUppercase,
        vowelsLowercase,
        consonantsUppercase,
        consonantsLowercase,
    ];

    let isRandomTransformActive = false; // Controla si las transformaciones aleatorias están activas
    let interval; // Para almacenar el intervalo

    // Función para aplicar transformación aleatoria
    const applyRandomTransform = () => {
        if (isRandomTransformActive) {
            const text = inputTextArea.value;
            if (text) {
                const selectedTransform = transformations[Math.floor(Math.random() * transformations.length)];
                inputTextArea.value = selectedTransform(text);
            }
        }
    };

    randomTransformButton.addEventListener("click", () => {
        if (isRandomTransformActive) {
            // Si las transformaciones están activas, detén el proceso
            isRandomTransformActive = false;
            clearInterval(interval); // Detiene el intervalo
            randomTransformButton.classList.remove("btn-active"); // Elimina el estilo activo
            inputTextArea.value = "Transformaciones Aleatorias Desactivadas."; // Mensaje opcional
        } else {
            // Si no están activas, comienza a aplicar una transformación aleatoria
            isRandomTransformActive = true;
            randomTransformButton.classList.add("btn-active"); // Activa el estilo

            // Inicia un intervalo para aplicar transformaciones aleatorias
            interval = setInterval(applyRandomTransform, speedInput.value);
        }
    });

    // Event listeners para los botones de transformación
    document.getElementById("uppercase").addEventListener("click", () => {
        inputTextArea.value = toUpperCase(inputTextArea.value);
    });

    document.getElementById("lowercase").addEventListener("click", () => {
        inputTextArea.value = toLowerCase(inputTextArea.value);
    });

    document.getElementById("capitalize-first").addEventListener("click", () => {
        inputTextArea.value = capitalizeFirst(inputTextArea.value);
    });

    document.getElementById("capitalize-last").addEventListener("click", () => {
        inputTextArea.value = capitalizeLast(inputTextArea.value);
    });

    document.getElementById("first-lowercase").addEventListener("click", () => {
        inputTextArea.value = firstLowercase(inputTextArea.value);
    });

    document.getElementById("last-lowercase").addEventListener("click", () => {
        inputTextArea.value = lastLowercase(inputTextArea.value);
    });

    document.getElementById("vowels-uppercase").addEventListener("click", () => {
        inputTextArea.value = vowelsUppercase(inputTextArea.value);
    });

    document.getElementById("vowels-lowercase").addEventListener("click", () => {
        inputTextArea.value = vowelsLowercase(inputTextArea.value);
    });

    document.getElementById("consonants-uppercase").addEventListener("click", () => {
        inputTextArea.value = consonantsUppercase(inputTextArea.value);
    });

    document.getElementById("consonants-lowercase").addEventListener("click", () => {
        inputTextArea.value = consonantsLowercase(inputTextArea.value);
    });

    // Actualizar el valor del span cuando se mueve la barra de desplazamiento
    speedInput.addEventListener("input", () => {
        speedValueDisplay.textContent = `${speedInput.value} ms`;
    });
});
