'use strict';

let db;

async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LoginDB', 1);

    request.onerror = (event) => reject(event);
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains('LoginStore')) {
        db.createObjectStore('LoginStore', { keyPath: 'name' });
      }
    };
  });
}

// Guardar estado de login en IndexedDB
async function setLoginStatus(name, isLoggedIn) {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['LoginStore'], 'readwrite');
    const store = transaction.objectStore('LoginStore');
    const request = store.put({ name, value: isLoggedIn });

    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event);
  });
}

// Obtener estado de login de IndexedDB
async function getLoginStatus(name) {
  await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['LoginStore'], 'readonly');
    const store = transaction.objectStore('LoginStore');
    const request = store.get(name);

    request.onsuccess = (event) => {
      resolve(event.target.result ? event.target.result.value : null);
    };
    request.onerror = (event) => reject(event);
  });
}

// Función de login
async function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'zarco' && password === '12345') {
    await setLoginStatus('loggedIn', true);
    document.getElementById('login').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
  } else {
    alert('Credenciales incorrectas');
  }
}

// Comprobar estado de login al cargar la página
async function checkLoginStatus() {
  const isLoggedIn = await getLoginStatus('loggedIn');
  if (isLoggedIn) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
  }
}

// Función de logout
async function logout() {
  await setLoginStatus('loggedIn', false);
  document.getElementById('login').style.display = 'block';
  document.getElementById('contenido').style.display = 'none';
}

// Event listeners
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('logoutButton').addEventListener('click', logout);

// Inicializar al cargar
checkLoginStatus();
