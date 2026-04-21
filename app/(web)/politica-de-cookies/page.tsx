import { Metadata } from 'next';

import PolicyShell from '@/components/policies/PolicyShell';
import { buildSeoMetadata } from '@/lib/seo';
import { getSettingsFetch } from '@/sanity/lib/fetch';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettingsFetch();

  return buildSeoMetadata({
    title: 'Politica de cookies',
    description:
      'Informacion sobre el uso de cookies, almacenamiento local y preferencias de medicion del sitio.',
    path: '/politica-de-cookies',
    settings,
    type: 'website',
  });
}

export default async function CookiesPolicyPage() {
  return (
    <PolicyShell
      summary="Esta politica explica que tecnologias de almacenamiento usa el sitio, para que sirven y como puede aceptarlas o rechazarlas."
      title="Politica de cookies"
    >
      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Que son las cookies
        </h2>
        <p className="section-copy !max-w-none">
          Las cookies y tecnologias similares permiten recordar ciertas
          preferencias, mantener funciones basicas del sitio y, cuando usted lo
          autoriza, medir el rendimiento del contenido y las rutas de contacto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Cookies necesarias
        </h2>
        <p className="section-copy !max-w-none">
          El sitio puede utilizar almacenamiento tecnico necesario para recordar
          preferencias operativas basicas, como su decision sobre analytics o el
          funcionamiento de componentes interactivos esenciales.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Cookies de analytics
        </h2>
        <p className="section-copy !max-w-none">
          Solo se activan si usted las acepta. Se utilizan para medir paginas
          vistas, profundidad de scroll, clics en telefono, WhatsApp, apertura de
          formularios y otras interacciones de negocio necesarias para evaluar la
          captacion del sitio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Como gestionar su decision
        </h2>
        <p className="section-copy !max-w-none">
          Puede aceptar o rechazar analytics desde el banner inicial. Tambien
          puede reabrir las preferencias desde el pie del sitio y cambiar la
          decision en cualquier momento.
        </p>
      </section>
    </PolicyShell>
  );
}
