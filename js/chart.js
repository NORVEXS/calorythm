/**
 * js/chart.js — premium chart con colores adaptativos al tema
 */

let bmiChartInstance = null;
let _lastBmiForChart = null;

/**
 * Crea o recrea el gráfico de barras resaltando la categoría del usuario.
 * @param {number} userBMI - IMC del usuario para destacar su categoría
 */
function renderChart(userBMI) {
  _lastBmiForChart = userBMI;

  const ctx    = document.getElementById('bmiChart').getContext('2d');
  const isDark = document.documentElement.classList.contains('dark');
  const txt    = isDark ? '#6e7681' : '#94a3b8';
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

  const ranges     = [18.5, 24.9, 29.9, 34.9, 39.9, 45];
  const labels     = ['< 18,5', '18,5–24,9', '25–29,9', '30–34,9', '35–39,9', '≥ 40'];
  const catLabels  = ['Bajo peso', 'Normal', 'Sobrepeso', 'Obesidad I', 'Obesidad II', 'Obesidad III'];
  const fullColors = ['#93c5fd', '#4ade80', '#fcd34d', '#f97316', '#ef4444', '#dc2626'];
  const activeIdx  = userBMI < 18.5 ? 0 : userBMI < 25 ? 1 : userBMI < 30 ? 2 : userBMI < 35 ? 3 : userBMI < 40 ? 4 : 5;

  const bgColors = fullColors.map((c, i) => {
    if (i === activeIdx) return c;
    const r = parseInt(c.slice(1,3),16), g = parseInt(c.slice(3,5),16), b = parseInt(c.slice(5,7),16);
    return `rgba(${r},${g},${b},${isDark ? 0.18 : 0.22})`;
  });

  const borderColors = fullColors.map((c, i) => {
    if (i === activeIdx) return c;
    return 'transparent';
  });

  if (bmiChartInstance) bmiChartInstance.destroy();

  bmiChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data:            ranges,
        backgroundColor: bgColors,
        borderColor:     borderColors,
        borderRadius:    7,
        borderSkipped:   false,
        borderWidth:     2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1c2128' : '#0f172a',
          titleColor: isDark ? '#f0f6fc' : '#fff',
          bodyColor:  isDark ? '#8b949e' : '#94a3b8',
          borderColor: isDark ? '#30363d' : 'transparent',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            title: (items) => catLabels[items[0].dataIndex],
            label: (item) => ` IMC hasta ${item.raw}`
          }
        }
      },
      scales: {
        y: { display: false, beginAtZero: true },
        x: {
          ticks: { font: { size: 10, family: 'Inter' }, color: txt },
          grid: { color: gridColor, drawBorder: false }
        }
      }
    }
  });
}

// Re-renderizar al cambiar de tema
document.addEventListener('themechange', () => {
  if (_lastBmiForChart !== null) renderChart(_lastBmiForChart);
});
