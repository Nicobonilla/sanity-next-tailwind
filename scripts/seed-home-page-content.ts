import { randomUUID } from 'node:crypto';

import { createClient } from '@sanity/client';

const PROJECT_ID = 'c5h3hsr1';
const DATASET = 'production';
const API_VERSION = '2023-10-01';

type SettingsDoc = {
  _id: string;
  title?: string | null;
  slogan?: string | null;
  description?: string | null;
};

type HomePageSource = {
  _id: string;
  title?: string | null;
  resumen?: string | null;
  components?: {
    _key?: string;
    variant?: string | null;
    items?: {
      image?: {
        asset?: {
          _ref?: string;
        } | null;
      } | null;
    }[] | null;
  }[] | null;
} | null;

type AreaDoc = {
  title?: string | null;
};

function getClient() {
  const token = process.env.SANITY_AUTH_TOKEN;

  if (!token) {
    throw new Error('SANITY_AUTH_TOKEN is required');
  }

  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    token,
    useCdn: false,
  });
}

function block(text: string) {
  return {
    _type: 'block',
    _key: randomUUID(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: randomUUID(),
        marks: [],
        text,
      },
    ],
  };
}

function sectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return {
    _type: 'sectionHeading',
    eyebrow,
    title,
    description,
  };
}

function findHeroImageRef(home: HomePageSource) {
  const heroComponent = (home?.components || []).find(
    (component) => component?.variant === 'hero'
  );

  return heroComponent?.items?.[0]?.image?.asset?._ref || null;
}

