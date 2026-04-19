import SectionHeading from './SectionHeading';

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

const defaultBullets = [
  'Atencion profesional con enfoque personalizado.',
  'Comunicacion clara sobre escenario, riesgos y alternativas.',
  'Seguimiento responsable de cada asunto encomendado.',
];

export default function LeadershipPreview({
  leaderName,
  eyebrow = 'Direccion profesional',
  title = 'Respaldo juridico con criterio tecnico y trato claro.',
  description = 'Atencion directa, explicacion clara y seguimiento responsable en cada etapa del caso.',
  bullets = defaultBullets,
}: {
  leaderName: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  bullets?: string[];
}) {
  return (
    <section className="section-shell bg-[color:rgba(232,225,215,0.55)]">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <SectionHeading
            description={description}
            eyebrow={eyebrow}
            title={title}
          />

          <div className="surface-card p-8">
            <div className="flex items-center gap-5">
              <div className="font-display flex size-20 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-3xl text-[color:var(--color-bg)]">
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
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
