/* lang.js — EN/ES language toggle for all pages */
(function () {
  var lang = localStorage.getItem('lang') || 'es';

  function apply(l) {
    lang = l;
    localStorage.setItem('lang', l);
    document.documentElement.setAttribute('lang', l);

    /* data-en elements: swap innerHTML */
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.innerHTML);
      el.innerHTML = l === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });

    /* .lang-es / .lang-en blocks: show/hide */
    document.querySelectorAll('.lang-es').forEach(function (el) {
      el.style.display = l === 'en' ? 'none' : '';
    });
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.style.display = l !== 'en' ? 'none' : '';
    });

    /* toggle button label: shows the ACTIVE language */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.textContent = l === 'en' ? 'EN' : 'ES';
      btn.setAttribute('aria-label', l === 'en' ? 'Cambiar a español' : 'Switch to English');
    });
  }

  window.toggleLang = function () { apply(lang === 'en' ? 'es' : 'en'); };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-en').forEach(function (el) { el.style.display = 'none'; });
    if (lang === 'en') apply('en');
  });
})();
