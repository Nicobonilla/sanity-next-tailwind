import {
  GetPageDetailQueryResult,
  GetPostListQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { Metadata } from 'next';
import PageTemplate from '@/components/pages/PageTemplate';
import Posts from '@/components/pages/component/Posts';
import Resources, { Resource } from '@/components/pages/component/Resources';
import { PortableTextComponents } from 'next-sanity';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import { unitBusiness } from '../../../sanity/lib/queries/unitBusiness.query';

type PageData = {
  page: GetPageDetailQueryResult | null;
  posts: GetPostListQueryResult | null;
  unitBusiness: GetUnitBusinessListQueryResult | null;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Información Sobre Procedimientos Legales',
    openGraph: {
      title: 'Información Sobre Procedimientos Legales',
      type: 'website',
    },
  };
}

async function getDataPage() {
  try {
    const [page, posts, unitBusiness]: [
      GetPageDetailQueryResult | null,
      GetPostListQueryResult | null,
      GetUnitBusinessListQueryResult | null,
    ] = await Promise.all([
      await getPageBySlugFetch('blog'),
      await getPostListFetch(),
      await getUnitBusinessListFetch(),
    ]);
    return { page, posts, unitBusiness };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
const resources: Resource[] = [
  {
    title: 'Poder Judicial Chile',
    url: 'https://www.pjud.cl',
    description:
      'Sitio oficial del Poder Judicial de Chile, con acceso a información de causas y trámites.',
  },
  {
    title: 'Conservador de Bienes Raíces de San Felipe',
    url: 'http://www.conservadorsanfelipe.cl',
    description:
      'Consulta y gestión de inscripciones y certificaciones relacionadas con bienes raíces.',
  },
  {
    title: 'Registro Civil e Identificación',
    url: 'https://www.registrocivil.cl',
    description:
      'Trámites de inscripción, certificados de nacimiento, matrimonio, defunción y cédulas de identidad.',
  },
  {
    title: 'Ministerio de Vivienda y Urbanismo (MINVU)',
    url: 'https://www.minvu.gob.cl',
    description:
      'Programas y servicios relacionados con viviendas sociales y subsidios habitacionales.',
  },
  {
    title: 'Servicio de Impuestos Internos (SII)',
    url: 'https://www.sii.cl',
    description:
      'Consulta de avalúos fiscales, trámites relacionados con propiedades y gestión de impuestos.',
  },
  {
    title: 'Fiscalía Regional de Valparaíso',
    url: 'https://www.fiscaliadechile.cl',
    description:
      'Información sobre denuncias y procesos judiciales relacionados con delitos en la región.',
  },
  {
    title: 'Oficina de Protección de Derechos de la Infancia (OPD)',
    url: 'https://www.sename.cl',
    description:
      'Servicios y apoyo en casos de vulneración de derechos de niños y adolescentes.',
  },
  {
    title: 'Clave Única',
    url: 'https://www.claveunica.gob.cl',
    description:
      'Portal oficial para gestionar trámites digitales en instituciones del Estado, incluyendo acceso al Poder Judicial.',
  },
  {
    title: 'Boletín Comercial (Dicom)',
    url: 'https://www.equifax.cl',
    description:
      'Consulta de antecedentes financieros y comerciales en el Boletín Comercial, conocido como Dicom.',
  },
  {
    title: 'Superintendencia de Insolvencia y Reemprendimiento',
    url: 'https://www.superir.gob.cl',
    description:
      'Información y servicios relacionados con deudas, renegociación y liquidación para personas y empresas.',
  },
  {
    title: 'Defensoría Laboral de San Felipe',
    url: 'https://www.cajvalparaiso.cl',
    description:
      'Asesoría jurídica gratuita en materia laboral ofrecida por la Corporación de Asistencia Judicial de la región de Valparaíso.',
  },
  {
    title: 'Municipalidad de San Felipe',
    url: 'https://www.munisanfelipe.cl',
    description:
      'Portal oficial del municipio con acceso a información sobre servicios locales y trámites comunitarios.',
  },
  {
    title: 'Instituto de Previsión Social (IPS)',
    url: 'https://www.chileatiende.gob.cl',
    description:
      'Trámites y consultas sobre pensiones, beneficios sociales y subsidios familiares.',
  },
  {
    title: 'Notarías Públicas en San Felipe',
    url: 'https://www.notarios.cl',
    description:
      'Información y ubicación de notarías en San Felipe para trámites legales y certificaciones.',
  },
  {
    title: 'Servicio Nacional de la Mujer y la Equidad de Género (SERNAMEG)',
    url: 'https://www.sernameg.gob.cl',
    description:
      'Asesorías y apoyo en casos de violencia intrafamiliar y derechos de las mujeres.',
  },
  {
    title: 'Dirección del Trabajo (DT)',
    url: 'https://www.dt.gob.cl',
    description:
      'Consultas y reclamos relacionados con derechos laborales y seguridad en el trabajo.',
  },
  {
    title: 'Superintendencia de Pensiones',
    url: 'https://www.spensiones.cl',
    description: 'Información sobre AFP, pensiones y beneficios previsionales.',
  },
  {
    title: 'Fundación Pro Bono Chile',
    url: 'https://www.probono.cl',
    description:
      'Acceso a asesoría legal gratuita para personas de escasos recursos.',
  },
  {
    title: 'Cámara de Comercio de San Felipe',
    url: 'https://www.ccsf.cl',
    description:
      'Asesoría y orientación para emprendedores y negocios locales en San Felipe.',
  },
  {
    title: 'Biblioteca del Congreso Nacional (BCN)',
    url: 'https://www.bcn.cl',
    description:
      'Acceso a legislación, estudios y recursos legales para ciudadanos y profesionales.',
  },
];

// Componente de PortableText con estilos personalizados
export const PTextBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-crimson text-xl font-semibold uppercase text-red-700">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-10 font-robotoslab text-3xl font-light text-gray-700">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="font-robotoslab text-base font-light text-gray-900">
        {children}
      </p>
    ),
  },
};
export default async function Page() {
  const data = await getDataPage();
  if (!data) {
    return <div>Error fetching data</div>;
  }
  const { page, posts, unitBusiness }: PageData = data;
  return (
    <section>
      {page?.components && <PageTemplate dataPage={page} />}

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <Posts posts={posts || []} unitBusiness={unitBusiness || []} />
            </div>
            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800">
                <div className="p-6">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Instituciones de Chile
                  </h2>
                  <Resources resources={resources} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
