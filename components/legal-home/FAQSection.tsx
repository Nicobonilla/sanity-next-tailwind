import SectionHeading from './SectionHeading';

const faqs = [
  {
    question: '¿Puedo realizar una primera consulta antes de iniciar un proceso?',
    answer:
      'Sí. El objetivo de una primera conversación es revisar el contexto del asunto, aclarar expectativas y evaluar la forma más adecuada de abordarlo.',
  },
  {
    question: '¿La información entregada se maneja con confidencialidad?',
    answer:
      'Sí. El tratamiento de antecedentes y documentación se realiza con criterio profesional y reserva, desde el primer contacto.',
  },
  {
    question: '¿Atienden asuntos de personas y también de empresas?',
    answer:
      'Sí. El estudio puede acompañar tanto necesidades jurídicas personales como asuntos corporativos que requieran análisis y representación profesional.',
  },
  {
    question: '¿Es posible coordinar atención a distancia?',
    answer:
      'Sí. Dependiendo del caso, se puede coordinar una primera orientación por medios remotos y luego definir los pasos siguientes.',
  },
];

export default function FAQSection() {
  return (
    <section className="section-shell bg-[color:rgba(255,255,255,0.55)]">
      <div className="site-container">
        <SectionHeading
          description="Una buena experiencia jurídica también resuelve dudas básicas antes de que el cliente tome contacto."
          eyebrow="Preguntas frecuentes"
          title="Información simple para reducir incertidumbre y facilitar el primer paso."
        />

        <div className="mt-10 grid gap-4">
          {faqs.map((faq) => (
            <details className="surface-card group p-6" key={faq.question}>
              <summary className="cursor-pointer list-none pr-8 text-xl font-semibold text-[color:var(--color-primary)] marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 max-w-4xl text-base leading-7 text-[color:var(--color-text-soft)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