async function run() {
  const client = getClient();

  const data = await client.fetch<{
    areas: AreaDoc[];
    home: HomePageSource;
    settings: SettingsDoc;
  }>(`{
    "settings": *[_id == "settings"][0]{
      _id,
      title,
      slogan,
      description
    },
    "home": *[_type == "page" && slug.current == "inicio"][0]{
      _id,
      title,
      resumen,
      components[isActive]|order(orderRank asc){
        _key,
        variant,
        items[]{
          image{
            asset
          }
        }
      }
    },
    "areas": *[_type == "unitBusiness" && !(_id in path("drafts.**"))]|order(orderRank asc){
      title
    }
  }`);

  const heroImageRef = findHeroImageRef(data.home);
  const settingsTitle = data.settings?.title?.trim() || 'Sebastián Bonilla Marín';
  const heroAreaCount = Math.max(1, data.areas?.length || 0);

  const homePageDocument = {
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      _type: 'homeHeroSection',
      eyebrow: 'Estudio jurídico en San Felipe',
      title:
        'Asesoría legal clara, seria y responsable para decisiones que requieren respaldo profesional.',
      description:
        'Acompañamos a personas y empresas con una práctica jurídica rigurosa, cercana y enfocada en soluciones concretas. Cada asunto se aborda con estudio, orden y comunicación clara desde el primer contacto.',
      panelTitle:
        'Asesoría legal clara para decisiones que requieren respaldo profesional.',
      heroImage: heroImageRef
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: heroImageRef,
            },
            alt: 'Reunión de asesoría legal del estudio',
          }
        : undefined,
      leaderLabel: 'Dirección profesional',
      areasLabel: 'Áreas activas',
      areasSuffix: 'especialidades principales',
      contactLabel: 'Contacto',
      trustBullets: [
        'Atención jurídica directa y confidencial',
        'Orientación para personas y empresas',
        'Base de atención en San Felipe y alrededores',
      ],
      primaryLabel: 'Solicitar orientación',
      secondaryLabel: 'Ver áreas de práctica',
    },
    trustItems: [
      {
        _type: 'trustItem',
        _key: randomUUID(),
        title: 'Atención directa',
        description:
          'Cada consulta se aborda con análisis responsable y contacto profesional claro desde el inicio.',
      },
      {
        _type: 'trustItem',
        _key: randomUUID(),
        title: 'Confidencialidad',
        description:
          'El manejo de la información se realiza con criterio jurídico y reserva en cada etapa.',
      },
      {
        _type: 'trustItem',
        _key: randomUUID(),
        title: 'Criterio estratégico',
        description:
          'Se revisa el escenario, sus riesgos y el camino más adecuado antes de avanzar.',
      },
      {
        _type: 'trustItem',
        _key: randomUUID(),
        title: 'Comunicación clara',
        description:
          'Explicamos el proceso, sus alcances y próximos pasos sin tecnicismos innecesarios.',
      },
    ],
    firmIntro: {
      _type: 'homeFirmIntroSection',
      heading: sectionHeading({
        eyebrow: 'Quiénes somos',
        title: 'Asesoría jurídica seria, cercana y bien fundamentada en San Felipe.',
        description:
          'Atendemos personas y empresas que necesitan entender su situación, ordenar sus antecedentes y avanzar con respaldo jurídico claro.',
      }),
      paragraphs: [
        'Cada asunto se revisa con estudio, orden y comunicación clara. La prioridad es que la persona entienda su problema, conozca sus alternativas y sepa qué pasos corresponde seguir.',
        'Trabajamos con atención directa, criterio profesional y una forma de trato responsable que permita avanzar con tranquilidad.',
      ],
      cards: [
        {
          _type: 'labelValueItem',
          _key: randomUUID(),
          label: 'Cómo trabajamos',
          value: 'Escucha, análisis y acompañamiento.',
        },
        {
          _type: 'labelValueItem',
          _key: randomUUID(),
          label: 'Qué priorizamos',
          value: 'Claridad, seriedad y decisiones bien fundamentadas.',
        },
      ],
    },
    practiceAreas: {
      _type: 'homePracticeAreasSection',
      heading: sectionHeading({
        eyebrow: 'Áreas de práctica',
        title: 'Servicios jurídicos enfocados en problemas concretos.',
        description:
          'Materias frecuentes para personas, familias y propietarios que necesitan orientación jurídica clara.',
      }),
      maxItems: Math.min(6, heroAreaCount),
      servicesLabel: 'Servicios relacionados',
      detailLabel: 'Ver detalle',
    },
    leadership: {
      _type: 'homeLeadershipSection',
      heading: sectionHeading({
        eyebrow: 'Dirección profesional',
        title: 'Respaldo jurídico con criterio técnico y trato claro.',
        description:
          'Atención directa, explicación clara y seguimiento responsable en cada etapa del caso.',
      }),
      leaderNameOverride: settingsTitle,
      leaderCardLabel: 'Responsable del estudio',
      bullets: [
        'Atención profesional con enfoque personalizado.',
        'Comunicación clara sobre escenario, riesgos y alternativas.',
        'Seguimiento responsable de cada asunto encomendado.',
      ],
    },
    process: {
      _type: 'homeProcessSection',
      heading: sectionHeading({
        eyebrow: 'Metodología',
        title: 'Una forma de trabajo simple, ordenada y profesional.',
        description:
          'Desde la primera consulta, el objetivo es entender el caso, revisar alternativas y definir los pasos a seguir.',
      }),
      steps: [
        {
          _type: 'processStep',
          _key: randomUUID(),
          step: '01',
          title: 'Escuchamos y entendemos el caso',
          description:
            'La primera etapa es comprender el contexto, los antecedentes y el objetivo real de quien consulta.',
        },
        {
          _type: 'processStep',
          _key: randomUUID(),
          step: '02',
          title: 'Evaluamos jurídicamente el escenario',
          description:
            'Se revisan alternativas, riesgos y alcances para proponer un camino serio y bien fundamentado.',
        },
        {
          _type: 'processStep',
          _key: randomUUID(),
          step: '03',
          title: 'Acompañamos con claridad durante el proceso',
          description:
            'La relación profesional se sostiene con seguimiento, orden y comunicación clara en cada etapa.',
        },
      ],
    },
    faq: {
      _type: 'homeFaqSection',
      heading: sectionHeading({
        eyebrow: 'Preguntas frecuentes',
        title: 'Información simple para dar más claridad desde el primer paso.',
        description:
          'Respuestas claras a dudas habituales antes de tomar contacto con el estudio.',
      }),
      items: [
        {
          _type: 'faqItem',
          _key: randomUUID(),
          question:
            '¿Puedo realizar una primera consulta antes de iniciar un proceso?',
          answer:
            'Sí. El objetivo de una primera conversación es revisar el contexto del asunto, aclarar expectativas y evaluar la forma más adecuada de abordarlo.',
        },
        {
          _type: 'faqItem',
          _key: randomUUID(),
          question:
            '¿La información entregada se maneja con confidencialidad?',
          answer:
            'Sí. El tratamiento de antecedentes y documentación se realiza con criterio profesional y reserva, desde el primer contacto.',
        },
        {
          _type: 'faqItem',
          _key: randomUUID(),
          question:
            '¿Atienden asuntos de personas y también de empresas?',
          answer:
            'Sí. El estudio puede acompañar tanto necesidades jurídicas personales como asuntos corporativos que requieran análisis y representación profesional.',
        },
        {
          _type: 'faqItem',
          _key: randomUUID(),
          question: '¿Es posible coordinar atención a distancia?',
          answer:
            'Sí. Dependiendo del caso, se puede coordinar una primera orientación por medios remotos y luego definir los pasos siguientes.',
        },
      ],
    },
    finalCta: {
      _type: 'contactCta',
      isEnabled: true,
      eyebrow: 'Contacto',
      title:
        'Si necesita orientación jurídica, podemos revisar su caso y proponer el camino adecuado con seriedad y confidencialidad.',
      description:
        'Puede escribirnos, llamarnos o solicitar una primera orientación. La prioridad es entender el asunto y dar una respuesta profesional clara.',
      primaryLabel: 'Solicitar orientación',
      secondaryLabel: 'Llamar ahora',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Estudio jurídico en San Felipe | Asesoría legal y judicial',
      metaDescription:
        data.home?.resumen ||
        'Asesoría legal clara, seria y responsable en San Felipe y la Región de Valparaíso.',
      ogTitle: 'Estudio jurídico en San Felipe | Asesoría legal y judicial',
      ogDescription:
        data.home?.resumen ||
        'Asesoría legal clara, seria y responsable en San Felipe y la Región de Valparaíso.',
      keywords: [
        'abogados en san felipe',
        'asesoría legal san felipe',
        'estudio jurídico san felipe',
        'abogado derecho familiar san felipe',
        'abogado derecho inmobiliario san felipe',
      ],
    },
  };

  const settingsPatch = {
    firmName: 'Estudio Jurídico Sebastián Bonilla Marín',
    shortName: 'Sebastián Bonilla Marín',
    responsibleLawyerName: settingsTitle,
    descriptor: 'Asesoría legal y judicial en San Felipe',
    phoneDisplay: '+56 9 3359 6955',
    whatsappNumber: '56933596955',
    email: 'contacto@abogadossanfelipe.cl',
    addressLine: 'San Felipe, Región de Valparaíso, Chile',
    city: 'San Felipe',
    region: 'Valparaíso',
    footer: [
      block(
        'Asesoría legal y judicial para personas y empresas en San Felipe, con una práctica orientada a la claridad, la responsabilidad y el acompañamiento profesional en cada etapa.'
      ),
    ],
    defaultContentCta: {
      _type: 'contactCta',
      isEnabled: true,
      eyebrow: 'Orientación legal',
      title:
        'Si necesita claridad para tomar una decisión legal, podemos orientar el siguiente paso.',
      description:
        'Comparta su consulta y el estudio revisará sus antecedentes para orientar el camino adecuado con seriedad y confidencialidad.',
      primaryLabel: 'Solicitar orientación',
      secondaryLabel: 'Llamar ahora',
    },
  };

  const tx = client.transaction();
  tx.createIfNotExists({
    _id: 'homePage',
    _type: 'homePage',
  });
  tx.patch('homePage', {
    set: homePageDocument,
  });
  tx.patch('settings', {
    set: settingsPatch,
  });

  const result = await tx.commit();

  console.log(
    JSON.stringify(
      {
        heroImageRef,
        homePageDocumentId: 'homePage',
        settingsDocumentId: 'settings',
        transactionId: result.transactionId,
      },
      null,
      2
    )
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
