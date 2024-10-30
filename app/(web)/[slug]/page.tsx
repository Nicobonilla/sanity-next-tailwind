import PageTemplate from '@/components/pages/PageTemplate';

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageTemplate service={params.slug} />
    </>
  );
}
