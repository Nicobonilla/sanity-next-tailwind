type TrustItem = {
  title: string;
  description: string;
};

const defaultTrustItems: TrustItem[] = [
  {
    title: 'Atencion directa',
    description:
      'Cada consulta se aborda con analisis responsable y contacto profesional claro desde el inicio.',
  },
  {
    title: 'Confidencialidad',
    description:
      'El manejo de la informacion se realiza con criterio juridico y reserva en cada etapa.',
  },
  {
    title: 'Criterio estrategico',
    description:
      'Se revisa el escenario, sus riesgos y el camino mas adecuado antes de avanzar.',
  },
  {
    title: 'Comunicacion clara',
    description:
      'Explicamos el proceso, sus alcances y proximos pasos sin tecnicismos innecesarios.',
  },
];

export default function TrustStrip({
  items = defaultTrustItems,
}: {
  items?: TrustItem[];
}) {
  return (
    <section className="section-tight">
      <div className="site-container">
        <div className="grid gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <article className="trust-item" key={item.title}>
              <p className="legal-kicker">{item.title}</p>
              <p className="text-base leading-7 text-[color:var(--color-text-soft)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
