'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import { GetServiceDetailQueryResult } from '@/sanity.types';
import { getServiceBySlugFetch } from '@/sanity/lib/fetchs/service.fetch';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';
import { Metadata } from 'next';
import { ComponentProps } from '@/components/types';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getData(params?.slug);
  if (!service) {
    return {
      title: 'Error',
      description: 'Error al cargar los datos.',
    };
  }
  return {
    title: service?.title,
    description: service?.resumen,
  };
}

async function getData(slug: string): Promise<GetServiceDetailQueryResult> {
  try {
    const service = await getServiceBySlugFetch(slug);
    return service;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const service = await getData(params.slug);
  if (!service) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }
  const breadcrumbsItems = [
    { label: 'Inicio', href: '/', slug: 'home' }, // Level 1: Root
    {
      label: service.unitBusiness.title,
      slug: `area-de-practica/${service.unitBusiness.slug}`,
    },
  ];
  return (
    <section>
      <div className={'mx-auto max-w-screen-xl'}>
        {service?.components && (
          <PageTemplate components={service.components as ComponentProps} />
        )}
        <PortableTextAndToc
          article={service}
          breadcrumbsItems={breadcrumbsItems}
        />
      </div>
    </section>
  );
}
