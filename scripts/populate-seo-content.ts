import { createClient } from '@sanity/client';

const PROJECT_ID = 'c5h3hsr1';
const DATASET = 'production';
const API_VERSION = '2023-10-01';
const SITE_NAME = 'Abogados San Felipe';
const SITE_URL = 'https://www.abogadossanfelipe.cl';
const CITY = 'San Felipe';

type SeoValue = {
  canonicalUrl?: string;
  keywords?: string[];
  metaDescription?: string;
  metaTitle?: string;
  noIndex?: boolean;
  ogDescription?: string;
  ogTitle?: string;
};

type PageDoc = {
  _id: string;
  slug?: string;
  title?: string;
  resumen?: string | null;
};

type AreaDoc = {
  _id: string;
  slug?: string;
  title?: string;
};

type ServiceDoc = {
  _id: string;
  slug?: string;
  title?: string;
  resumen?: string | null;
  unitBusiness?: {
    title?: string;
  } | null;
};

type PortableTextChild = {
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  style?: string;
  children?: PortableTextChild[];
};

type PostDoc = {
  _id: string;
  slug?: string;
  title?: string;
  resumen?: string | null;
  content?: PortableTextBlock[] | null;
  unitBusiness?: {
    title?: string;
  } | null;
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

function compact<T>(values: Array<T | null | undefined | false>) {
  return values.filter(Boolean) as T[];
}

function dedupe(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function truncate(text: string, maxLength: number) {
  const normalized = text.replace(/\s+/g, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
}

function createMetaTitle(base: string, suffix = `| ${SITE_NAME}`, limit = 65) {
  const normalizedBase = base.replace(/\s+/g, ' ').trim();
  const alreadyHasBrand = normalizedBase
    .toLowerCase()
    .includes(SITE_NAME.toLowerCase());
  const full = alreadyHasBrand
    ? normalizedBase
    : `${normalizedBase} ${suffix}`.trim();

  if (full.length <= limit) {
    return full;
  }

  const maxBaseLength = Math.max(20, limit - suffix.length - 1);
  return `${truncate(normalizedBase, maxBaseLength)} ${suffix}`.trim();
}

function extractPlainText(blocks: PortableTextBlock[] | null | undefined) {
  return (blocks || [])
    .filter((block) => block?._type === 'block')
    .flatMap((block) => block.children || [])
    .map((child) => child.text || '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createSeo({
  title,
  description,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords: string[];
  noIndex?: boolean;
}): SeoValue {
  const metaTitle = createMetaTitle(title);
  const metaDescription = truncate(description, 160);

  return {
    metaTitle,
    metaDescription,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    keywords: dedupe(keywords),
    noIndex,
  };
}

function pageConfig(page: PageDoc) {
  switch (page.slug) {
    case 'inicio':
      return {
        resumen:
          'Asesoria legal clara, seria y responsable en San Felipe para personas y familias que necesitan respaldo profesional.',
        showInNavbar: true,
        showInFooter: true,
        seo: createSeo({
          title: 'Asesoria legal y judicial en San Felipe',
          description:
            'Estudio juridico en San Felipe con asesoria legal clara, seria y responsable en materias de familia e inmobiliarias.',
          keywords: [
            'abogados en san felipe',
            'asesoria legal san felipe',
            'estudio juridico san felipe',
            'abogado derecho familiar san felipe',
            'abogado derecho inmobiliario san felipe',
          ],
        }),
      };
    case 'nosotros':
      return {
        resumen:
          'Conozca el enfoque de trabajo, la experiencia profesional y la forma de atencion del estudio juridico en San Felipe.',
        showInNavbar: true,
        showInFooter: true,
        seo: createSeo({
          title: 'Conozca el estudio juridico en San Felipe',
          description:
            'Conozca al estudio juridico y su forma de trabajo en San Felipe: atencion profesional, ordenada y cercana.',
          keywords: [
            'estudio juridico san felipe',
            'abogado sebastian bonilla',
            'nosotros abogados san felipe',
            'abogados valparaiso interior',
          ],
        }),
      };
    case 'services':
      return {
        resumen:
          'Panorama general de las areas y servicios legales del estudio en derecho familiar e inmobiliario.',
        showInNavbar: false,
        showInFooter: false,
        seo: createSeo({
          title: 'Areas y servicios legales del estudio',
          description:
            'Referencia interna de areas y servicios legales del estudio. El trafico organico principal debe entrar por las paginas especializadas.',
          keywords: [
            'servicios legales san felipe',
            'areas de practica abogados san felipe',
            'derecho familiar san felipe',
            'derecho inmobiliario san felipe',
          ],
          noIndex: true,
        }),
      };
    case 'blog':
      return {
        resumen:
          'Articulos y guias legales sobre familia, herencias, propiedades y tramites frecuentes en Chile.',
        showInNavbar: false,
        showInFooter: false,
        seo: createSeo({
          title: 'Guias legales y articulos en San Felipe',
          description:
            'Guias y articulos legales sobre familia, herencias, propiedades y tramites frecuentes para personas y familias en Chile.',
          keywords: [
            'blog legal chile',
            'guias legales san felipe',
            'articulos derecho familiar chile',
            'articulos derecho inmobiliario chile',
          ],
        }),
      };
    case 'contacto':
      return {
        resumen:
          'Datos de contacto y vias de orientacion legal del estudio juridico en San Felipe.',
        showInNavbar: false,
        showInFooter: false,
        seo: createSeo({
          title: 'Contacto y orientacion legal en San Felipe',
          description:
            'Datos de contacto del estudio juridico en San Felipe. Orientacion legal por telefono, correo o formulario.',
          keywords: [
            'contacto abogados san felipe',
            'telefono abogado san felipe',
            'consulta legal san felipe',
          ],
          noIndex: true,
        }),
      };
    default:
      return {
        resumen: page.resumen || null,
        showInNavbar: true,
        showInFooter: true,
        seo: createSeo({
          title: page.title || 'Pagina legal',
          description:
            page.resumen ||
            'Informacion legal y servicios del estudio juridico en San Felipe.',
          keywords: ['abogados san felipe', 'asesoria legal chile'],
        }),
      };
  }
}

function areaConfig(area: AreaDoc) {
  const isFamily = area.slug === 'derecho-familiar';

  return createSeo({
    title: `${area.title} en ${CITY}`,
    description: isFamily
      ? 'Asesoria en divorcio, custodia, pensiones, herencias y otros asuntos de derecho familiar en San Felipe.'
      : 'Asesoria en compraventas, arriendos, regularizacion de propiedades y conflictos inmobiliarios en San Felipe.',
    keywords: isFamily
      ? [
          'derecho familiar san felipe',
          'abogado de familia san felipe',
          'divorcio san felipe',
          'custodia san felipe',
          'herencias san felipe',
        ]
      : [
          'derecho inmobiliario san felipe',
          'compraventa de propiedades san felipe',
          'regularizacion de propiedades san felipe',
          'arriendos san felipe',
          'abogado inmobiliario san felipe',
        ],
  });
}

function serviceConfig(service: ServiceDoc) {
  const areaTitle = service.unitBusiness?.title || 'Servicios legales';

  return createSeo({
    title: `${service.title} en ${CITY}`,
    description:
      service.resumen ||
      `${service.title} con asesoria profesional en ${CITY}, dentro del area de ${areaTitle.toLowerCase()}.`,
    keywords: compact([
      service.title?.toLowerCase(),
      `${service.title} san felipe`,
      `${areaTitle.toLowerCase()} san felipe`,
      'abogados san felipe',
      'asesoria legal san felipe',
    ]),
  });
}

function postConfig(post: PostDoc) {
  const areaTitle = post.unitBusiness?.title || 'asesoria legal';
  const plainText = extractPlainText(post.content);
  const curatedPosts: Record<
    string,
    { description: string; title: string }
  > = {
    'compraventa-de-propiedades': {
      title: 'Compraventa de propiedades en Chile',
      description:
        'Revise los puntos clave de la compraventa de propiedades en Chile, requisitos, riesgos y pasos legales para comprar o vender con seguridad.',
    },
    'preguntas-frecuentes-sobre-el-divorcio-en-chile': {
      title: 'Divorcio en Chile: preguntas frecuentes',
      description:
        'Respuestas claras sobre divorcio en Chile: requisitos, tipos de divorcio, tiempos y aspectos que conviene revisar antes de iniciar el proceso.',
    },
    'custodia-de-menores-guia-completa-para-padres-en-chile': {
      title: 'Custodia de menores en Chile',
      description:
        'Guia practica sobre custodia de menores en Chile: cuidado personal, relacion directa y regular, acuerdos y criterios que consideran los tribunales.',
    },
    'la-seguridad-de-la-familia-es-una-prioridad': {
      title: 'Violencia intrafamiliar en Chile',
      description:
        'Que hacer frente a violencia intrafamiliar en Chile: medidas de proteccion, denuncias y apoyo legal para resguardar a la familia.',
    },
    'regularizacion-de-propiedades-en-chile-tu-guia-legal-2025': {
      title: 'Regularizacion de propiedades en Chile',
      description:
        'Guia sobre regularizacion de propiedades en Chile: titulos, dominio, posesion efectiva y pasos legales para sanear una propiedad.',
    },
    'compra-y-venta-de-propiedades-guia-para-duenos-en-chile': {
      title: 'Compra y venta de propiedades en Chile',
      description:
        'Aspectos legales de la compra y venta de propiedades en Chile: revision de titulos, promesa, escritura e inscripcion.',
    },
    'debes-saber-sobre-herencia-y-sucesiones-guia-para-familias-en-chile': {
      title: 'Herencias y sucesiones en Chile',
      description:
        'Guia actualizada sobre herencias y sucesiones en Chile: posesion efectiva, particion y decisiones que conviene revisar a tiempo.',
    },
    'asesoria-legal-en-adopciones-guia-completa-para-familias-en-chile': {
      title: 'Adopcion en Chile: guia legal',
      description:
        'Guia sobre adopcion en Chile: requisitos, etapas del proceso y acompanamiento legal para familias.',
    },
  };

  const curated = post.slug ? curatedPosts[post.slug] : undefined;
  const resumen =
    curated?.description ||
    post.resumen ||
    truncate(
      plainText ||
        `Guia legal sobre ${post.title?.toLowerCase() || 'tramites legales'} en Chile.`,
      180
    );

  return {
    resumen,
    seo: createSeo({
      title: curated?.title || post.title || 'Articulo legal',
      description: resumen,
      keywords: compact([
        post.title?.toLowerCase(),
        areaTitle.toLowerCase(),
        `${areaTitle.toLowerCase()} chile`,
        'abogados san felipe',
        'guia legal chile',
      ]),
    }),
  };
}

async function run() {
  const client = getClient();

  const data = await client.fetch<{
    areas: AreaDoc[];
    pages: PageDoc[];
    posts: PostDoc[];
    services: ServiceDoc[];
  }>(`{
    "pages": *[_type == "page" && !(_id in path("drafts.**"))]{_id,title,"slug":slug.current,resumen},
    "areas": *[_type == "unitBusiness" && !(_id in path("drafts.**"))]{_id,title,"slug":slug.current},
    "services": *[_type == "service" && isActive && !(_id in path("drafts.**"))]{_id,title,"slug":slug.current,resumen,unitBusiness->{title}},
    "posts": *[_type == "post" && !(_id in path("drafts.**"))]{_id,title,"slug":slug.current,resumen,content,unitBusiness->{title}}
  }`);

  const tx = client.transaction();

  tx.patch('settings', {
    set: {
      description:
        'Asesoria legal y judicial en San Felipe para personas y familias, con foco en derecho familiar e inmobiliario.',
      defaultContentCta: {
        _type: 'contactCta',
        isEnabled: true,
        eyebrow: 'Orientacion legal',
        title:
          'Si necesita claridad para tomar una decision legal, podemos orientar el siguiente paso.',
        description:
          'Comparta su consulta y el estudio revisara sus antecedentes para orientar el camino adecuado con seriedad y confidencialidad.',
        primaryLabel: 'Solicitar orientacion',
        secondaryLabel: 'Llamar ahora',
      },
    },
  });

  for (const page of data.pages) {
    const config = pageConfig(page);
    tx.patch(page._id, {
      set: {
        resumen: config.resumen,
        showInNavbar: config.showInNavbar,
        showInFooter: config.showInFooter,
        seo: {
          _type: 'seo',
          ...config.seo,
        },
      },
    });
  }

  for (const area of data.areas) {
    tx.patch(area._id, {
      set: {
        seo: {
          _type: 'seo',
          ...areaConfig(area),
        },
      },
    });
  }

  for (const service of data.services) {
    tx.patch(service._id, {
      set: {
        seo: {
          _type: 'seo',
          ...serviceConfig(service),
        },
      },
    });
  }

  for (const post of data.posts) {
    const config = postConfig(post);
    tx.patch(post._id, {
      set: {
        resumen: config.resumen,
        seo: {
          _type: 'seo',
          ...config.seo,
        },
      },
    });
  }

  const result = await tx.commit();

  console.log(
    JSON.stringify(
      {
        updatedAreas: data.areas.length,
        updatedPages: data.pages.length,
        updatedPosts: data.posts.length,
        updatedServices: data.services.length,
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
