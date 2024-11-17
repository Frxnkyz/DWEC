'use strict';

let db;

// Inicializar IndexedDB
function initDB() {
    const request = indexedDB.open('LoginDB', 1);

    request.onerror = function (event) {
        console.error('IndexedDB: Error al abrir la base de datos', event);
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log('IndexedDB: Base de datos abierta exitosamente');
        updateTable();
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('LoginStore')) {
            const store = db.createObjectStore('LoginStore', { keyPath: 'name' });
            console.log('IndexedDB: Almacén creado');
        }
    };
}

// Guardar en IndexedDB
function saveToIndexedDB(name, value) {
    if (!db) {
        console.error('IndexedDB no está inicializado');
        return;
    }

    const transaction = db.transaction(['LoginStore'], 'readwrite');
    const store = transaction.objectStore('LoginStore');
    const request = store.put({ name, value });

    request.onsuccess = function () {
        console.log(`IndexedDB: Guardado ${name}=${value}`);
        updateTable();
    };

    request.onerror = function (event) {
        console.error('IndexedDB: Error al guardar el dato', event);
    };
}

// Obtener todos los datos de IndexedDB
function getAllIndexedDB(callback) {
    if (!db) {
        console.error('IndexedDB no está inicializado');
        return;
    }

    const transaction = db.transaction(['LoginStore'], 'readonly');
    const store = transaction.objectStore('LoginStore');
    const request = store.getAll();

    request.onsuccess = function (event) {
        callback(event.target.result);
    };

    request.onerror = function (event) {
        console.error('IndexedDB: Error al obtener datos', event);
    };
}

// Borrar en IndexedDB
function deleteFromIndexedDB(name) {
    if (!db) return;
    const transaction = db.transaction(['LoginStore'], 'readwrite');
    const store = transaction.objectStore('LoginStore');
    store.delete(name).onsuccess = updateTable;
}

// Funciones para Cookies
function setCookie(name, value, minutes) {
    const expires = new Date(Date.now() + minutes * 60000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookies() {
    return document.cookie.split('; ').map(cookie => {
        const [name, value] = cookie.split('=');
        return { name, value };
    });
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Funciones para Local Storage
function saveToLocalStorage(name, value) {
    const item = { name, value };
    localStorage.setItem(name, JSON.stringify(item));
}

function getLocalStorage() {
    return Object.keys(localStorage).map(key => {
        try {
            const item = localStorage.getItem(key);
            return JSON.parse(item);
        } catch (error) {
            console.error(`Error al parsear JSON para la clave "${key}":`, error);
            localStorage.removeItem(key); // Eliminar el dato corrupto
            return null;
        }
    }).filter(item => item !== null);
}

function deleteFromLocalStorage(name) {
    localStorage.removeItem(name);
}

// Cargar datos desde la API
async function loadFromAPI(count = 1) {
    const API_URL = 'https://jsonplaceholder.typicode.com/users';
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        data.slice(0, count).forEach(user => {
            saveToLocalStorage(user.name, user.email);
        });
        updateTable();
    } catch (error) {
        console.error('Error al cargar datos desde la API:', error);
    }
}

// Actualizar tabla con datos de cookies, local storage e IndexedDB
function updateTable() {
    const tbody = document.getElementById('data-body');
    tbody.innerHTML = '';

    // Mostrar datos de Cookies
    getCookies().forEach(({ name, value }) => {
        addRow(tbody, name, value, 'cookie');
    });

    // Mostrar datos de Local Storage
    getLocalStorage().forEach(({ name, value }) => {
        addRow(tbody, name, value, 'localStorage');
    });

    // Mostrar datos de IndexedDB solo si está inicializado
    if (db) {
        getAllIndexedDB(items => {
            items.forEach(({ name, value }) => {
                addRow(tbody, name, value, 'indexedDB');
            });
        });
    }
}

function addRow(tbody, name, value, type) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${value}</td>
        <td><button onclick="deleteData('${name}', '${type}')">Borrar</button></td>
    `;
    tbody.appendChild(row);
}

function deleteData(name, type) {
    if (type === 'cookie') deleteCookie(name);
    if (type === 'localStorage') deleteFromLocalStorage(name);
    if (type === 'indexedDB') deleteFromIndexedDB(name);
    updateTable();
}

// Eventos de formularios
document.getElementById('data-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const value = document.getElementById('value').value;
    setCookie(name, value, 1);
    updateTable();
});

document.getElementById('storage-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('storage-name').value;
    const value = document.getElementById('storage-value').value;
    saveToLocalStorage(name, value);
    updateTable();
});

document.getElementById('indexeddb-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('indexeddb-name').value;
    const value = document.getElementById('indexeddb-value').value;
    saveToIndexedDB(name, value);
    updateTable();
});

document.getElementById('load-api').addEventListener('click', () => loadFromAPI(1));
document.getElementById('load-1').addEventListener('click', () => loadFromAPI(1));
document.getElementById('load-5').addEventListener('click', () => loadFromAPI(5));

// Inicializar la base de datos y actualizar tabla al cargar la página
initDB();
updateTable();
