import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { getServiceBySlugFetch } from '@/sanity/lib/fetch';
import { Metadata } from 'next';
import { TableOfContents } from '@/components/pages/services/TableOfContents';
import { Breadcrumbs } from '@/components/pages/services/Breadcrumbs';
import { GetServiceDetailQueryResult } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';

interface TableOfContents {
  id: string;
  title: string;
  level: number;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service: GetServiceDetailQueryResult = await getServiceBySlugFetch(
    params.slug
  );
  return {
    title: service?.title,
    openGraph: {
      title: service?.title || '',
      type: 'article',
    },
    other: {
      'table-of-contents': JSON.stringify(service?.tableOfContents),
    },
  };
}

const components: PortableTextComponents = {
  block: {
    // Personalizar el renderizado del encabezado h2
    h1: ({ value, children }) => (
      <h1 className="h2 group relative">{children}</h1>
    ),
    h2: ({ value, children }) => (
      <div className="border-l-4 border-red-500 dark:border-red-700">
        <h2 id={`heading-${value._key}`} className="h3 group relative ml-2">
          {children}
        </h2>
      </div>
    ),
    h3: ({ value, children }) => (
      <h3 id={`heading-${value._key}`} className="h3">
        {children}
      </h3>
    ),
    normal: ({ children }) => <span className="p3">{children}</span>,
    blockquote: ({ children }) => (
      <blockquote className="p3 relative flex border-l-4 border-red-500 bg-gray-200 p-4 pl-4 dark:border-red-700 dark:bg-slate-800">
        <span className="pr-3 text-5xl text-red-500">“</span>
        <div>{children}</div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 font-extrabold text-red-600">{children}</span>
    ),
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="callToAction text-gray-900 underline dark:text-gray-300"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="p3">{children}</ul>,
  },
  types: {
    image: ({ value }) => {
      // Asegurarte de que 'value' tiene la estructura esperada
      if (!value || !value.asset) {
        return null; // O mostrar un componente alternativo
      }

      const imageUrl = urlForImage(value);
      if (!imageUrl) {
        return <p>Imagen no disponible</p>; // O una imagen predeterminada
      }

      return (
        <div className="relative my-5 max-h-[500px] min-h-[350px] w-full overflow-hidden">
          <Image
            alt={value.alt || 'Descripción por defecto'}
            src={imageUrl.url()}
            fill
          />
        </div>
      );
    },
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const service: GetServiceDetailQueryResult = await getServiceBySlugFetch(
    params.slug
  );

  if (!service) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }

  return (
    <article>
      {/* <Breadcrumbs /> */}

      <h1 className="h2 mb-6">{service.title}</h1>

      <div className="flex flex-col gap-14 md:flex-row">
        {/* Main Content: Asegura que el contenido principal esté a la izquierda */}
        <div className="order-2 md:order-1 md:w-3/4">
          <div className="prose prose-sm max-w-none">
            <PortableText
              value={service.content || []}
              components={components}
            />
          </div>
        </div>

        {/* Sidebar: Table of Contents - Ponemos el aside a la derecha en pantallas medianas o más grandes */}
        <aside className="order-1 md:sticky md:top-24 md:order-2 md:max-h-fit md:w-1/4 md:self-start">
          <TableOfContents
            items={service.tableOfContents ? service.tableOfContents : []}
          />
        </aside>
      </div>
    </article>
  );
}
