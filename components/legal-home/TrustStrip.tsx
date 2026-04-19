const trustItems = [
  {
    title: 'Atención directa',
    description:
      'Cada consulta se aborda con análisis responsable y contacto profesional claro desde el inicio.',
  },
  {
    title: 'Confidencialidad',
    description:
      'El manejo de la información se realiza con criterio jurídico y reserva en cada etapa.',
  },
  {
    title: 'Criterio estratégico',
    description:
      'No se improvisan respuestas: se evalúa el escenario y se propone el camino más adecuado.',
  },
  {
    title: 'Comunicación clara',
    description:
      'Explicamos el proceso, sus alcances y próximos pasos sin tecnicismos innecesarios.',
  },
];

export default function TrustStrip() {
  return (
    <section className="section-tight">
      <div className="site-container">
        <div className="grid gap-4 lg:grid-cols-4">
          {trustItems.map((item) => (
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
