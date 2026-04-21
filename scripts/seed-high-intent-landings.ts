import { createClient } from '@sanity/client';

type ServiceSeed = {
  contentCta: {
    _type: 'contactCta';
    description: string;
    eyebrow: string;
    isEnabled: true;
    primaryLabel: string;
    secondaryLabel: string;
    title: string;
  };
  landing: {
    _type: 'serviceLanding';
    deliverables: string[];
    deliverablesTitle: string;
    documents: string[];
    documentsTitle: string;
    faqItems: Array<{
      _key: string;
      _type: 'faqItem';
      answer: string;
      question: string;
    }>;
    faqTitle: string;
    intro: string;
    processSteps: Array<{
      _key: string;
      _type: 'processStep';
      description: string;
      step: string;
      title: string;
    }>;
    processTitle: string;
    situations: string[];
    situationsTitle: string;
  };
  resumen: string;
  seo: {
    _type: 'seo';
    keywords: string[];
    metaDescription: string;
    metaTitle: string;
    noIndex: false;
    ogDescription: string;
    ogTitle: string;
  };
};

function getClient() {
  const token =
    process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_ADMIN_TOKEN;

  if (!token) {
    throw new Error('Missing SANITY_AUTH_TOKEN or SANITY_API_ADMIN_TOKEN');
  }

  return createClient({
    apiVersion: '2025-02-19',
    dataset: 'production',
    projectId: 'c5h3hsr1',
    token,
    useCdn: false,
  });
}

function faq(_key: string, question: string, answer: string) {
  return {
    _key,
    _type: 'faqItem' as const,
    answer,
    question,
  };
}

function step(
  _key: string,
  stepNumber: string,
  title: string,
  description: string
) {
  return {
    _key,
    _type: 'processStep' as const,
    description,
    step: stepNumber,
    title,
  };
}

const bookingSettings = {
  booking: {
    _type: 'bookingSettings',
    isEnabled: true,
    title: 'Solicitud de consulta virtual',
    description:
      'La agenda funciona por solicitud. Puede indicar modalidad, fecha y bloque horario preferidos desde el formulario.',
    buttonLabel: 'Solicitar hora virtual',
    availabilityNote: 'Respuesta inicial en horario habil',
    durationLabel: '20 a 30 minutos',
    priceLabel: 'Consulta inicial',
  },
  defaultContentCta: {
    _type: 'contactCta',
    isEnabled: true,
    eyebrow: 'Consulta inicial',
    title:
      'Puede solicitar una consulta virtual para revisar su caso y ordenar el siguiente paso.',
    description:
      'Indique modalidad, antecedentes y horario tentativo. El estudio responde con una orientacion inicial clara y confidencial.',
    primaryLabel: 'Solicitar hora virtual',
    secondaryLabel: 'Hablar por WhatsApp',
  },
};

