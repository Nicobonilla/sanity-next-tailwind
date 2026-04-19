import SectionHeading from './SectionHeading';

const steps = [
  {
    step: '01',
    title: 'Escuchamos y entendemos el caso',
    description:
      'La primera etapa es comprender el contexto, los antecedentes y el objetivo real de quien consulta.',
  },
  {
    step: '02',
    title: 'Evaluamos jurídicamente el escenario',
    description:
      'Se revisan alternativas, riesgos y alcances para proponer un camino serio y bien fundamentado.',
  },
  {
    step: '03',
    title: 'Acompañamos con claridad durante el proceso',
    description:
      'La relación profesional se sostiene con seguimiento, orden y comunicación clara en cada etapa.',
  },
];

export default function ProcessSteps() {
  return (
    <section className="section-shell">
      <div className="site-container">
        <SectionHeading
          align="center"
          description="La confianza también depende de saber cómo trabaja el estudio. Un proceso claro reduce incertidumbre y transmite control profesional."
          eyebrow="Metodología"
          title="Una atención jurídica ordenada, comprensible y orientada a decisiones responsables."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((item) => (
            <article className="surface-card p-7" key={item.step}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">
                {item.step}
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-[color:var(--color-primary)]">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--color-text-soft)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
