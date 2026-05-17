/**
 * data/faqs.js — Bilingual FAQ data (ES / EN)
 */

const FAQS = [
  {
    q:   '¿Qué IMC es normal?',
    qEn: 'What is a normal BMI?',
    a:   'Un IMC entre 18.5 y 24.9 se considera peso normal o saludable según la Organización Mundial de la Salud (OMS). Este rango se asocia con el menor riesgo de enfermedades relacionadas con el peso.',
    aEn: 'A BMI between 18.5 and 24.9 is considered normal or healthy weight according to the World Health Organization (WHO). This range is associated with the lowest risk of weight-related diseases.'
  },
  {
    q:   '¿El IMC es fiable?',
    qEn: 'Is BMI reliable?',
    a:   'El IMC es una herramienta de cribado útil y ampliamente validada para la población general. Sin embargo, no evalúa directamente la composición corporal ni distingue entre masa muscular y grasa. Debe interpretarse junto con otras medidas como el perímetro de cintura.',
    aEn: 'BMI is a useful and widely validated screening tool for the general population. However, it does not directly assess body composition or distinguish between muscle and fat mass. It should be interpreted alongside other measures such as waist circumference.'
  },
  {
    q:   '¿Cómo puedo bajar mi IMC?',
    qEn: 'How can I lower my BMI?',
    a:   'Para reducir el IMC se recomienda combinar una alimentación equilibrada con un déficit calórico moderado, actividad física regular (mínimo 150 minutos semanales de intensidad moderada), descanso de calidad y gestión del estrés. Consulta siempre con un profesional de la salud antes de iniciar cualquier programa.',
    aEn: 'To reduce BMI it is recommended to combine a balanced diet with a moderate caloric deficit, regular physical activity (at least 150 minutes per week of moderate intensity), quality rest and stress management. Always consult a health professional before starting any programme.'
  },
  {
    q:   '¿Cuál es el IMC ideal en mujeres?',
    qEn: 'What is the ideal BMI for women?',
    a:   'Para las mujeres adultas, el rango saludable de IMC es el mismo establecido por la OMS: entre 18.5 y 24.9. Las mujeres tienen de forma natural un porcentaje de grasa corporal superior al de los hombres, lo que es completamente fisiológico y no implica riesgo para la salud.',
    aEn: 'For adult women, the healthy BMI range is the same as set by the WHO: between 18.5 and 24.9. Women naturally have a higher body fat percentage than men, which is entirely physiological and does not pose a health risk.'
  },
  {
    q:   '¿Cuál es el IMC ideal en hombres?',
    qEn: 'What is the ideal BMI for men?',
    a:   'Para los hombres adultos, el IMC saludable está también entre 18.5 y 24.9. Los hombres tienden a tener mayor masa muscular, lo que puede elevar ligeramente el IMC sin que esto represente un exceso de grasa corporal.',
    aEn: 'For adult men, the healthy BMI is also between 18.5 and 24.9. Men tend to have greater muscle mass, which may slightly raise BMI without representing excess body fat.'
  },
  {
    q:   '¿El IMC sirve para deportistas?',
    qEn: 'Is BMI suitable for athletes?',
    a:   'No es el indicador más adecuado para personas con alta masa muscular. Un atleta de fuerza puede tener un IMC clasificado como "sobrepeso" pese a tener un porcentaje de grasa muy bajo. Para deportistas se recomienda complementar con bioimpedancia o medición de pliegues cutáneos.',
    aEn: 'It is not the most suitable indicator for people with high muscle mass. A strength athlete may have a BMI classified as "overweight" despite having very low body fat. Athletes should supplement with bioimpedance or skinfold measurements.'
  },
  {
    q:   '¿Qué pasa si tengo el IMC alto?',
    qEn: 'What happens if my BMI is high?',
    a:   'Un IMC ≥25 se asocia con mayor riesgo de enfermedades cardiovasculares, diabetes tipo 2, hipertensión, apnea del sueño y ciertos tipos de cáncer. Sin embargo, el riesgo real depende de muchos otros factores. Lo más importante es consultar con tu médico para una evaluación completa.',
    aEn: 'A BMI ≥25 is associated with increased risk of cardiovascular disease, type 2 diabetes, hypertension, sleep apnea and certain cancers. However, actual risk depends on many other factors. The most important step is to consult your doctor for a full assessment.'
  },
  {
    q:   '¿Cómo se calcula el IMC?',
    qEn: 'How is BMI calculated?',
    a:   'La fórmula es: IMC = peso (kg) / altura² (m). Por ejemplo, si pesas 70 kg y mides 1.75 m: IMC = 70 / (1.75 × 1.75) = 70 / 3.0625 = 22.9. Nuestra calculadora realiza este cálculo automáticamente al introducir tus datos.',
    aEn: 'The formula is: BMI = weight (kg) / height² (m). For example, if you weigh 70 kg and are 1.75 m tall: BMI = 70 / (1.75 × 1.75) = 70 / 3.0625 = 22.9. Our calculator performs this calculation automatically when you enter your data.'
  },
  {
    q:   '¿El IMC es lo mismo que el BMI?',
    qEn: 'Is BMI the same as IMC?',
    a:   'Sí, exactamente. BMI (Body Mass Index) es el término en inglés para IMC (Índice de Masa Corporal). Ambos se refieren al mismo indicador, calculado con la misma fórmula y con los mismos rangos de clasificación.',
    aEn: 'Yes, exactly. BMI (Body Mass Index) is the English term for IMC (Índice de Masa Corporal in Spanish). Both refer to the same indicator, calculated with the same formula and with the same classification ranges.'
  },
  {
    q:   '¿A partir de qué IMC hay obesidad?',
    qEn: 'At what BMI is someone considered obese?',
    a:   'La OMS clasifica obesidad a partir de un IMC de 30: Obesidad grado I (30–34.9), Obesidad grado II (35–39.9) y Obesidad grado III o mórbida (≥40). El rango de 25–29.9 se considera sobrepeso, que es un factor de riesgo pero no se clasifica como obesidad.',
    aEn: 'The WHO classifies obesity from a BMI of 30: Grade I obesity (30–34.9), Grade II obesity (35–39.9) and Grade III or morbid obesity (≥40). The range of 25–29.9 is considered overweight, which is a risk factor but is not classified as obesity.'
  },
  {
    q:   '¿El IMC es válido para niños?',
    qEn: 'Is BMI valid for children?',
    a:   'Para niños y adolescentes (entre 2 y 18 años) no se utilizan los mismos rangos que para adultos. En su lugar, se emplean percentiles de IMC ajustados por edad y sexo, que permiten comparar el peso con el de otros niños de la misma edad. Esta calculadora está diseñada para adultos mayores de 18 años.',
    aEn: 'For children and adolescents (between 2 and 18 years) the same ranges as adults are not used. Instead, age- and sex-adjusted BMI percentiles are used, which allow comparison with children of the same age. This calculator is designed for adults over 18 years of age.'
  },
  {
    q:   '¿Cómo varía el IMC saludable con la edad?',
    qEn: 'How does healthy BMI vary with age?',
    a:   'Los rangos OMS (18,5–24,9) aplican a adultos de cualquier edad. Sin embargo, algunos estudios sugieren que en mayores de 65 años un IMC de hasta 27 puede ser aceptable, ya que una reserva de peso moderada puede resultar protectora frente a enfermedades. Consulta con tu médico para una valoración individualizada.',
    aEn: 'WHO ranges (18.5–24.9) apply to adults of any age. However, some studies suggest that in people over 65, a BMI of up to 27 may be acceptable, as a moderate weight reserve can be protective against illness. Consult your doctor for an individualised assessment.'
  },
  {
    q:   '¿El IMC es válido durante el embarazo?',
    qEn: 'Is BMI valid during pregnancy?',
    a:   'No. Durante el embarazo el IMC no es un indicador válido para evaluar el peso, ya que el aumento de peso es normal y necesario para el desarrollo del bebé. El seguimiento del peso durante la gestación debe realizarlo siempre el equipo médico o la matrona.',
    aEn: 'No. During pregnancy, BMI is not a valid indicator for assessing weight, as weight gain is normal and necessary for the baby\'s development. Weight monitoring during pregnancy should always be carried out by the medical team or midwife.'
  }
];
