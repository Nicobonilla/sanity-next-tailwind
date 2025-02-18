'use server';
import Heading from '@/components/pages/component/Heading';
import PageTemplate from '@/components/pages/PageTemplate';
import { Breadcrumbs } from '@/components/pages/services/Breadcrumbs';
import { PTServices } from '@/components/pages/services/PTServices';
import TableOfContents from '@/components/pages/services/TableOfContents';
import { GetServiceDetailQueryResult } from '@/sanity.types';
import { getServiceBySlugFetch } from '@/sanity/lib/fetchs/service.fetch';
import { PortableText } from 'next-sanity';

async function getData(slug: string) {
  try {
    const service: GetServiceDetailQueryResult =
      await getServiceBySlugFetch(slug);

    return service;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
export default async function Page({ params }: { params: { slug: string } }) {
  const service: GetServiceDetailQueryResult | undefined = await getData(
    params.slug
  );
  if (!service) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }
  const breadcrumbsItems = [
    { label: 'Inicio', href: '/', slug: 'home' }, // Level 1: Root
    {
      label: service.unitBusiness.title,
      href: `/${service.unitBusiness.slug}`,
      slug: 'services',
    }, // Level 2: Section
    {
      label: service?.title || '',
      href: '/service',
      slug: params.slug,
    }, // Level 3: Current page
  ];
  return (
    <section>
      <div className={'mx-auto max-w-screen-xl'}>
        <article>
          {service?.components && (
            <PageTemplate dataPage={service as GetServiceDetailQueryResult} />
          )}
          <Breadcrumbs items={breadcrumbsItems} />
          <h1 className="h2 mb-6 ml-2">{service.title}</h1>

          <div className="mx-2 flex flex-col gap-14 md:flex-row">
            {/* Main Content: Asegura que el contenido principal esté a la izquierda */}
            <div className="order-2 md:order-1 md:w-3/4">
              <div className="prose prose-sm max-w-none">
                <PortableText
                  value={service.content || []}
                  components={PTServices}
                />
              </div>
            </div>

            {/* Sidebar: Table of Contents - Ponemos el aside a la derecha en pantallas medianas o más grandes */}
            <aside className="order-1 md:sticky md:top-24 md:order-2 md:max-h-fit md:w-1/4 md:self-start">
              <TableOfContents items={service.tableOfContents} />
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
