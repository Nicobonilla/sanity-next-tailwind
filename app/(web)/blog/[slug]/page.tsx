import { Metadata } from 'next';
import { GetPostDetailQueryResult } from '@/sanity.types';
import { getPostBySlugFetch } from '@/sanity/lib/fetchs/post.fetch';
import PageTemplate from '@/components/pages/PageTemplate';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';
import { ComponentsProps } from '@/components/types';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { Service, WithContext } from 'schema-dts';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: GetPostDetailQueryResult = await getData(params.slug);
  return {
    title: post?.title,
    openGraph: {
      title: post?.title || '',
      type: 'article',
      images: resolveOpenGraphImage(post?.components?.[0]?.imageBackground),
    },
  };
}

async function getData(slug: string) {
  try {
    const post: GetPostDetailQueryResult | null = await getPostBySlugFetch({
      slug,
    });
    return post;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getData(params.slug);
  if (!post) {
    return <div>Servicio no encontrado.</div>;
  }

  const jsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: post?.title || 'Abogados San Felipe',
    description: post.resumen || 'Derecho Familiar e Inmobiliario',
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
  const breadcrumbsItems = [
    { label: 'Inicio', slug: 'home' },
    { label: 'Blog', slug: 'blog' },
  ];

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {post?.components && (
        <PageTemplate components={post.components as ComponentsProps} />
      )}
      <PortableTextAndToc article={post} breadcrumbsItems={breadcrumbsItems} />
    </section>
  );
}
