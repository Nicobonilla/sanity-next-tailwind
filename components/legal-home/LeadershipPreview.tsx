import SectionHeading from './SectionHeading';

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function LeadershipPreview({
  leaderName,
}: {
  leaderName: string;
}) {
  return (
    <section className="section-shell bg-[color:rgba(232,225,215,0.55)]">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <SectionHeading
            description={
              <>
                En servicios legales, la legitimidad también se construye
                mostrando quién conduce el trabajo y qué tipo de atención puede
                esperar el cliente.
              </>
            }
            eyebrow="Dirección profesional"
            title="Una práctica jurídica que busca equilibrio entre firmeza técnica y trato claro."
          />

          <div className="surface-card p-8">
            <div className="flex items-center gap-5">
              <div className="flex size-20 items-center justify-center rounded-full bg-[color:var(--color-primary)] font-display text-3xl text-[color:var(--color-bg)]">
                {getInitials(leaderName)}
              </div>
              <div>
                <p className="legal-kicker">Responsable del estudio</p>
                <p className="mt-2 text-2xl font-semibold text-[color:var(--color-primary)]">
                  {leaderName}
                </p>
              </div>
            </div>

            <div className="divider-line my-6" />

            <ul className="space-y-3 text-base leading-7 text-[color:var(--color-text-soft)]">
              <li>Atención profesional con enfoque personalizado.</li>
              <li>Comunicación clara sobre escenario, riesgos y alternativas.</li>
              <li>Seguimiento responsable de cada asunto encomendado.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
