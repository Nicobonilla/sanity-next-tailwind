'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import { ComponentWithBannerPosts } from '@/components/types';
import {
  GetPageDetailQueryResult,
  GetPostListQueryResult,
} from '@/sanity.types';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { Metadata } from 'next';
import { Service, WithContext } from 'schema-dts';

type PageData = {
  home: GetPageDetailQueryResult | null;
  posts: GetPostListQueryResult | null;
};
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sebastián Bonilla | Abogados',
  };
}
async function getData(slug: string) {
  try {
    const [home, posts]: [
      GetPageDetailQueryResult | null,
      GetPostListQueryResult | null,
    ] = await Promise.all([getPageBySlugFetch(slug), getPostListFetch()]);
    return { home, posts };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export type ModifiedComponent = ComponentWithBannerPosts & {
  bannerPostsItems?: GetPostListQueryResult | null;
};

export default async function Page() {
  const currentPage = await getData('inicio');

  const jsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Abogados San Felipe - Sebastián Bonilla Marín',
    description: 'Derecho Familiar e Inmobiliario',
    serviceType: 'Asesoría Legal y Jurídica',
    provider: {
      '@type': 'Organization',
      name: 'Abogados San Felipe - Sebastián Bonilla Marín',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Felipe',
        addressRegion: 'Valparaíso',
        postalCode: '2170000',
        addressCountry: 'CL',
      },
      telephone: '+56 9 3359 6955',
      email: 'contacto@abogadossanfelipe.cl',
      url: 'https://www.abogadossanfelipe.cl',
    },
    areaServed: 'San Felipe, Chile',
    offers: {
      '@type': 'Offer',
      price: 'Consultar',
      priceCurrency: 'CLP',
    },
  };
  if (!currentPage) {
    return <div>Error al cargar la página.</div>;
  }
  // Crear una copia de los componentes para evitar mutaciones directas
  const { home, posts }: PageData = currentPage;

  const componentsAndPosts: ModifiedComponent = home?.components?.map(
    (component) => {
      if (
        component.typeComponentValue === 'Carousel' &&
        component.variant === 'post'
      ) {
        return {
          ...component,
          bannerPostsItems: posts,
        };
      }
      return component;
    }
  );

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {componentsAndPosts && (
        <PageTemplate components={componentsAndPosts as ModifiedComponent} />
      )}
    </section>
  );
}
