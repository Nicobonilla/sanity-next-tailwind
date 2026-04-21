import { NextResponse } from 'next/server';

import { buildContentPath } from '@/lib/path-utils';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getServicesNavFetch } from '@/sanity/lib/fetchs/service.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';

export const revalidate = 3600;

function toAbsoluteUrl(baseUrl: string, path: string) {
  return new URL(path, baseUrl).toString();
}

export async function GET() {
  const [settings, services, practiceAreas, posts] = await Promise.all([
    getSettingsFetch(),
    getServicesNavFetch(),
    getUnitBusinessListFetch(),
    getPostListFetch(),
  ]);

  const baseUrl = new URL(
    `https://${settings?.metaBaseWebsite || 'www.abogadossanfelipe.cl'}`
  );
  const siteName = settings?.firmName || 'Abogados San Felipe';
  const summary =
    settings?.description ||
    'Estudio juridico en San Felipe enfocado en derecho familiar e inmobiliario.';

  const importantServices = (services || [])
    .filter((service) => Boolean(buildContentPath('/services', service.slug)))
    .slice(0, 8)
    .map(
      (service) =>
        `- [${service.title}](${toAbsoluteUrl(baseUrl.toString(), buildContentPath('/services', service.slug)!)}): Servicio legal del estudio.`
    );

  const importantPracticeAreas = (practiceAreas || [])
    .filter((area) =>
      Boolean(buildContentPath('/area-de-practica', area.slug))
    )
    .map(
      (area) =>
        `- [${area.title}](${toAbsoluteUrl(baseUrl.toString(), buildContentPath('/area-de-practica', area.slug)!)}): Area de practica principal del estudio.`
    );

  const featuredPosts = (posts || [])
    .filter((post) => Boolean(buildContentPath('/blog', post.slug)))
    .slice(0, 6)
    .map(
      (post) =>
        `- [${post.title}](${toAbsoluteUrl(baseUrl.toString(), buildContentPath('/blog', post.slug)!)}): Articulo informativo relacionado con tramites y consultas legales en Chile.`
    );

  const content = [
    `# ${siteName}`,
    '',
    `> ${summary}`,
    '',
    'Sitio institucional de un estudio juridico en San Felipe, Chile. La web concentra servicios, areas de practica, articulos informativos y datos de contacto para personas y familias que buscan orientacion legal.',
    '',
    '## Paginas clave',
    `- [Inicio](${baseUrl.toString()}): Presentacion general del estudio.`,
    `- [Nosotros](${toAbsoluteUrl(baseUrl.toString(), '/nosotros')}): Perfil institucional y enfoque de trabajo.`,
    `- [Blog](${toAbsoluteUrl(baseUrl.toString(), '/blog')}): Biblioteca de contenido legal e informativo.`,
    '',
    '## Areas de practica',
    ...importantPracticeAreas,
    '',
    '## Servicios destacados',
    ...importantServices,
    '',
    '## Articulos destacados',
    ...featuredPosts,
    '',
    '## Optional',
    `- [Sitemap](${toAbsoluteUrl(baseUrl.toString(), '/sitemap.xml')}): Listado completo de URLs indexables.`,
    `- [Robots](${toAbsoluteUrl(baseUrl.toString(), '/robots.txt')}): Reglas de rastreo publicadas por el sitio.`,
  ].join('\n');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
