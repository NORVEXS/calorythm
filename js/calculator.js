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
    name: 'Menor de edad', nameEn: 'Minor',  short: 'normal', color: '#475569',
    desc: 'Esta calculadora usa los rangos OMS para adultos (≥18 años). Para menores se emplean percentiles ajustados por edad y sexo.',
    descEn: 'This calculator uses WHO ranges for adults (≥18 years). For minors, age- and sex-adjusted percentiles are used.',
    advice: 'Consulta con el pediatra o médico de familia para una valoración correcta a tu edad.',
    adviceEn: 'Consult your paediatrician or family doctor for a proper assessment for your age.'
  };

  if (isElderly) {
    if (bmi < 22) return {
      name: 'Bajo peso', nameEn: 'Underweight', short: 'underweight', color: '#2563eb',
      desc: isFemale
        ? 'En mujeres mayores de 65 años, un IMC inferior a 22 se asocia con pérdida de masa ósea y mayor riesgo de fracturas.'
        : 'En hombres mayores de 65 años, un IMC inferior a 22 puede indicar sarcopenia (pérdida de masa muscular) y fragilidad.',
      descEn: isFemale
        ? 'In women over 65, a BMI below 22 is associated with bone density loss and higher fracture risk.'
        : 'In men over 65, a BMI below 22 may indicate sarcopenia (muscle loss) and frailty.',
      advice: isFemale
        ? 'Consulta con tu médico. Es clave mantener un buen aporte proteico y hacer ejercicio de fuerza para preservar la densidad ósea y muscular.'
        : 'Consulta con tu médico. Prioriza el consumo de proteínas y ejercicio de resistencia para combatir la pérdida de músculo.',
      adviceEn: isFemale
        ? 'Consult your doctor. Maintaining good protein intake and doing strength exercise to preserve bone and muscle density is key.'
        : 'Consult your doctor. Prioritise protein intake and resistance exercise to combat muscle loss.'
    };
    if (bmi < 27) return {
      name: 'Peso saludable', nameEn: 'Healthy weight', short: 'normal', color: '#16a34a',
      desc: isFemale
        ? 'Para mujeres mayores de 65 años, el rango óptimo es IMC 22–27. Estás dentro de los parámetros saludables ajustados a tu edad.'
        : 'Para hombres mayores de 65 años, el rango óptimo es IMC 22–27. Tu peso es adecuado para tu edad.',
      descEn: isFemale
        ? 'For women over 65, the optimal range is BMI 22–27. You are within the healthy parameters adjusted for your age.'
        : 'For men over 65, the optimal range is BMI 22–27. Your weight is appropriate for your age.',
      advice: isFemale
        ? 'Mantén una dieta variada rica en calcio y vitamina D, y realiza actividad física adaptada a tu edad. Revisiones médicas periódicas.'
        : 'Mantén una dieta equilibrada con buen aporte proteico y actividad física regular. Las revisiones periódicas son clave a tu edad.',
      adviceEn: isFemale
        ? 'Maintain a varied diet rich in calcium and vitamin D, and do physical activity adapted to your age. Regular medical check-ups.'
        : 'Maintain a balanced diet with good protein intake and regular physical activity. Periodic check-ups are key at your age.'
    };
    if (bmi < 30) return {
      name: 'Sobrepeso leve', nameEn: 'Mild overweight', short: 'overweight', color: '#d97706',
      desc: isFemale
        ? 'En mujeres mayores de 65 años, un IMC entre 27 y 29,9 supone riesgo moderado, aunque un ligero exceso puede ser protector frente a enfermedades.'
        : 'En hombres mayores de 65 años, un IMC entre 27 y 29,9 implica riesgo moderado. El perímetro abdominal es el factor más relevante.',
      descEn: isFemale
        ? 'In women over 65, a BMI between 27 and 29.9 carries moderate risk, although a slight excess may be protective against disease.'
        : 'In men over 65, a BMI between 27 and 29.9 implies moderate risk. Abdominal circumference is the most relevant factor.',
      advice: isFemale
        ? 'Prioriza la actividad física y la calidad de la dieta. Mide el perímetro de cintura (riesgo si >88 cm) y consulta con tu médico.'
        : 'Prioriza el ejercicio aeróbico y una dieta mediterránea. Controla el perímetro de cintura (riesgo si >102 cm).',
      adviceEn: isFemale
        ? 'Prioritise physical activity and diet quality. Measure your waist circumference (risk if >88 cm) and consult your doctor.'
        : 'Prioritise aerobic exercise and a Mediterranean diet. Monitor waist circumference (risk if >102 cm).'
    };
    if (bmi < 35) return {
      name: 'Obesidad I', nameEn: 'Obesity I', short: 'obese1', color: '#ea580c',
      desc: 'Obesidad grado I. A cualquier edad, este nivel se asocia con riesgo cardiovascular, metabólico y articular significativo.',
      descEn: 'Grade I obesity. At any age, this level is associated with significant cardiovascular, metabolic and joint risk.',
      advice: isFemale
        ? 'Consulta con tu médico para un plan personalizado. El ejercicio de bajo impacto (natación, caminar) es especialmente recomendable.'
        : 'Consulta con tu médico. El ejercicio regular y la reducción del perímetro abdominal son prioritarios.',
      adviceEn: isFemale
        ? 'Consult your doctor for a personalised plan. Low-impact exercise (swimming, walking) is especially recommended.'
        : 'Consult your doctor. Regular exercise and reducing abdominal circumference are priorities.'
    };
    if (bmi < 40) return {
      name: 'Obesidad II', nameEn: 'Obesity II', short: 'obese2', color: '#dc2626',
      desc: 'Obesidad grado II. Riesgo elevado de complicaciones cardiovasculares, metabólicas y de movilidad.',
      descEn: 'Grade II obesity. High risk of cardiovascular, metabolic and mobility complications.',
      advice: 'Consulta con un especialista médico. Un plan supervisado de alimentación y ejercicio adaptado a tu edad es fundamental.',
      adviceEn: 'Consult a medical specialist. A supervised nutrition and exercise plan adapted to your age is essential.'
    };
    return {
      name: 'Obesidad III', nameEn: 'Obesity III', short: 'obese3', color: '#9333ea',
      desc: 'Obesidad mórbida. Riesgo muy elevado para la salud.',
      descEn: 'Morbid obesity. Very high health risk.',
      advice: 'Requiere atención médica especializada urgente. Informa a tu médico de cabecera para derivación a especialista.',
      adviceEn: 'Requires urgent specialist medical attention. Inform your GP for referral to a specialist.'
    };
  }

  // Adultos 18–64: rangos estándar OMS
  if (bmi < 18.5) return {
    name: 'Bajo peso', nameEn: 'Underweight', short: 'underweight', color: '#2563eb',
    desc: isFemale ? 'Tu peso está por debajo del rango saludable para mujeres.' : 'Tu peso está por debajo del rango saludable para hombres.',
    descEn: isFemale ? 'Your weight is below the healthy range for women.' : 'Your weight is below the healthy range for men.',
    advice: isFemale
      ? 'Consulta con tu médico o nutricionista. En mujeres, el bajo peso puede afectar el ciclo menstrual y la densidad ósea.'
      : 'Consulta con un médico o nutricionista para ganar peso de forma saludable con una dieta hipercalórica equilibrada.',
    adviceEn: isFemale
      ? 'Consult your doctor or nutritionist. In women, low weight can affect the menstrual cycle and bone density.'
      : 'Consult a doctor or nutritionist to gain weight healthily with a balanced high-calorie diet.'
  };
  if (bmi < 25) return {
    name: 'Peso normal', nameEn: 'Normal weight', short: 'normal', color: '#16a34a',
    desc: isFemale ? 'Tu peso está dentro del rango saludable según la OMS.' : 'Tu peso está dentro del rango saludable según la OMS.',
    descEn: 'Your weight is within the healthy range according to the WHO.',
    advice: isFemale
      ? 'Excelente. Mantén una dieta equilibrada, ejercicio regular (150 min/semana) y revisiones periódicas.'
      : 'Excelente. Mantén tus hábitos con dieta equilibrada y al menos 150 minutos de actividad física semanal.',
    adviceEn: isFemale
      ? 'Excellent. Maintain a balanced diet, regular exercise (150 min/week) and periodic check-ups.'
      : 'Excellent. Keep up your habits with a balanced diet and at least 150 minutes of physical activity per week.'
  };
  if (bmi < 30) return {
    name: 'Sobrepeso', nameEn: 'Overweight', short: 'overweight', color: '#d97706',
    desc: isFemale
      ? 'Peso ligeramente por encima del rango saludable. En mujeres, la distribución periférica reduce el riesgo cardiovascular.'
      : 'Peso ligeramente por encima del rango saludable. En hombres, el exceso tiende a acumularse en el abdomen.',
    descEn: isFemale
      ? 'Weight slightly above the healthy range. In women, peripheral fat distribution reduces cardiovascular risk.'
      : 'Weight slightly above the healthy range. In men, excess tends to accumulate in the abdomen.',
    advice: isFemale
      ? 'Mejora la alimentación, incrementa la actividad física y valora medir el perímetro de cintura (riesgo si >88 cm).'
      : 'Mejora la alimentación e incrementa la actividad física. Mide el perímetro de cintura: riesgo elevado si supera los 102 cm.',
    adviceEn: isFemale
      ? 'Improve your diet, increase physical activity and consider measuring waist circumference (risk if >88 cm).'
      : 'Improve your diet and increase physical activity. Measure your waist circumference: high risk if it exceeds 102 cm.'
  };
  if (bmi < 35) return {
    name: 'Obesidad I', nameEn: 'Obesity I', short: 'obese1', color: '#ea580c',
    desc: isFemale
      ? 'Obesidad grado I. El riesgo metabólico y cardiovascular es significativo.'
      : 'Obesidad grado I. El riesgo cardiovascular y metabólico es significativo.',
    descEn: 'Grade I obesity. Metabolic and cardiovascular risk is significant.',
    advice: isFemale
      ? 'Consulta con tu médico para un plan personalizado. En mujeres puede afectar la fertilidad y la salud hormonal.'
      : 'Consulta con tu médico para establecer un plan supervisado de alimentación y ejercicio.',
    adviceEn: isFemale
      ? 'Consult your doctor for a personalised plan. In women it can affect fertility and hormonal health.'
      : 'Consult your doctor to establish a supervised nutrition and exercise plan.'
  };
  if (bmi < 40) return {
    name: 'Obesidad II', nameEn: 'Obesity II', short: 'obese2', color: '#dc2626',
    desc: isFemale
      ? 'Obesidad grado II. Riesgo cardiovascular y metabólico muy elevado.'
      : 'Obesidad grado II. Riesgo cardiovascular y metabólico muy elevado.',
    descEn: 'Grade II obesity. Very high cardiovascular and metabolic risk.',
    advice: isFemale
      ? 'Es importante consultar con un especialista. Se asocia a mayor riesgo de diabetes tipo 2, hipertensión y apnea del sueño.'
      : 'Consulta con un especialista médico. Asociado a alto riesgo de diabetes tipo 2, hipertensión y enfermedad coronaria.',
    adviceEn: isFemale
      ? 'It is important to consult a specialist. Associated with higher risk of type 2 diabetes, hypertension and sleep apnoea.'
      : 'Consult a medical specialist. Associated with high risk of type 2 diabetes, hypertension and coronary disease.'
  };
  return {
    name: 'Obesidad III', nameEn: 'Obesity III', short: 'obese3', color: '#9333ea',
    desc: 'Obesidad mórbida. Riesgo muy elevado para la salud.',
    descEn: 'Morbid obesity. Very high health risk.',
    advice: 'Requiere atención médica especializada urgente. El tratamiento puede incluir intervención dietética, farmacológica o quirúrgica.',
    adviceEn: 'Requires urgent specialist medical attention. Treatment may include dietary, pharmacological or surgical intervention.'
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

  const age = 30;
  const bmi = weightKg / (heightM * heightM);
  const cat = getBMICategory(bmi, _currentGender, age);

  document.getElementById('results').classList.remove('hidden');
  document.getElementById('resultPlaceholder').classList.add('hidden');

  const scoreEl = document.getElementById('bmiScore');
  scoreEl.classList.remove('number-pop');
  void scoreEl.offsetWidth;
  scoreEl.classList.add('number-pop');
  animateNumber(scoreEl, bmi);

  var _isEn = localStorage.getItem('lang') === 'en';
  document.getElementById('bmiCategory').textContent = _isEn && cat.nameEn ? cat.nameEn : cat.name;
  document.getElementById('bmiCategory').className   = `text-base font-semibold mb-1 cat-${cat.short}`;
  document.getElementById('bmiCategoryDesc').textContent = _isEn && cat.descEn ? cat.descEn : cat.desc;

  const card = document.getElementById('resultCard');
  card.className = `bg-cat-${cat.short} border-2 rounded-xl p-5 transition-all duration-300`;
  document.getElementById('resultMessage').textContent = _isEn && cat.adviceEn ? cat.adviceEn : cat.advice;

  // Rango saludable ajustado por edad (65+: referencia clínica 22–27)
  const isElderly = age >= 65;
  const minBMI = isElderly ? 22   : 18.5;
  const maxBMI = isElderly ? 27   : 24.9;
  const minKg = minBMI * heightM * heightM;
  const maxKg = maxBMI * heightM * heightM;
  const wUnit = isImperial ? 'lb' : 'kg';
  const minH = isImperial ? (minKg * 2.20462).toFixed(1) : minKg.toFixed(1);
  const maxH = isImperial ? (maxKg * 2.20462).toFixed(1) : maxKg.toFixed(1);
  document.getElementById('healthyRange').textContent = `${minH} ${wUnit} – ${maxH} ${wUnit}`;

  let goal;
  if (bmi < minBMI) {
    const gKg = minKg - weightKg;
    const g = isImperial ? (gKg * 2.20462).toFixed(1) : gKg.toFixed(1);
    goal = _isEn
      ? (isElderly ? `Gain ~${g} ${wUnit} to reach the healthy range for your age.` : `Gain ~${g} ${wUnit} to reach the healthy range.`)
      : (isElderly ? `Ganar ~${g} ${wUnit} para alcanzar el rango saludable para tu edad.` : `Ganar ~${g} ${wUnit} para alcanzar el rango saludable.`);
  } else if (bmi <= maxBMI) {
    goal = _isEn
      ? (isElderly ? 'Perfect for your age! Keep up physical activity and good nutrition.' : 'You are on track! Keep up your current habits.')
      : (isElderly ? '¡Perfecto para tu edad! Mantén actividad física y buena alimentación.' : '¡Vas por buen camino! Mantén tus hábitos actuales.');
  } else {
    const lKg = weightKg - maxKg;
    const l = isImperial ? (lKg * 2.20462).toFixed(1) : lKg.toFixed(1);
    goal = _isEn
      ? (isElderly ? `Lose ~${l} ${wUnit} to enter the healthy range for your age.` : `Lose ~${l} ${wUnit} to enter the healthy range.`)
      : (isElderly ? `Reducir ~${l} ${wUnit} para entrar en el rango saludable para tu edad.` : `Reducir ~${l} ${wUnit} para entrar en el rango saludable.`);
  }
  document.getElementById('goalSuggestion').textContent = goal;

  updateGauge(bmi);
  updateRangeBar(bmi);
  renderChart(bmi);

  window._lastBMI    = bmi;
  window._lastCat    = cat;
}

// Auto-calculate on input
['height', 'weight'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => { saveToStorage(); calculateBMI(); });
});

// Keyboard support for gender pills
document.getElementById('gMale').addEventListener('keydown',   e => { if(e.key==='Enter'||e.key===' ') setGender('male'); });
document.getElementById('gFemale').addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') setGender('female'); });

// Calcular con los valores preset al cargar
calculateBMI();
