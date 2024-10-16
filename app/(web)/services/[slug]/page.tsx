import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types'
import { getServiceBySlugFetch } from '@/sanity/lib/fetch';
import { Metadata } from 'next';
import { TableOfContents } from '@/components/pages/services/TableOfContents';
import { Breadcrumbs } from '@/components/pages/services/Breadcrumbs'; // Asegúrate de que esté implementado correctamente
import { GetServiceDetailQueryResult } from '@/sanity.types';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';

interface TableOfContents {
  id: string;
  title: string;
  level: number;
}

interface ServiceData {
  title: string;
  content: PortableTextBlock[]; // Considera crear un tipo más específico si es posible
  tableOfContents: TableOfContents[];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service: GetServiceDetailQueryResult = await getServiceBySlugFetch(params.slug);
  return {
    title: service?.title,
    openGraph: {
      title: service?.title  || '',
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
    h2: ({ value, children }) => (
      <h2 id={`heading-${value._key}`} className="relative group dark:text-gray-300">
        {children}
      </h2>
    ),
    h3: ({ value, children }) => (
      <h3 id={`heading-${value._key}`} className="dark:text-gray-300">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <span className="dark:text-gray-400">
        {children}
      </span>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative flex p-4 pl-4 border-l-4 border-gray-900 
      dark:border-gray-400 text-gray-900 dark:text-gray-300 bg-gray-100
      dark:bg-slate-800">
        <span className="pr-3 text-5xl text-red-500">“</span>
        <div>{children}</div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-gray-300">
        {children}
      </span>
    ),
    link: ({ value, children }) => (
      <a href={value.href} className="underline text-gray-900 dark:text-gray-300 callToAction">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="dark:text-gray-400">
        {children}
      </ul>
    ),
  },
  types: {
    image: ({ value }) => {
      // Asegurarte de que 'value' tiene la estructura esperada
      if (!value || !value.asset) {
        return null; // O mostrar un componente alternativo
      }

      const imageUrl = urlForImage(value);
      // Renderizar la imagen aquí
    },
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const service: GetServiceDetailQueryResult = await getServiceBySlugFetch(params.slug);

  if (!service) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }

  return (
    <article className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      {/* <Breadcrumbs /> */}

      <h1 className="text-4xl font-bold mb-6">{service.title}</h1>

      <div className="flex flex-col md:flex-row gap-14">
        {/* Main Content: Asegura que el contenido principal esté a la izquierda */}
        <div className="md:w-3/4 order-2 md:order-1">
          <div className="prose prose-sm max-w-none">
            <PortableText value={service.content || []} components={components} />
          </div>
        </div>

        {/* Sidebar: Table of Contents - Ponemos el aside a la derecha en pantallas medianas o más grandes */}
        <aside className="md:w-1/4 order-1 md:order-2">
          <TableOfContents items={service.tableOfContents ? service.tableOfContents : [] } />
        </aside>
      </div>
    </article>
  );
}
