/**
 * js/storage.js
 * Guarda y recupera los últimos valores introducidos usando localStorage.
 */

const STORAGE_KEY = 'imcData';

/**
 * Guarda los valores actuales del formulario en localStorage.
 */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    height: document.getElementById('height').value,
    weight: document.getElementById('weight').value,
    age:    document.getElementById('age').value,
    gender: window._currentGender || 'male'
  }));
}

/**
 * Carga los valores guardados en el formulario y lanza el cálculo si hay datos.
 */
function loadFromStorage() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const height = saved.height || '175';
  const weight = saved.weight || '78';
  const age    = saved.age    || '30';
  const gender = saved.gender || 'male';
  document.getElementById('height').value = height;
  document.getElementById('weight').value = weight;
  document.getElementById('age').value    = age;
  setGender(gender);
  calculateBMI();
}

// Cargar datos al iniciar la página
window.addEventListener('load', loadFromStorage);