const serviceSeeds: Record<string, ServiceSeed> = {
  'divorcios-y-separaciones': {
    resumen:
      'Orientacion legal en divorcio de mutuo acuerdo, unilateral y separacion. Revisamos cese de convivencia, cuidado personal, alimentos, compensacion economica y division de bienes con una estrategia clara desde el inicio.',
    landing: {
      _type: 'serviceLanding',
      intro:
        'Si necesita cerrar una relacion matrimonial o ordenar sus efectos legales, la prioridad es identificar el tipo de divorcio aplicable, los antecedentes disponibles y los temas que deben resolverse junto con el termino del vinculo.',
      situationsTitle: 'Este servicio es para usted si...',
      situations: [
        'Quiere divorciarse y no sabe si corresponde mutuo acuerdo o demanda unilateral.',
        'Hay hijos, pension de alimentos, visitas o cuidado personal involucrados.',
        'Necesita revisar compensacion economica, bienes, deudas o liquidacion del regimen.',
        'Busca ordenar el caso antes de presentar documentos o firmar un acuerdo incompleto.',
      ],
      deliverablesTitle: 'Que revisaremos en su caso',
      deliverables: [
        'Tipo de divorcio o separacion mas adecuado segun cese de convivencia y antecedentes.',
        'Impacto en alimentos, cuidado personal, relacion directa y regular y compensacion economica.',
        'Documentacion necesaria para demanda, acuerdo completo y presentacion ante tribunal.',
        'Riesgos de avanzar sin acuerdo claro sobre bienes, deudas o hijos.',
      ],
      documentsTitle: 'Antecedentes utiles para avanzar',
      documents: [
        'Certificado de matrimonio y, si corresponde, de nacimiento de hijos.',
        'Documentos que acrediten cese de convivencia o fecha aproximada de separacion.',
        'Antecedentes sobre ingresos, bienes, deudas y gastos familiares.',
        'Acuerdos previos, mediaciones o resoluciones judiciales existentes.',
      ],
      processTitle: 'Como se trabaja este tipo de caso',
      processSteps: [
        step(
          'div-step-1',
          '01',
          'Diagnostico inicial',
          'Se revisa si corresponde divorcio de mutuo acuerdo, unilateral u otra via, y que materias deben quedar resueltas en paralelo.'
        ),
        step(
          'div-step-2',
          '02',
          'Preparacion juridica',
          'Se ordenan documentos, se define estrategia y se prepara demanda o acuerdo completo con el menor margen posible de observaciones.'
        ),
        step(
          'div-step-3',
          '03',
          'Tramitacion y seguimiento',
          'Se presenta el caso, se gestionan actuaciones ante tribunal y se ajusta la estrategia segun respuesta de la contraparte o del juzgado.'
        ),
      ],
      faqTitle: 'Preguntas frecuentes sobre divorcio',
      faqItems: [
        faq(
          'div-faq-1',
          'Que tipo de divorcio puede revisarse en consulta',
          'Se puede revisar divorcio de mutuo acuerdo, unilateral y situaciones asociadas como separacion de hecho, alimentos, cuidado personal y compensacion economica.'
        ),
        faq(
          'div-faq-2',
          'Puedo avanzar si aun no tengo todos los documentos',
          'Si. La consulta sirve precisamente para identificar que antecedentes faltan, cuales son prioritarios y como obtenerlos sin perder tiempo.'
        ),
        faq(
          'div-faq-3',
          'Se puede ver junto con bienes o hijos',
          'Si. Lo correcto suele ser analizar divorcio, alimentos, cuidado personal y regimen patrimonial como un mismo escenario, no como tramites aislados.'
        ),
      ],
    },
    contentCta: {
      _type: 'contactCta',
      isEnabled: true,
      eyebrow: 'Divorcio y separacion',
      title:
        'Solicite una consulta virtual para revisar el tipo de divorcio, sus antecedentes y el siguiente paso.',
      description:
        'Puede iniciar por videollamada, llamada o WhatsApp. La consulta permite ordenar hijos, alimentos y bienes antes de presentar el caso.',
      primaryLabel: 'Solicitar hora virtual',
      secondaryLabel: 'Hablar por WhatsApp',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Abogado de divorcio en San Felipe | Divorcios y separaciones',
      metaDescription:
        'Abogado de divorcio en San Felipe. Revise divorcio de mutuo acuerdo, unilateral, alimentos, hijos y bienes con orientacion clara desde el primer contacto.',
      ogTitle: 'Abogado de divorcio en San Felipe | Divorcios y separaciones',
      ogDescription:
        'Revise divorcio, separacion, alimentos e hijos con una consulta legal clara y confidencial en San Felipe.',
      noIndex: false,
      keywords: [
        'abogado divorcio san felipe',
        'divorcio mutuo acuerdo san felipe',
        'divorcio unilateral san felipe',
        'separacion legal san felipe',
        'abogado familia san felipe',
      ],
    },
  },
  'pensiones-alimenticias': {
    resumen:
      'Asesoria en fijacion, aumento, rebaja y cobro de pension de alimentos en San Felipe. Revisamos antecedentes de ingresos, gastos y cumplimiento para definir una accion clara y util para su caso.',
    landing: {
      _type: 'serviceLanding',
      intro:
        'Cuando hay dudas sobre montos, incumplimientos o necesidad de modificar una pension, el primer paso es revisar ingresos, gastos, necesidades de hijos y resoluciones existentes para decidir la via correcta.',
      situationsTitle: 'Este servicio es para usted si...',
      situations: [
        'Necesita fijar una pension de alimentos y no existe acuerdo suficiente.',
        'La pension actual no refleja ingresos, gastos o necesidades reales.',
        'Hay deuda o incumplimiento y necesita definir medidas de cobro.',
        'Quiere preparar mejor una audiencia o revisar documentos antes de demandar.',
      ],
      deliverablesTitle: 'Que revisaremos en su caso',
      deliverables: [
        'Viabilidad de fijacion, aumento, rebaja o cumplimiento forzado segun antecedentes.',
        'Documentos utiles para acreditar ingresos, gastos, necesidades y capacidad de pago.',
        'Riesgos de acuerdos informales o incompletos.',
        'Siguiente paso recomendado: mediacion, demanda, incidente o gestion de cumplimiento.',
      ],
      documentsTitle: 'Antecedentes utiles para avanzar',
      documents: [
        'Certificados de nacimiento y resoluciones previas si existen.',
        'Comprobantes de ingresos, boletas, liquidaciones o antecedentes tributarios.',
        'Gastos de educacion, salud, vivienda y mantencion del hijo o alimentario.',
        'Comprobantes de pago, deuda o transferencias realizadas.',
      ],
      processTitle: 'Como se trabaja este tipo de caso',
      processSteps: [
        step(
          'ali-step-1',
          '01',
          'Revision de antecedentes',
          'Se revisa si el objetivo es fijar, modificar o exigir pago, y que pruebas permiten sostener esa solicitud.'
        ),
        step(
          'ali-step-2',
          '02',
          'Definicion de estrategia',
          'Se ordenan montos, gastos, ingresos y documentos para preparar mediacion, demanda o incidente segun corresponda.'
        ),
        step(
          'ali-step-3',
          '03',
          'Presentacion y seguimiento',
          'Se acompana la tramitacion ante tribunal o mediacion y se ajusta el caso segun respuesta de la contraparte.'
        ),
      ],
      faqTitle: 'Preguntas frecuentes sobre pension de alimentos',
      faqItems: [
        faq(
          'ali-faq-1',
          'Se puede revisar un monto aunque aun no exista demanda',
          'Si. La consulta inicial sirve para calcular una base razonable, detectar documentos faltantes y definir si conviene mediacion o demanda.'
        ),
        faq(
          'ali-faq-2',
          'Que pasa si la otra parte no paga',
          'Depende de la resolucion existente y del estado del expediente. En consulta se revisa si corresponde exigir cumplimiento, liquidar deuda u otra gestion.'
        ),
        faq(
          'ali-faq-3',
          'La pension puede modificarse',
          'Si. Cuando cambian ingresos, necesidades o circunstancias del grupo familiar, puede ser razonable revisar aumento o rebaja con respaldo suficiente.'
        ),
      ],
    },
    contentCta: {
      _type: 'contactCta',
      isEnabled: true,
      eyebrow: 'Pension de alimentos',
      title:
        'Solicite una consulta para revisar montos, deuda o modificacion de pension de alimentos.',
      description:
        'Puede indicar modalidad y horario preferidos. La idea es ordenar documentos y definir la via mas util antes de avanzar.',
      primaryLabel: 'Solicitar hora virtual',
      secondaryLabel: 'Hablar por WhatsApp',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Pension de alimentos en San Felipe | Abogado de familia',
      metaDescription:
        'Revise pension de alimentos en San Felipe. Fijacion, aumento, rebaja y cobro con una consulta legal clara desde el primer contacto.',
      ogTitle: 'Pension de alimentos en San Felipe | Abogado de familia',
      ogDescription:
        'Asesoria en fijacion, aumento, rebaja y cobro de pension de alimentos en San Felipe.',
      noIndex: false,
      keywords: [
        'pension de alimentos san felipe',
        'abogado pension alimenticia san felipe',
        'rebaja pension san felipe',
        'aumento pension alimentos san felipe',
        'cobro pension alimentos san felipe',
      ],
    },
  },
  'custodia-de-menores': {
    resumen:
      'Orientacion en cuidado personal, custodia y regimen de relacion directa y regular en San Felipe. Revisamos antecedentes familiares, necesidades del menor y opciones procesales con foco en el interes superior del nino o nina.',
    landing: {
      _type: 'serviceLanding',
      intro:
        'Cuando existe conflicto sobre con quien vivira un hijo, como se tomaran decisiones importantes o como se organizara el contacto con ambos padres, conviene revisar el caso completo antes de judicializar o firmar acuerdos incompletos.',
      situationsTitle: 'Este servicio es para usted si...',
      situations: [
        'No existe acuerdo claro sobre cuidado personal o visitas.',
        'Necesita modificar una situacion actual porque el bienestar del menor cambio.',
        'Quiere preparar antecedentes antes de una audiencia o mediacion.',
        'Le preocupa que la otra parte tome decisiones unilaterales o incumpla acuerdos.',
      ],
      deliverablesTitle: 'Que revisaremos en su caso',
      deliverables: [
        'Si corresponde discutir cuidado personal, relacion directa y regular o medidas complementarias.',
        'Antecedentes familiares, de residencia, salud, educacion y redes de apoyo relevantes.',
        'Errores frecuentes al presentar el caso sin pruebas ni estructura.',
        'Alternativas de acuerdo, mediacion o tramitacion judicial segun el escenario.',
      ],
      documentsTitle: 'Antecedentes utiles para avanzar',
      documents: [
        'Certificados de nacimiento y resoluciones previas si existen.',
        'Comprobantes de domicilio, colegio, salud o rutinas del menor.',
        'Mensajes, acuerdos o incumplimientos relevantes para explicar el conflicto.',
        'Informes o antecedentes que permitan acreditar estabilidad y cuidado efectivo.',
      ],
      processTitle: 'Como se trabaja este tipo de caso',
      processSteps: [
        step(
          'cus-step-1',
          '01',
          'Revision del escenario familiar',
          'Se analiza convivencia, rutinas del menor, acuerdos vigentes e hitos que explican el conflicto actual.'
        ),
        step(
          'cus-step-2',
          '02',
          'Definicion de posicion',
          'Se identifica que solicitud tiene mayor sustento y que pruebas conviene preparar antes de audiencia o mediacion.'
        ),
        step(
          'cus-step-3',
          '03',
          'Tramitacion o acuerdo',
          'Se acompana la gestion del acuerdo o del proceso judicial con seguimiento consistente y foco en el bienestar del menor.'
        ),
      ],
      faqTitle: 'Preguntas frecuentes sobre custodia',
      faqItems: [
        faq(
          'cus-faq-1',
          'La consulta sirve si aun no hay juicio',
          'Si. De hecho suele ser mejor revisar el caso antes de demandar o firmar acuerdos, para no improvisar decisiones sensibles sobre hijos.'
        ),
        faq(
          'cus-faq-2',
          'Se puede revisar tambien el regimen de visitas',
          'Si. Lo habitual es analizar juntos cuidado personal, relacion directa y regular y, cuando corresponde, alimentos.'
        ),
        faq(
          'cus-faq-3',
          'Puedo pedir cambio de una resolucion vigente',
          'Depende de los cambios reales del caso y del respaldo disponible. La consulta inicial permite evaluar si existe base suficiente para solicitar modificacion.'
        ),
      ],
    },
    contentCta: {
      _type: 'contactCta',
      isEnabled: true,
      eyebrow: 'Custodia y cuidado personal',
      title:
        'Solicite una consulta para revisar cuidado personal, visitas y antecedentes utiles antes de avanzar.',
      description:
        'La consulta inicial permite ordenar el caso, revisar riesgos y decidir si conviene acuerdo, mediacion o tribunal.',
      primaryLabel: 'Solicitar hora virtual',
      secondaryLabel: 'Hablar por WhatsApp',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Custodia y cuidado personal en San Felipe | Abogado de familia',
      metaDescription:
        'Revise custodia, cuidado personal y regimen de visitas en San Felipe con una consulta legal clara y enfocada en el bienestar del menor.',
      ogTitle:
        'Custodia y cuidado personal en San Felipe | Abogado de familia',
      ogDescription:
        'Orientacion en custodia, cuidado personal y visitas en San Felipe con analisis claro desde el primer contacto.',
      noIndex: false,
      keywords: [
        'custodia san felipe',
        'cuidado personal san felipe',
        'visitas hijos san felipe',
        'abogado familia san felipe',
        'regimen comunicacional san felipe',
      ],
    },
  },
  'regularizacion-de-titulos-y-dominio': {
    resumen:
      'Asesoria en regularizacion de titulos y dominio en San Felipe. Revisamos inscripcion, posesion, herencias pendientes, errores registrales y antecedentes del inmueble para definir la via juridica mas util.',
    landing: {
      _type: 'serviceLanding',
      intro:
        'Cuando un inmueble tiene papeles incompletos, inscripciones defectuosas o antecedentes confusos, la prioridad es revisar la cadena de dominio y detectar si el problema es registral, hereditario, posesorio o documental.',
      situationsTitle: 'Este servicio es para usted si...',
      situations: [
        'Tiene una propiedad sin inscripcion regular o con papeles incompletos.',
        'Existe herencia pendiente, posesion antigua o traspasos mal documentados.',
        'Necesita vender, hipotecar o regularizar un inmueble antes de otro tramite.',
        'Quiere saber si el problema se resuelve por via administrativa, registral o judicial.',
      ],
      deliverablesTitle: 'Que revisaremos en su caso',
      deliverables: [
        'Situacion registral real del inmueble y principal obstaculo para regularizar.',
        'Antecedentes necesarios para corregir inscripciones, posesion o cadena de dominio.',
        'Riesgos de vender, subdividir o invertir sin regularizacion previa.',
        'Siguiente paso juridico mas util segun inmueble, documentos y urgencia.',
      ],
      documentsTitle: 'Antecedentes utiles para avanzar',
      documents: [
        'Escrituras, inscripciones, certificados del Conservador y roles si existen.',
        'Planos, deslindes, permisos, antecedentes municipales o de subdivisiones.',
        'Documentos de herencia, posesion efectiva o transferencias antiguas.',
        'Comprobantes de pago de contribuciones, servicios o tenencia del inmueble.',
      ],
      processTitle: 'Como se trabaja este tipo de caso',
      processSteps: [
        step(
          'reg-step-1',
          '01',
          'Revision documental',
          'Se identifica que documentos existen, que falta y donde esta el verdadero cuello de botella para regularizar.'
        ),
        step(
          'reg-step-2',
          '02',
          'Definicion de via juridica',
          'Se determina si corresponde correccion registral, gestion hereditaria, tramitacion administrativa o accion judicial.'
        ),
        step(
          'reg-step-3',
          '03',
          'Tramitacion y cierre',
          'Se acompana el proceso hasta dejar la situacion documental lo mas ordenada posible para vender, habitar o proteger el inmueble.'
        ),
      ],
      faqTitle: 'Preguntas frecuentes sobre regularizacion',
      faqItems: [
        faq(
          'reg-faq-1',
          'La consulta sirve aunque no tenga todos los papeles',
          'Si. En muchos casos la primera utilidad es precisamente identificar que documentos existen, que falta y donde pedirlos.'
        ),
        faq(
          'reg-faq-2',
          'Se puede revisar un inmueble heredado',
          'Si. Las herencias pendientes son una fuente frecuente de irregularidad. La consulta permite distinguir si el problema es sucesorio, registral o ambos.'
        ),
        faq(
          'reg-faq-3',
          'Puedo vender sin regularizar',
          'Depende del estado del inmueble, pero hacerlo sin revisar antes suele aumentar riesgo para comprador y vendedor. Conviene evaluar el caso antes de publicar o firmar.'
        ),
      ],
    },
    contentCta: {
      _type: 'contactCta',
      isEnabled: true,
      eyebrow: 'Titulos y dominio',
      title:
        'Solicite una consulta para revisar papeles, inscripcion y riesgos de su inmueble antes de avanzar.',
      description:
        'Puede iniciar por consulta virtual o WhatsApp. La prioridad es identificar el problema real y la via juridica adecuada.',
      primaryLabel: 'Solicitar hora virtual',
      secondaryLabel: 'Hablar por WhatsApp',
    },
    seo: {
      _type: 'seo',
      metaTitle:
        'Regularizacion de titulos en San Felipe | Abogado inmobiliario',
      metaDescription:
        'Revise regularizacion de titulos, dominio, herencias e inscripciones en San Felipe con una consulta legal clara antes de vender o invertir.',
      ogTitle: 'Regularizacion de titulos en San Felipe | Abogado inmobiliario',
      ogDescription:
        'Asesoria en regularizacion de titulos y dominio en San Felipe para ordenar documentos, inscripciones y riesgos del inmueble.',
      noIndex: false,
      keywords: [
        'regularizacion de titulos san felipe',
        'dominio propiedad san felipe',
        'abogado inmobiliario san felipe',
        'inscripcion conservador san felipe',
        'posesion efectiva inmueble san felipe',
      ],
    },
  },
  'compraventa-de-propiedad': {
    resumen:
      'Asesoria en compraventa de propiedades en San Felipe. Revisamos titulos, deudas, promesa, escritura e inscripcion para reducir riesgos antes de firmar o transferir un inmueble.',
    landing: {
      _type: 'serviceLanding',
      intro:
        'Una compraventa segura exige revisar mucho antes de la firma. La consulta inicial permite detectar deudas, observaciones registrales, riesgos de la promesa y puntos que suelen pasar inadvertidos cuando solo se revisa la escritura final.',
      situationsTitle: 'Este servicio es para usted si...',
      situations: [
        'Va a comprar o vender una propiedad y quiere revisar riesgos antes de firmar.',
        'Necesita apoyo con promesa, escritura, titulos o coordinacion con notaria y Conservador.',
        'Le preocupa que existan deudas, gravamenes, prohibiciones o conflictos sobre el inmueble.',
        'Quiere ordenar la operacion antes de entregar dinero o recibir reservas.',
      ],
      deliverablesTitle: 'Que revisaremos en su caso',
      deliverables: [
        'Situacion registral, gravamenes, prohibiciones y antecedentes del inmueble.',
        'Riesgos de la promesa, escritura y condiciones de pago propuestas.',
        'Coordinacion documental minima para notaria, banco o Conservador.',
        'Puntos que conviene corregir antes de comprometer dinero o firmar.',
      ],
      documentsTitle: 'Antecedentes utiles para avanzar',
      documents: [
        'Promesa, borrador de escritura o condiciones comerciales si existen.',
        'Copias de inscripcion, certificados del Conservador y rol de avalúo.',
        'Antecedentes del inmueble, deuda de contribuciones y documentos del vendedor o comprador.',
        'Información bancaria o hipotecaria si la operación depende de financiamiento.',
      ],
      processTitle: 'Como se trabaja este tipo de caso',
      processSteps: [
        step(
          'com-step-1',
          '01',
          'Revision previa',
          'Se revisan titulos, condiciones de pago y documentos del inmueble para detectar observaciones relevantes antes de firmar.'
        ),
        step(
          'com-step-2',
          '02',
          'Ajuste contractual',
          'Se corrigen clausulas, se ordena la promesa o escritura y se define el circuito documental necesario para la operacion.'
        ),
        step(
          'com-step-3',
          '03',
          'Cierre y seguimiento',
          'Se acompana la firma, inscripcion o coordinacion necesaria para reducir contingencias posteriores.'
        ),
      ],
      faqTitle: 'Preguntas frecuentes sobre compraventa',
      faqItems: [
        faq(
          'com-faq-1',
          'Conviene consultar antes de firmar la promesa',
          'Si. Muchas contingencias se originan en reservas o promesas mal redactadas. Revisar antes suele ahorrar tiempo y riesgo.'
        ),
        faq(
          'com-faq-2',
          'Se puede revisar si hay deuda o gravamen',
          'Si. Parte central del trabajo es identificar prohibiciones, hipotecas, embargos, deuda u observaciones registrales antes del cierre.'
        ),
        faq(
          'com-faq-3',
          'Sirve tanto para comprador como para vendedor',
          'Si. Ambos lados de la operacion necesitan seguridad documental y clausulas claras para evitar incumplimientos o conflictos posteriores.'
        ),
      ],
    },
    contentCta: {
      _type: 'contactCta',
      isEnabled: true,
      eyebrow: 'Compraventa de propiedades',
      title:
        'Solicite una consulta para revisar titulos, promesa y escritura antes de firmar una compraventa.',
      description:
        'La consulta inicial permite detectar riesgos registrales y contractuales antes de comprometer dinero o transferir el inmueble.',
      primaryLabel: 'Solicitar hora virtual',
      secondaryLabel: 'Hablar por WhatsApp',
    },
    seo: {
      _type: 'seo',
      metaTitle:
        'Compraventa de propiedades en San Felipe | Abogado inmobiliario',
      metaDescription:
        'Revise compraventa, titulos, promesa y escritura en San Felipe con una consulta legal clara antes de comprar o vender una propiedad.',
      ogTitle: 'Compraventa de propiedades en San Felipe | Abogado inmobiliario',
      ogDescription:
        'Asesoria en compraventa de propiedades, titulos y escritura en San Felipe para reducir riesgos antes de firmar.',
      noIndex: false,
      keywords: [
        'compraventa propiedad san felipe',
        'abogado compraventa san felipe',
        'estudio de titulos san felipe',
        'promesa compraventa san felipe',
        'abogado inmobiliario san felipe',
      ],
    },
  },
};

async function main() {
  const client = getClient();

  await client.patch('settings').set(bookingSettings).commit();

  const slugs = Object.keys(serviceSeeds);
  const services = await client.fetch<
    Array<{ _id: string; slug: string }>
  >(`*[_type == "service" && slug.current in $slugs]{_id, "slug": slug.current}`, {
    slugs,
  });

  for (const service of services) {
    const nextValue = serviceSeeds[service.slug];
    if (!nextValue) {
      continue;
    }

    await client.patch(service._id).set(nextValue).commit();
  }

  console.log(
    JSON.stringify(
      {
        servicesUpdated: services.map((service) => service.slug),
        settingsUpdated: true,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
