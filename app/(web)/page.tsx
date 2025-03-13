import PageTemplate from '@/components/pages/PageTemplate';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { type ComponentWithBannerPosts } from '@/components/types';
import type {
  GetPageDetailQueryResult,
  GetPostListQueryResult,
} from '@/sanity.types';
import { type Metadata } from 'next';
import type { Service, WithContext } from 'schema-dts';

type PageData = {
  home: GetPageDetailQueryResult | null;
  posts: GetPostListQueryResult | null;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sebastián Bonilla | Abogados',
  };
}

async function getData(slug: string): Promise<PageData | null> {
  try {
    const [home, posts] = await Promise.all([
      getPageBySlugFetch(slug),
      getPostListFetch(),
    ]);
    return { home, posts };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export type ModifiedComponent = ComponentWithBannerPosts & {
  bannerPostsItems?: GetPostListQueryResult | null;
};

// ✅ Ahora Page recibe `data` como props para evitar `async function`
export default async function Page() {
  const currentPage = await getData('inicio');
  if (!currentPage) {
    return <div>Error al cargar la página.</div>;
  }
  const { home, posts } = currentPage;

  // ✅ Asegurar que los componentes no se muten
  const componentsAndPosts: ModifiedComponent[] = home?.components?.map(
    (component) => ({
      ...component,
      bannerPostsItems:
        component.typeComponentValue === 'Carousel' && component.variant === 'post'
          ? posts
          : undefined,
    })
  ) || [];

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

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTemplate components={componentsAndPosts} />
    </section>
  );
}
