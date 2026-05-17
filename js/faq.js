/**
 * js/faq.js — nuevo diseño: items dentro del faqContainer bordeado
 */

(function initFAQ() {
  const container = document.getElementById('faqContainer');

  FAQS.forEach((faq, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item reveal';
    item.style.transitionDelay = `${i * 0.035}s`;

    item.innerHTML = `
      <button onclick="toggleFAQ(${i})"
        class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors"
        style="color:var(--text-primary);background:transparent;border:none;cursor:pointer;font-family:inherit"
        aria-expanded="false" id="faq-btn-${i}">
        <span class="lang-es">${faq.q}</span>
        <span class="lang-en">${faq.qEn || faq.q}</span>
        <span id="faq-icon-${i}"
          class="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-lg leading-none transition-all"
          style="color:var(--text-muted);background:var(--surface-2);font-size:1.1rem">+</span>
      </button>
      <div class="faq-content" id="faq-content-${i}">
        <div class="px-5 pb-4">
          <p class="lang-es text-xs leading-relaxed" style="color:var(--text-secondary)">${faq.a}</p>
          <p class="lang-en text-xs leading-relaxed" style="color:var(--text-secondary)">${faq.aEn || faq.a}</p>
        </div>
      </div>
    `;

    container.appendChild(item);
  });

  // Observe FAQ items for scroll reveal
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  container.querySelectorAll('.faq-item').forEach(el => obs.observe(el));
})();

function toggleFAQ(i) {
  const content = document.getElementById('faq-content-' + i);
  const icon    = document.getElementById('faq-icon-' + i);
  const btn     = document.getElementById('faq-btn-' + i);
  const isOpen  = content.classList.contains('open');

  document.querySelectorAll('.faq-content.open').forEach(function(c) {
    c.style.height = c.scrollHeight + 'px';
    c.offsetHeight;
    c.style.height = '0';
    c.classList.remove('open');
  });
  document.querySelectorAll('[id^="faq-icon-"]').forEach(function(el) { el.textContent = '+'; });
  document.querySelectorAll('[id^="faq-btn-"]').forEach(function(el) { el.setAttribute('aria-expanded', 'false'); });

  if (!isOpen) {
    content.classList.add('open');
    content.style.height = content.scrollHeight + 'px';
    icon.textContent = '−';
    btn.setAttribute('aria-expanded', 'true');
    content.addEventListener('transitionend', function() {
      if (content.classList.contains('open')) content.style.height = 'auto';
    }, { once: true });
  }
}
