import { GetHomePageQueryResult, GetUnitBusinessListQueryResult } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/image-utils';

import { SiteIdentity } from './site-identity';

type TrustItem = {
  title: string;
  description: string;
};

type IntroCard = {
  label: string;
  value: string;
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const defaultTrustItems: TrustItem[] = [
  {
    title: 'Consulta directa',
    description:
      'La primera respuesta busca dar contexto, ordenar antecedentes y proponer el siguiente paso con claridad.',
  },
  {
    title: 'Confidencialidad',
    description:
      'El manejo de la informacion se realiza con criterio juridico y reserva en cada etapa.',
  },
  {
    title: 'Consulta virtual disponible',
    description:
      'Puede iniciar por videollamada cuando el caso requiere una revision inicial rapida y ordenada.',
  },
  {
    title: 'Comunicacion clara',
    description:
      'Explicamos el proceso, sus alcances y proximos pasos sin tecnicismos innecesarios.',
  },
];

const defaultFirmIntroParagraphs = [
  'Cada asunto se revisa con estudio, orden y comunicacion clara. La prioridad es que la persona entienda su problema, conozca sus alternativas y sepa que pasos corresponde seguir.',
  'Trabajamos con atencion directa, criterio profesional y una forma de trato responsable que permita avanzar con tranquilidad.',
];

const defaultFirmIntroCards: IntroCard[] = [
  {
    label: 'Primer paso',
    value: 'Consulta virtual, WhatsApp o llamada segun el caso.',
  },
  {
    label: 'Que priorizamos',
    value: 'Claridad, seriedad y decisiones bien fundamentadas desde el inicio.',
  },
];

const defaultProcessSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Escuchamos y entendemos el caso',
    description:
      'La primera etapa es comprender el contexto, los antecedentes y el objetivo real de quien consulta.',
  },
  {
    step: '02',
    title: 'Evaluamos juridicamente el escenario',
    description:
      'Se revisan alternativas, riesgos y alcances para proponer un camino serio y bien fundamentado.',
  },
  {
    step: '03',
    title: 'Acompanamos con claridad durante el proceso',
    description:
      'La relacion profesional se sostiene con seguimiento, orden y comunicacion clara en cada etapa.',
  },
];

const defaultFaqItems: FaqItem[] = [
  {
    question: 'Puedo realizar una primera consulta antes de iniciar un proceso?',
    answer:
      'Si. El objetivo de una primera conversacion es revisar el contexto del asunto, aclarar expectativas y evaluar la forma mas adecuada de abordarlo.',
  },
  {
    question: 'La informacion entregada se maneja con confidencialidad?',
    answer:
      'Si. El tratamiento de antecedentes y documentacion se realiza con criterio profesional y reserva, desde el primer contacto.',
  },
  {
    question: 'Atienden asuntos de personas y tambien de empresas?',
    answer:
      'Si. El estudio puede acompanar tanto necesidades juridicas personales como asuntos corporativos que requieran analisis y representacion profesional.',
  },
  {
    question: 'Es posible coordinar atencion a distancia?',
    answer:
      'Si. Dependiendo del caso, se puede coordinar una primera orientacion por medios remotos y luego definir los pasos siguientes.',
  },
];

function compactTextList(values?: (string | null)[] | null) {
  return (values || []).map((value) => value?.trim()).filter(Boolean) as string[];
}

function normalizePrimaryCtaLabel(value?: string | null) {
  const normalized = value?.trim();

  if (!normalized || normalized === 'Solicitar orientacion') {
    return 'Agendar consulta virtual';
  }

  return normalized;
}

function normalizeWhatsappCtaLabel(value?: string | null) {
  const normalized = value?.trim();

  if (
    !normalized ||
    normalized === 'Llamar ahora' ||
    normalized === 'Ver areas de practica'
  ) {
    return 'Hablar por WhatsApp';
  }

  return normalized;
}

function compactObjects<T>(values?: (T | null)[] | null) {
  return (values || []).filter(Boolean) as T[];
}

function normalizeTrustItems(
  values?: ({ title: string | null; description: string | null } | null)[] | null
) {
  return compactObjects(values).filter(
    (item): item is TrustItem =>
      Boolean(item.title?.trim()) && Boolean(item.description?.trim())
  );
}

function normalizeIntroCards(
  values?: ({ label: string | null; value: string | null } | null)[] | null
) {
  return compactObjects(values).filter(
    (item): item is IntroCard =>
      Boolean(item.label?.trim()) && Boolean(item.value?.trim())
  );
}

function normalizeProcessSteps(
  values?:
    | ({ step: string | null; title: string | null; description: string | null } | null)[]
    | null
) {
  return compactObjects(values).filter(
    (item): item is ProcessStep =>
      Boolean(item.step?.trim()) &&
      Boolean(item.title?.trim()) &&
      Boolean(item.description?.trim())
  );
}

function normalizeFaqItems(
  values?: ({ question: string | null; answer: string | null } | null)[] | null
) {
  return compactObjects(values).filter(
    (item): item is FaqItem =>
      Boolean(item.question?.trim()) && Boolean(item.answer?.trim())
  );
}

function resolveHeroImage(homePage?: GetHomePageQueryResult | null) {
  return (
    urlForImage(homePage?.hero?.heroImage)
      ?.width(960)
      .height(1120)
      .fit('crop')
      .quality(72)
      .url() || '/meeting.jpeg'
  );
}

