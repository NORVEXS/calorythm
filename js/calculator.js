/**
 * js/calculator.js
 * Lógica principal IMC. Depende de: units.js, gauge.js, chart.js
 */

let _currentGender = 'male';

function setGender(g) {
  _currentGender = g;
  document.getElementById('gMale').classList.toggle('selected', g === 'male');
  document.getElementById('gFemale').classList.toggle('selected', g === 'female');
  document.getElementById('gMale').setAttribute('aria-checked', String(g === 'male'));
  document.getElementById('gFemale').setAttribute('aria-checked', String(g === 'female'));
  saveToStorage();
  calculateBMI();
}

function getBMICategory(bmi, gender, age) {
  const isFemale = gender === 'female';
  const isElderly = age >= 65;
  const isMinor   = age > 0 && age < 18;

  if (isMinor) return {
    name: 'Menor de edad', short: 'normal', color: '#475569',
    desc: 'Esta calculadora usa los rangos OMS para adultos (≥18 años). Para menores se emplean percentiles ajustados por edad y sexo.',
    advice: 'Consulta con el pediatra o médico de familia para una valoración correcta a tu edad.'
  };

  if (isElderly) {
    if (bmi < 22) return {
      name: 'Bajo peso', short: 'underweight', color: '#2563eb',
      desc: isFemale
        ? 'En mujeres mayores de 65 años, un IMC inferior a 22 se asocia con pérdida de masa ósea y mayor riesgo de fracturas.'
        : 'En hombres mayores de 65 años, un IMC inferior a 22 puede indicar sarcopenia (pérdida de masa muscular) y fragilidad.',
      advice: isFemale
        ? 'Consulta con tu médico. Es clave mantener un buen aporte proteico y hacer ejercicio de fuerza para preservar la densidad ósea y muscular.'
        : 'Consulta con tu médico. Prioriza el consumo de proteínas y ejercicio de resistencia para combatir la pérdida de músculo.'
    };
    if (bmi < 27) return {
      name: 'Peso saludable', short: 'normal', color: '#16a34a',
      desc: isFemale
        ? 'Para mujeres mayores de 65 años, el rango óptimo es IMC 22–27. Estás dentro de los parámetros saludables ajustados a tu edad.'
        : 'Para hombres mayores de 65 años, el rango óptimo es IMC 22–27. Tu peso es adecuado para tu edad.',
      advice: isFemale
        ? 'Mantén una dieta variada rica en calcio y vitamina D, y realiza actividad física adaptada a tu edad. Revisiones médicas periódicas.'
        : 'Mantén una dieta equilibrada con buen aporte proteico y actividad física regular. Las revisiones periódicas son clave a tu edad.'
    };
    if (bmi < 30) return {
      name: 'Sobrepeso leve', short: 'overweight', color: '#d97706',
      desc: isFemale
        ? 'En mujeres mayores de 65 años, un IMC entre 27 y 29,9 supone riesgo moderado, aunque un ligero exceso puede ser protector frente a enfermedades.'
        : 'En hombres mayores de 65 años, un IMC entre 27 y 29,9 implica riesgo moderado. El perímetro abdominal es el factor más relevante.',
      advice: isFemale
        ? 'Prioriza la actividad física y la calidad de la dieta. Mide el perímetro de cintura (riesgo si >88 cm) y consulta con tu médico.'
        : 'Prioriza el ejercicio aeróbico y una dieta mediterránea. Controla el perímetro de cintura (riesgo si >102 cm).'
    };
    if (bmi < 35) return {
      name: 'Obesidad I', short: 'obese1', color: '#ea580c',
      desc: 'Obesidad grado I. A cualquier edad, este nivel se asocia con riesgo cardiovascular, metabólico y articular significativo.',
      advice: isFemale
        ? 'Consulta con tu médico para un plan personalizado. El ejercicio de bajo impacto (natación, caminar) es especialmente recomendable.'
        : 'Consulta con tu médico. El ejercicio regular y la reducción del perímetro abdominal son prioritarios.'
    };
    if (bmi < 40) return {
      name: 'Obesidad II', short: 'obese2', color: '#dc2626',
      desc: 'Obesidad grado II. Riesgo elevado de complicaciones cardiovasculares, metabólicas y de movilidad.',
      advice: 'Consulta con un especialista médico. Un plan supervisado de alimentación y ejercicio adaptado a tu edad es fundamental.'
    };
    return {
      name: 'Obesidad III', short: 'obese3', color: '#9333ea',
      desc: 'Obesidad mórbida. Riesgo muy elevado para la salud.',
      advice: 'Requiere atención médica especializada urgente. Informa a tu médico de cabecera para derivación a especialista.'
    };
  }

  // Adultos 18–64: rangos estándar OMS
  if (bmi < 18.5) return {
    name: 'Bajo peso', short: 'underweight', color: '#2563eb',
    desc: isFemale ? 'Tu peso está por debajo del rango saludable para mujeres.' : 'Tu peso está por debajo del rango saludable para hombres.',
    advice: isFemale
      ? 'Consulta con tu médico o nutricionista. En mujeres, el bajo peso puede afectar el ciclo menstrual y la densidad ósea.'
      : 'Consulta con un médico o nutricionista para ganar peso de forma saludable con una dieta hipercalórica equilibrada.'
  };
  if (bmi < 25) return {
    name: 'Peso normal', short: 'normal', color: '#16a34a',
    desc: isFemale ? 'Tu peso está dentro del rango saludable según la OMS.' : 'Tu peso está dentro del rango saludable según la OMS.',
    advice: isFemale
      ? 'Excelente. Mantén una dieta equilibrada, ejercicio regular (150 min/semana) y revisiones periódicas.'
      : 'Excelente. Mantén tus hábitos con dieta equilibrada y al menos 150 minutos de actividad física semanal.'
  };
  if (bmi < 30) return {
    name: 'Sobrepeso', short: 'overweight', color: '#d97706',
    desc: isFemale
      ? 'Peso ligeramente por encima del rango saludable. En mujeres, la distribución periférica reduce el riesgo cardiovascular.'
      : 'Peso ligeramente por encima del rango saludable. En hombres, el exceso tiende a acumularse en el abdomen.',
    advice: isFemale
      ? 'Mejora la alimentación, incrementa la actividad física y valora medir el perímetro de cintura (riesgo si >88 cm).'
      : 'Mejora la alimentación e incrementa la actividad física. Mide el perímetro de cintura: riesgo elevado si supera los 102 cm.'
  };
  if (bmi < 35) return {
    name: 'Obesidad I', short: 'obese1', color: '#ea580c',
    desc: isFemale
      ? 'Obesidad grado I. El riesgo metabólico y cardiovascular es significativo.'
      : 'Obesidad grado I. El riesgo cardiovascular y metabólico es significativo.',
    advice: isFemale
      ? 'Consulta con tu médico para un plan personalizado. En mujeres puede afectar la fertilidad y la salud hormonal.'
      : 'Consulta con tu médico para establecer un plan supervisado de alimentación y ejercicio.'
  };
  if (bmi < 40) return {
    name: 'Obesidad II', short: 'obese2', color: '#dc2626',
    desc: isFemale
      ? 'Obesidad grado II. Riesgo cardiovascular y metabólico muy elevado.'
      : 'Obesidad grado II. Riesgo cardiovascular y metabólico muy elevado.',
    advice: isFemale
      ? 'Es importante consultar con un especialista. Se asocia a mayor riesgo de diabetes tipo 2, hipertensión y apnea del sueño.'
      : 'Consulta con un especialista médico. Asociado a alto riesgo de diabetes tipo 2, hipertensión y enfermedad coronaria.'
  };
  return {
    name: 'Obesidad III', short: 'obese3', color: '#9333ea',
    desc: 'Obesidad mórbida. Riesgo muy elevado para la salud.',
    advice: 'Requiere atención médica especializada urgente. El tratamiento puede incluir intervención dietética, farmacológica o quirúrgica.'
  };
}

