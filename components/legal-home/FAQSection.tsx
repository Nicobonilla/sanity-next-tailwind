import SectionHeading from './SectionHeading';
import TrackedFaqDisclosure from '@/components/content/TrackedFaqDisclosure';
import { buildFaqJsonLd } from '@/lib/structured-data';

type FaqItem = {
  question: string;
  answer: string;
};

const defaultFaqs: FaqItem[] = [
  {
    question: 'Puedo realizar una primera consulta antes de iniciar un proceso?',
    answer:
      'Si. El objetivo de una primera conversacion es revisar el contexto del asunto, aclarar expectativas y evaluar la forma mas adecuada de abordarlo.',
  },
  {
    question: 'La informacion entregada se maneja con confidencialidad?',
    answer:
      'Si. El tratamiento de antecedentes y documentacion se realiza con criterio profesional y reserva, desde el primer contacto.',
  },
  {
    question: 'Atienden asuntos de personas y tambien de empresas?',
    answer:
      'Si. El estudio puede acompanar tanto necesidades juridicas personales como asuntos corporativos que requieran analisis y representacion profesional.',
  },
  {
    question: 'Es posible coordinar atencion a distancia?',
    answer:
      'Si. Dependiendo del caso, se puede coordinar una primera orientacion por medios remotos y luego definir los pasos siguientes.',
  },
];

export default function FAQSection({
  eyebrow = 'Preguntas frecuentes',
  title = 'Informacion simple para dar mas claridad desde el primer paso.',
  description = 'Respuestas claras a dudas habituales antes de tomar contacto con el estudio.',
  items = defaultFaqs,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: FaqItem[];
}) {
  const faqJsonLd = buildFaqJsonLd(items);

  return (
    <section className="section-shell bg-[color:rgba(255,255,255,0.55)]">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        type="application/ld+json"
      />
      <div className="site-container">
        <SectionHeading
          description={description}
          eyebrow={eyebrow}
          title={title}
        />

        <div className="mt-10 grid gap-4">
          {items.map((faq) => (
            <TrackedFaqDisclosure
              answer={faq.answer}
              answerClassName="mt-4 max-w-4xl text-base leading-7 text-[color:var(--color-text-soft)]"
              className="surface-card group p-6"
              key={faq.question}
              question={faq.question}
              source="home_faq"
              summaryClassName="cursor-pointer list-none pr-8 text-xl font-semibold text-[color:var(--color-primary)] marker:hidden"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
