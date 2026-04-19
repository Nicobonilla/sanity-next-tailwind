import { siteConfig } from '@/lib/site-config';
import {
  GetPageDetailQueryResult,
  GetUnitBusinessListQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/image-utils';

type SanityImageSource = {
  asset?: {
    _ref?: string;
  };
} | null;

type PortableTextChild = {
  text?: string | null;
};

type PortableTextBlock = {
  style?: string | null;
  children?: PortableTextChild[] | null;
};

type HomeComponentItem = {
  image?: SanityImageSource;
  alt?: string | null;
  content?: PortableTextBlock[] | null;
} | null;

type HomeComponent = {
  typeComponentValue?: string | null;
  variant?: string | null;
  imageBackground?: SanityImageSource;
  content?: PortableTextBlock[] | null;
  items?: HomeComponentItem[] | null;
} | null;

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

const SUPPORTED_HOME_COMPONENTS = ['carousel:hero', 'highlight'];

function toPlainText(blocks?: PortableTextBlock[] | null) {
  return (blocks || [])
    .flatMap((block) => block?.children || [])
    .map((child) => child?.text?.trim())
    .filter(Boolean)
    .join(' ')
    .trim();
}

function getHomeComponents(home: GetPageDetailQueryResult | null) {
  return ((home?.components as HomeComponent[] | null) || []).filter(Boolean);
}

function resolveHeroImage(home: GetPageDetailQueryResult | null) {
  const components = getHomeComponents(home);
  const heroComponent = components.find((component) => {
    const type = component?.typeComponentValue?.toLowerCase();
    return type === 'carousel' && component?.variant === 'hero';
  });

  const heroImage =
    heroComponent?.items?.find((item) => item?.image)?.image ||
    heroComponent?.imageBackground;

  return (
    urlForImage(heroImage)?.width(960).height(1120).fit('crop').quality(72).url() ||
    '/meeting.jpeg'
  );
}

function resolveSupportedComponentKeys(home: GetPageDetailQueryResult | null) {
  const components = getHomeComponents(home);

  return components.map((component) => {
    const type = component?.typeComponentValue?.toLowerCase() || 'unknown';
    const variant = component?.variant?.toLowerCase();
    return variant ? `${type}:${variant}` : type;
  });
}

export function buildLegalHomeContent({
  areas,
  home,
  settings,
}: {
  areas: GetUnitBusinessListQueryResult;
  home: GetPageDetailQueryResult | null;
  settings: SettingsQueryResult | null;
}) {
  const leaderName = settings?.title || siteConfig.shortName;
  const availableComponents = resolveSupportedComponentKeys(home);
  const highlightComponent = getHomeComponents(home).find(
    (component) => component?.typeComponentValue?.toLowerCase() === 'highlight'
  );

  const highlightSummary = toPlainText(highlightComponent?.content).slice(0, 220);
  const firmIntroLead =
    highlightSummary ||
    'Atendemos personas y empresas que necesitan entender su situacion, ordenar sus antecedentes y avanzar con respaldo juridico claro.';

  return {
    hero: {
      eyebrow: 'Estudio juridico en San Felipe',
      title:
        'Asesoria legal clara, seria y responsable para decisiones que requieren respaldo profesional.',
      description:
        'Acompanamos a personas y empresas con una practica juridica rigurosa, cercana y enfocada en soluciones concretas. Cada asunto se aborda con estudio, orden y comunicacion clara desde el primer contacto.',
      panelTitle:
        'Asesoria legal clara para decisiones que requieren respaldo profesional.',
      heroImageUrl: resolveHeroImage(home),
      leaderName,
      areaCount: areas.length,
    },
    trustStrip: {
      items: [
        {
          title: 'Atencion directa',
          description:
            'Cada consulta se aborda con analisis responsable y contacto profesional claro desde el inicio.',
        },
        {
          title: 'Confidencialidad',
          description:
            'El manejo de la informacion se realiza con criterio juridico y reserva en cada etapa.',
        },
        {
          title: 'Criterio estrategico',
          description:
            'Se revisa el escenario, sus riesgos y el camino mas adecuado antes de avanzar.',
        },
        {
          title: 'Comunicacion clara',
          description:
            'Explicamos el proceso, sus alcances y proximos pasos sin tecnicismos innecesarios.',
        },
      ] as TrustItem[],
    },
    firmIntro: {
      eyebrow: 'Quienes somos',
      title:
        'Asesoria juridica seria, cercana y bien fundamentada en San Felipe.',
      description: firmIntroLead,
      paragraphs: [
        'Cada asunto se revisa con estudio, orden y comunicacion clara. La prioridad es que la persona entienda su problema, conozca sus alternativas y sepa que pasos corresponde seguir.',
        'Trabajamos con atencion directa, criterio profesional y una forma de trato responsable que permita avanzar con tranquilidad.',
      ],
      cards: [
        {
          label: 'Como trabajamos',
          value: 'Escucha, analisis y acompanamiento.',
        },
        {
          label: 'Que priorizamos',
          value: 'Claridad, seriedad y decisiones bien fundamentadas.',
        },
      ] as IntroCard[],
    },
    practiceAreas: {
      eyebrow: 'Areas de practica',
      title: 'Servicios juridicos enfocados en problemas concretos.',
      description:
        'Materias frecuentes para personas, familias y propietarios que necesitan orientacion juridica clara.',
    },
    leadership: {
      eyebrow: 'Direccion profesional',
      title: 'Respaldo juridico con criterio tecnico y trato claro.',
      description:
        'Atencion directa, explicacion clara y seguimiento responsable en cada etapa del caso.',
      leaderName,
      bullets: [
        'Atencion profesional con enfoque personalizado.',
        'Comunicacion clara sobre escenario, riesgos y alternativas.',
        'Seguimiento responsable de cada asunto encomendado.',
      ],
    },
    processSteps: {
      eyebrow: 'Metodologia',
      title: 'Una forma de trabajo simple, ordenada y profesional.',
      description:
        'Desde la primera consulta, el objetivo es entender el caso, revisar alternativas y definir los pasos a seguir.',
      steps: [
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
      ] as ProcessStep[],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Informacion simple para dar mas claridad desde el primer paso.',
      description:
        'Respuestas claras a dudas habituales antes de tomar contacto con el estudio.',
      items: [
        {
          question:
            'Puedo realizar una primera consulta antes de iniciar un proceso?',
          answer:
            'Si. El objetivo de una primera conversacion es revisar el contexto del asunto, aclarar expectativas y evaluar la forma mas adecuada de abordarlo.',
        },
        {
          question:
            'La informacion entregada se maneja con confidencialidad?',
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
      ] as FaqItem[],
    },
    finalCta: {
      eyebrow: 'Contacto',
      title:
        'Si necesita orientacion juridica, podemos revisar su caso y proponer el camino adecuado con seriedad y confidencialidad.',
      description:
        'Puede escribirnos, llamarnos o solicitar una primera orientacion. La prioridad es entender el asunto y dar una respuesta profesional clara.',
      primaryLabel: 'Solicitar orientacion',
      secondaryLabel: 'Llamar ahora',
    },
    architecture: {
      supportedHomeComponents: SUPPORTED_HOME_COMPONENTS.filter((key) =>
        availableComponents.includes(key)
      ),
      ignoredHomeComponents: availableComponents.filter(
        (key) => !SUPPORTED_HOME_COMPONENTS.includes(key)
      ),
    },
  };
}