function animateNumber(el, target, duration = 700) {
  const start = performance.now();
  (function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(1);
    if (t < 1) requestAnimationFrame(step);
  })(performance.now());
}

function calculateBMI() {
  const heightVal = parseFloat(document.getElementById('height').value);
  const weightVal = parseFloat(document.getElementById('weight').value);

  document.getElementById('heightError').classList.add('hidden');
  document.getElementById('weightError').classList.add('hidden');

  if (!heightVal || !weightVal) return;

  let heightM, weightKg;
  if (isImperial) {
    heightM  = heightVal * 0.0254;
    weightKg = weightVal / 2.20462;
  } else {
    heightM  = heightVal / 100;
    weightKg = weightVal;
  }

  let valid = true;
  if (isNaN(heightM) || heightM < 0.5 || heightM > 3) {
    document.getElementById('heightError').classList.remove('hidden'); valid = false;
  }
  if (isNaN(weightKg) || weightKg < 1 || weightKg > 500) {
    document.getElementById('weightError').classList.remove('hidden'); valid = false;
  }
  if (!valid) return;

  const age = parseInt(document.getElementById('age').value) || 0;
  const bmi = weightKg / (heightM * heightM);
  const cat = getBMICategory(bmi, _currentGender, age);

  document.getElementById('results').classList.remove('hidden');
  document.getElementById('resultPlaceholder').classList.add('hidden');

  const scoreEl = document.getElementById('bmiScore');
  scoreEl.classList.remove('number-pop');
  void scoreEl.offsetWidth;
  scoreEl.classList.add('number-pop');
  animateNumber(scoreEl, bmi);

  document.getElementById('bmiCategory').textContent = cat.name;
  document.getElementById('bmiCategory').className   = `text-base font-semibold mb-1 cat-${cat.short}`;
  document.getElementById('bmiCategoryDesc').textContent = cat.desc;

  const card = document.getElementById('resultCard');
  card.className = `bg-cat-${cat.short} border-2 rounded-xl p-5 transition-all duration-300`;
  document.getElementById('resultMessage').textContent = cat.advice;

  // Rango saludable ajustado por edad (65+: referencia clínica 22–27)
  const isElderly = age >= 65;
  const minBMI = isElderly ? 22   : 18.5;
  const maxBMI = isElderly ? 27   : 24.9;
  const minH = (minBMI * heightM * heightM).toFixed(1);
  const maxH = (maxBMI * heightM * heightM).toFixed(1);
  document.getElementById('healthyRange').textContent = `${minH} kg – ${maxH} kg`;

  let goal;
  if (bmi < minBMI) {
    const g = (minBMI * heightM * heightM - weightKg).toFixed(1);
    goal = isElderly
      ? `Ganar ~${g} kg para alcanzar el rango saludable para tu edad.`
      : `Ganar ~${g} kg para alcanzar el rango saludable.`;
  } else if (bmi <= maxBMI) {
    goal = isElderly
      ? '¡Perfecto para tu edad! Mantén actividad física y buena alimentación.'
      : '¡Vas por buen camino! Mantén tus hábitos actuales.';
  } else {
    const l = (weightKg - maxBMI * heightM * heightM).toFixed(1);
    goal = isElderly
      ? `Reducir ~${l} kg para entrar en el rango saludable para tu edad.`
      : `Reducir ~${l} kg para entrar en el rango saludable.`;
  }
  document.getElementById('goalSuggestion').textContent = goal;

  updateGauge(bmi);
  updateRangeBar(bmi);
  renderChart(bmi);

  window._lastBMI    = bmi;
  window._lastCat    = cat;
}

// Auto-calculate on input
['height', 'weight', 'age'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => { saveToStorage(); calculateBMI(); });
});

// Keyboard support for gender pills
document.getElementById('gMale').addEventListener('keydown',   e => { if(e.key==='Enter'||e.key===' ') setGender('male'); });
document.getElementById('gFemale').addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') setGender('female'); });

document.getElementById('calcBtn').addEventListener('click', () => {
  calculateBMI();
});

// Calcular con los valores preset al cargar
calculateBMI();
