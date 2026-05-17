/**
 * js/storage.js
 * Guarda y recupera los últimos valores introducidos usando localStorage.
 */

const STORAGE_KEY = 'imcData_v2';

/**
 * Guarda los valores actuales del formulario en localStorage.
 */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    height: document.getElementById('height').value,
    weight: document.getElementById('weight').value,
    gender: window._currentGender || 'male'
  }));
}

/**
 * Carga los valores guardados en el formulario y lanza el cálculo si hay datos.
 */
function loadFromStorage() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const h = parseFloat(saved.height);
  const w = parseFloat(saved.weight);
  const height = (h >= 100 && h <= 250) ? String(h) : '175';
  const weight = (w >= 30  && w <= 300) ? String(w) : '70';
  const gender = saved.gender || 'male';
  document.getElementById('height').value = height;
  document.getElementById('weight').value = weight;
  setGender(gender);
  calculateBMI();
}

// Cargar datos al iniciar la página
window.addEventListener('load', loadFromStorage);
