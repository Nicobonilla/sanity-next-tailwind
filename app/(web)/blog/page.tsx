import { Metadata } from 'next';
import { Blog, WithContext } from 'schema-dts';

import PageTemplate from '@/components/pages/PageTemplate';
import Posts from '@/components/pages/component/Posts';
import Resources from '@/components/pages/component/Resources';
import { ComponentProps, ComponentsProps } from '@/components/types';
import { buildSeoMetadata, extractFallbackImage } from '@/lib/seo';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import {
  GetPageDetailQueryResult,
  GetPostListQueryResult,
  GetUnitBusinessListQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';

type PageData = {
  page: GetPageDetailQueryResult | null;
  posts: GetPostListQueryResult | null;
  settings: SettingsQueryResult | null;
  unitBusiness: GetUnitBusinessListQueryResult | null;
};

async function getDataPage() {
  try {
    const [page, posts, unitBusiness, settings]: [
      GetPageDetailQueryResult | null,
      GetPostListQueryResult | null,
      GetUnitBusinessListQueryResult | null,
      SettingsQueryResult | null,
    ] = await Promise.all([
      getPageBySlugFetch('blog'),
      getPostListFetch(),
      getUnitBusinessListFetch(),
      getSettingsFetch(),
    ]);

    return { page, posts, settings, unitBusiness };
  } catch (error) {
    console.error('Error fetching blog page:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDataPage();

  if (!data) {
    return {
      title: 'Informacion sobre procedimientos legales',
    };
  }

  return buildSeoMetadata({
    title: data.page?.seo?.metaTitle || 'Informacion sobre procedimientos legales',
    description:
      data.page?.seo?.metaDescription ||
      data.page?.resumen ||
      'Articulos y guias legales sobre familia, propiedades, herencias y procedimientos frecuentes en San Felipe.',
    path: '/blog',
    seo: data.page?.seo,
    settings: data.settings,
    fallbackImage: extractFallbackImage(data.page?.components),
    type: 'website',
  });
}

export default async function Page() {
  const data = await getDataPage();

  if (!data) {
    return <div>Error fetching data</div>;
  }

  const { page, posts, unitBusiness }: PageData = data;
  const blogJsonLd: WithContext<Blog> = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: page?.title || 'Informate',
    description:
      page?.seo?.metaDescription ||
      page?.resumen ||
      'Guias legales y articulos informativos del estudio juridico en San Felipe.',
    url: 'https://www.abogadossanfelipe.cl/blog',
    blogPost: (posts || [])
      .filter((post) => Boolean(post.slug))
      .slice(0, 12)
      .map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title || 'Articulo legal',
        url: `https://www.abogadossanfelipe.cl/blog/${post.slug}`,
        dateModified: post._updatedAt || undefined,
        datePublished: post.date || undefined,
        description: post.resumen || undefined,
      })),
  };

  return (
    <section>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        type="application/ld+json"
      />
      {page?.components?.[0] && (
        <PageTemplate components={[page.components[0]] as ComponentsProps} />
      )}

      <div className="mx-auto max-w-screen-xl px-4 py-8 md:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <Posts posts={posts || []} unitBusiness={unitBusiness || []} />
          </div>
          {page?.components?.[1] && (
            <Resources data={page.components[1] as ComponentProps} />
          )}
        </div>
      </div>
    </section>
  );
}
