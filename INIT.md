# Calculadora IMC — Contexto del proyecto

## Repositorio y despliegue

| | |
|---|---|
| **GitHub** | https://github.com/AlexUcedaCintas/calculadora-imc |
| **Producción (GitHub Pages)** | https://alexucedacintas.github.io/calculadora-imc/ |
| **Dominio previsto** | https://calculadora-imc.es/ (en canonical/og tags, dominio aún no activo) |
| **Rama principal** | `main` |
| **GitHub Pages fuente** | rama `main`, directorio raíz `/` |

## Servidor local

```bash
cd "/home/auceda/RubymineProjects/calculadora IMC"
python3 -m http.server 8080
# http://localhost:8080/
```

Si hay problemas de caché del navegador, usar un servidor con cabeceras no-cache:

```python
# server_nocache.py
import http.server, socketserver
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store')
        super().end_headers()
with socketserver.TCPServer(("",8080),H) as s:
    s.serve_forever()
```

Luego Ctrl+Shift+R en el navegador para forzar recarga.

## Estructura de páginas

| Directorio | Calculadora |
|---|---|
| `/` (index.html) | IMC principal |
| `/peso-ideal/` | Peso ideal |
| `/calorias-diarias/` | Calorías diarias (TDEE) |
| `/calorias-quemadas/` | Calorías quemadas por ejercicio |
| `/tmb/` | Tasa Metabólica Basal |
| `/macros/` | Distribución de macronutrientes |
| `/ffmi/` | Fat-Free Mass Index |
| `/grasa-corporal/` | % Grasa corporal |
| `/agua-diaria/` | Agua diaria recomendada |

## Stack técnico

- HTML/CSS/JS puro — sin bundler ni build step
- **Tailwind CSS** vía CDN (`https://cdn.tailwindcss.com`)
- **Chart.js** vía CDN — gráfico de barras en página IMC
- `js/storage.js` — persistencia con `localStorage` (solo página IMC)
- `js/calculator.js` — lógica IMC principal
- `js/units.js` — conversión métrico/imperial
- `js/gauge.js` — aguja indicadora
- `js/chart.js` — gráfico Chart.js
- `js/theme.js` — modo claro/oscuro
- `js/share.js` — compartir resultado
- `js/ui.js` — utilidades UI
- `js/faq.js` — acordeón FAQ

## Decisiones técnicas clave

### Rutas de navegación
Todos los `href` son **relativos** (ej. `../peso-ideal/`), no absolutos (`/peso-ideal/`).  
Razón: GitHub Pages sirve el sitio en `/calculadora-imc/`, no en la raíz, y rutas absolutas rompen la navegación.

### Precarga de resultados al cargar la página
Cada calculadora tiene valores `value="X"` en sus inputs HTML y llama a `calculate()` de forma síncrona al final del `<script>`, antes del cierre de `</body>`.  
**No usar** `window.addEventListener('load', ...)` — espera a que carguen los CDN externos y los gráficos no aparecen.

### Valores preset por calculadora
| Calculadora | Valores preset |
|---|---|
| IMC | altura 175, peso 78, edad 30, género male |
| Peso ideal | altura 175 |
| Calorías diarias | peso 78, altura 175, edad 30 |
| Calorías quemadas | peso 78, duración 30, actividad "Correr 8km/h" |
| TMB | peso 78, altura 175, edad 30 |
| Macros | kcal 2500, peso 78 |
| FFMI | peso 78, altura 175, grasa 15% |
| Grasa corporal | altura 175, cuello 37, cintura 84, peso 78 |
| Agua diaria | peso 78 |

## Commits relevantes

| Hash | Descripción |
|---|---|
| `04e4016` | corregir rutas de navegación a relativas para GitHub Pages |
| `8df0af0` | añadir valores preset y auto-cálculo al cargar en todas las calculadoras |
| `220aa5d` | primeros pasos para el resto de calculadoras |
| `ba04127` | Fix comillas escapadas, gráfico, edad y sexo en resultado |
| `130e48b` | Calculadora IMC — versión inicial completa |
