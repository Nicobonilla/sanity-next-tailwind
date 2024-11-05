'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import { GetServiceDetailQueryResult } from '@/sanity.types';
import { Component } from '@/sanity/fetchs/pagesFetch';
import { getServiceBySlugFetch } from '@/sanity/lib/fetch';

export default async function Page({ params }: { params: { slug: string } }) {
  const currentPage: GetServiceDetailQueryResult = await getServiceBySlugFetch(
    params.slug
  );
  if (!currentPage) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }
  return (
    <>
      {currentPage?.components && (
        <PageTemplate components={currentPage?.components as Component[]} />
      )}
    </>
  );
}
