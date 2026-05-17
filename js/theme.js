/**
 * js/theme.js
 * Dark/light mode con persistencia en localStorage.
 * Usa iconos SVG separados #iconLight / #iconDark.
 * Dispara evento global 'themechange' para que otros módulos puedan reaccionar.
 */

(function initTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('darkToggle');

  const saved = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(t, fireEvent) {
    html.classList.toggle('dark', t === 'dark');
    document.getElementById('iconLight').classList.toggle('hidden', t !== 'dark');
    document.getElementById('iconDark').classList.toggle('hidden',  t === 'dark');
    if (fireEvent) {
      document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: t } }));
    }
  }

  applyTheme(saved, false);

  btn.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    const next   = isDark ? 'light' : 'dark';
    applyTheme(next, true);
    localStorage.setItem('theme', next);
  });

  // Reaccionar si el SO cambia preferencia en tiempo real
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light', true);
    }
  });
})();
