import { Metadata } from 'next';

import PolicyShell from '@/components/policies/PolicyShell';
import { buildSeoMetadata } from '@/lib/seo';
import { resolveSiteIdentity } from '@/lib/site-identity';
import { getSettingsFetch } from '@/sanity/lib/fetch';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettingsFetch();

  return buildSeoMetadata({
    title: 'Politica de privacidad',
    description:
      'Informacion sobre el tratamiento de datos personales, formularios de contacto y medicion web del estudio.',
    path: '/politica-de-privacidad',
    settings,
    type: 'website',
  });
}

export default async function PrivacyPolicyPage() {
  const settings = await getSettingsFetch();
  const siteIdentity = resolveSiteIdentity(settings);

  return (
    <PolicyShell
      summary="Esta politica explica que datos podemos tratar cuando navega por el sitio, solicita orientacion legal o utiliza nuestros canales de contacto, y para que fines se utilizan."
      title="Politica de privacidad"
    >
      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Responsable del tratamiento
        </h2>
        <p className="section-copy !max-w-none">
          {siteIdentity.firmName} es responsable del tratamiento de los datos
          personales recopilados a traves de este sitio web. Para consultas sobre
          privacidad o ejercicio de derechos puede escribir a {siteIdentity.email}{' '}
          o contactar al estudio en {siteIdentity.phoneDisplay}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Datos que podemos recopilar
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-[color:var(--color-text-soft)]">
          <li>Datos de contacto enviados voluntariamente en formularios.</li>
          <li>Informacion incluida por usted en su mensaje o consulta legal.</li>
          <li>
            Datos tecnicos y de navegacion cuando autoriza el uso de analytics.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Finalidades del tratamiento
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-[color:var(--color-text-soft)]">
          <li>Responder consultas y solicitudes de orientacion.</li>
          <li>Coordinar contacto profesional con potenciales clientes.</li>
          <li>
            Mejorar contenidos, articulos, areas de practica y experiencia del
            sitio cuando existe autorizacion para medicion.
          </li>
          <li>Cumplir obligaciones legales y resguardar seguridad del sitio.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Formularios de contacto
        </h2>
        <p className="section-copy !max-w-none">
          Los datos enviados mediante formularios se utilizan para revisar la
          consulta, responder y, si corresponde, coordinar una instancia de
          orientacion. El envio del formulario no constituye por si solo una
          relacion abogado-cliente ni garantiza la aceptacion del asunto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Medicion y analytics
        </h2>
        <p className="section-copy !max-w-none">
          Si usted autoriza la medicion, podemos utilizar Google Tag Manager y
          Google Analytics para conocer que paginas, articulos, llamadas a la
          accion y canales generan consultas. La medicion se usa con fines de
          analisis del sitio y mejora de contenidos, no para publicidad
          personalizada.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-[color:var(--color-primary)]">
          Derechos y contacto
        </h2>
        <p className="section-copy !max-w-none">
          Puede solicitar informacion sobre el tratamiento de sus datos o pedir
          actualizacion, rectificacion o eliminacion cuando corresponda,
          escribiendo a {siteIdentity.email}. Tambien puede revisar o cambiar su
          decision sobre cookies desde el enlace de preferencias disponible en el
          pie del sitio.
        </p>
      </section>
    </PolicyShell>
  );
}