export function buildLegalHomeContent({
  areas,
  homePage,
  siteIdentity,
}: {
  areas: GetUnitBusinessListQueryResult;
  homePage: GetHomePageQueryResult | null;
  siteIdentity: SiteIdentity;
}) {
  const practiceAreasMaxItems = homePage?.practiceAreas?.maxItems || 6;

  return {
    hero: {
      eyebrow: homePage?.hero?.eyebrow || 'Estudio juridico en San Felipe',
      title:
        homePage?.hero?.title ||
        'Abogado en San Felipe para consultas familiares e inmobiliarias con orientacion clara desde el primer contacto.',
      description:
        homePage?.hero?.description ||
        'Revise su situacion con una consulta virtual o por WhatsApp. La prioridad es entender el caso, ordenar los antecedentes y proponer el siguiente paso con criterio juridico claro.',
      panelTitle:
        homePage?.hero?.panelTitle ||
        'Consulta virtual disponible y respuesta inicial clara para asuntos familiares, patrimoniales e inmobiliarios.',
      heroImageUrl: resolveHeroImage(homePage),
      leaderName:
        homePage?.leadership?.leaderNameOverride ||
        siteIdentity.responsibleLawyerName,
      leaderLabel:
        homePage?.hero?.leaderLabel || 'Direccion profesional',
      areaCount: areas.length,
      areasLabel: homePage?.hero?.areasLabel || 'Areas activas',
      areasSuffix:
        homePage?.hero?.areasSuffix || 'especialidades principales',
      contactLabel: homePage?.hero?.contactLabel || 'Contacto',
      primaryLabel:
        normalizePrimaryCtaLabel(homePage?.hero?.primaryLabel),
      secondaryLabel:
        normalizeWhatsappCtaLabel(homePage?.hero?.secondaryLabel),
      trustBullets:
        compactTextList(homePage?.hero?.trustBullets) || [
          'Consulta virtual y atencion por WhatsApp disponibles',
          'Orientacion juridica directa y confidencial',
          'Base de atencion en San Felipe y Aconcagua',
        ],
    },
    trustStrip: {
      items: normalizeTrustItems(homePage?.trustItems) || defaultTrustItems,
    },
    firmIntro: {
      eyebrow: homePage?.firmIntro?.heading?.eyebrow || 'Quienes somos',
      title:
        homePage?.firmIntro?.heading?.title ||
        'Asesoria juridica seria, cercana y bien fundamentada en San Felipe.',
      description:
        homePage?.firmIntro?.heading?.description ||
        'Atendemos personas y empresas que necesitan entender su situacion, ordenar sus antecedentes y avanzar con respaldo juridico claro.',
      paragraphs:
        compactTextList(homePage?.firmIntro?.paragraphs) ||
        defaultFirmIntroParagraphs,
      cards: normalizeIntroCards(homePage?.firmIntro?.cards) || defaultFirmIntroCards,
    },
    practiceAreas: {
      eyebrow:
        homePage?.practiceAreas?.heading?.eyebrow || 'Areas de practica',
      title:
        homePage?.practiceAreas?.heading?.title ||
        'Servicios juridicos enfocados en problemas concretos.',
      description:
        homePage?.practiceAreas?.heading?.description ||
        'Materias frecuentes para personas, familias y propietarios que necesitan orientacion juridica clara.',
      maxItems: practiceAreasMaxItems,
      servicesLabel:
        homePage?.practiceAreas?.servicesLabel || 'Servicios relacionados',
      detailLabel: homePage?.practiceAreas?.detailLabel || 'Ver detalle',
    },
    leadership: {
      eyebrow: homePage?.leadership?.heading?.eyebrow || 'Direccion profesional',
      title:
        homePage?.leadership?.heading?.title ||
        'Respaldo juridico con criterio tecnico y trato claro.',
      description:
        homePage?.leadership?.heading?.description ||
        'Atencion directa, explicacion clara y seguimiento responsable en cada etapa del caso.',
      leaderName:
        homePage?.leadership?.leaderNameOverride ||
        siteIdentity.responsibleLawyerName,
      leaderCardLabel:
        homePage?.leadership?.leaderCardLabel || 'Responsable del estudio',
      bullets:
        compactTextList(homePage?.leadership?.bullets) || [
          'Atencion profesional con enfoque personalizado.',
          'Comunicacion clara sobre escenario, riesgos y alternativas.',
          'Seguimiento responsable de cada asunto encomendado.',
        ],
    },
    processSteps: {
      eyebrow: homePage?.process?.heading?.eyebrow || 'Metodologia',
      title:
        homePage?.process?.heading?.title ||
        'Una forma de trabajo simple, ordenada y profesional.',
      description:
        homePage?.process?.heading?.description ||
        'Desde la primera consulta, el objetivo es entender el caso, revisar alternativas y definir los pasos a seguir.',
      steps:
        normalizeProcessSteps(homePage?.process?.steps) || defaultProcessSteps,
    },
    faq: {
      eyebrow: homePage?.faq?.heading?.eyebrow || 'Preguntas frecuentes',
      title:
        homePage?.faq?.heading?.title ||
        'Informacion simple para dar mas claridad desde el primer paso.',
      description:
        homePage?.faq?.heading?.description ||
        'Respuestas claras a dudas habituales antes de tomar contacto con el estudio.',
      items: normalizeFaqItems(homePage?.faq?.items) || defaultFaqItems,
    },
    finalCta: {
      eyebrow: homePage?.finalCta?.eyebrow || 'Contacto',
      title:
        homePage?.finalCta?.title ||
        'Agende una consulta virtual o escriba por WhatsApp para revisar su caso con claridad y confidencialidad.',
      description:
        homePage?.finalCta?.description ||
        'El estudio puede orientar el siguiente paso, indicar antecedentes utiles y proponer una forma de trabajo concreta segun el problema juridico.',
      primaryLabel:
        normalizePrimaryCtaLabel(homePage?.finalCta?.primaryLabel),
      secondaryLabel:
        normalizeWhatsappCtaLabel(homePage?.finalCta?.secondaryLabel),
    },
  };
}
