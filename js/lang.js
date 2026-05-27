/* lang.js — EN/ES language toggle for all pages */
(function () {
  // Auto-detect: pages under /en/ always default to English
  var autoLang = window.location.pathname.indexOf('/en/') === 0 ? 'en' : null;
  var lang = autoLang || localStorage.getItem('lang') || 'es';

  function apply(l) {
    lang = l;
    if (!autoLang) localStorage.setItem('lang', l);
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

  window.toggleLang = function () {
    var next = lang === 'en' ? 'es' : 'en';
    // On /en/ pages, redirect to Spanish URL instead of just toggling
    if (autoLang) {
      var path = window.location.pathname;
      // Build redirect map
      var redirects = {
        '/en/bmi-calculator/': '/imc/',
        '/en/tdee-calculator/': '/calorias-diarias/',
        '/en/calories-burned-calculator/': '/calorias-quemadas/',
        '/en/macro-calculator/': '/macros/',
        '/en/ffmi-calculator/': '/ffmi/',
        '/en/body-fat-calculator/': '/grasa-corporal/',
        '/en/water-intake-calculator/': '/agua-diaria/',
        '/en/ideal-weight-calculator/': '/peso-ideal/',
        '/en/bmr-calculator/': '/tmb/',
        '/en/': '/',
      };
      if (redirects[path]) {
        window.location.href = redirects[path];
        return;
      }
    }
    apply(next);
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-en').forEach(function (el) { el.style.display = 'none'; });
    if (lang === 'en') apply('en');
  });
})();
