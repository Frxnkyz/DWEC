    // Función para añadir valores al display en las calculadoras básica y científica
    function appendValue(value) {
        document.getElementById("display").value += value; // Añade el valor presionado al display
    }

    // Función para limpiar el contenido del display
    function clearDisplay() {
        document.getElementById("display").value = ""; // Limpia el display estableciendo el valor a una cadena vacía
    }

    // Función para eliminar el último carácter ingresado en el display
    function deleteChar() {
        let currentValue = document.getElementById("display").value; // Toma el valor actual del display
        document.getElementById("display").value = currentValue.slice(0, -1); // Elimina el último carácter del display
    }

    // Función para realizar el cálculo de la expresión en el display
    function calculate() {
        try {
            document.getElementById("display").value = eval(document.getElementById("display").value); // Evalúa la expresión aritmética del display
        } catch (error) {
            document.getElementById("display").value = "Error"; // Muestra "Error" si la expresión es inválida
        }
    }

    // Función para alternar entre las calculadoras (básica, científica, cambio de base)
    function toggleCalculator() {
        let calcType = document.getElementById("calcType").value; // Obtiene el valor seleccionado en el desplegable
        document.getElementById("basic").style.display = "none"; // Oculta la calculadora básica
        document.getElementById("scientific").style.display = "none"; // Oculta la calculadora científica
        document.getElementById("base-converter").style.display = "none"; // Oculta el conversor de bases

        // Muestra la calculadora correspondiente según la opción seleccionada
        if (calcType === "basic") {
            document.getElementById("basic").style.display = "grid"; // Muestra la calculadora básica
        } else if (calcType === "scientific") {
            document.getElementById("scientific").style.display = "grid"; // Muestra la calculadora científica
        } else if (calcType === "base") {
            document.getElementById("base-converter").style.display = "grid"; // Muestra el conversor de bases
        }
    }

    /* ----------------- Funciones para el cambio de base ------------------ */

    // Función para añadir valores al display del conversor de bases
    function appendValueBase(value) {
        let currentValue = document.getElementById("display").value; // Obtiene el valor actual del display
        document.getElementById("display").value = currentValue + value; // Añade el valor presionado al display
    }

    // Función para limpiar el contenido del display en el conversor de bases
    function clearDisplayBase() {
        document.getElementById("display").value = ""; // Limpia el display del conversor
    }

    // Función para eliminar el último carácter ingresado en el display del conversor
    function deleteCharBase() {
        let currentValue = document.getElementById("display").value; // Toma el valor actual del display
        document.getElementById("display").value = currentValue.slice(0, -1); // Elimina el último carácter del display
    }

    // Función para evaluar una expresión ingresada en el conversor de bases
    function calculateBase() {
        try {
            document.getElementById("display").value = eval(document.getElementById("display").value); // Evalúa la expresión aritmética en el conversor
        } catch (error) {
            document.getElementById("display").value = "Error"; // Muestra "Error" si la expresión es inválida
        }
    }

    // Función para convertir valores entre diferentes bases
    function convertBase(base) {
        let value = document.getElementById("display").value; // Obtiene el valor del display

        if (value === "") return; // Retorna si el display está vacío

        let result;
        switch (base) {
            case "dec":
                result = parseInt(value, 10); // Convierte el valor a decimal
                break;
            case "bin":
                result = parseInt(value, 10).toString(2); // Convierte el valor a binario
                break;
            case "hex":
                result = parseInt(value, 10).toString(16).toUpperCase(); // Convierte el valor a hexadecimal
                break;
            case "oct":
                result = parseInt(value, 10).toString(8); // Convierte el valor a octal
                break;
            default:
                result = "Error"; // Muestra "Error" si no se reconoce la base
        }

        document.getElementById("display").value = result; // Muestra el resultado en el display
    }
