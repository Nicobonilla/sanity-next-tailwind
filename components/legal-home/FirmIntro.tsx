import SectionHeading from './SectionHeading';

type IntroCard = {
  label: string;
  value: string;
};

const defaultCards: IntroCard[] = [
  {
    label: 'Como trabajamos',
    value: 'Escucha, analisis y acompanamiento.',
  },
  {
    label: 'Que priorizamos',
    value: 'Claridad, seriedad y decisiones bien fundamentadas.',
  },
];

const defaultParagraphs = [
  'Cada asunto se revisa con estudio, orden y comunicacion clara. La prioridad es que la persona entienda su problema, conozca sus alternativas y sepa que pasos corresponde seguir.',
  'Trabajamos con atencion directa, criterio profesional y una forma de trato responsable que permita avanzar con tranquilidad.',
];

export default function FirmIntro({
  eyebrow = 'Quienes somos',
  title = 'Asesoria juridica seria, cercana y bien fundamentada en San Felipe.',
  description = 'Atendemos personas y empresas que necesitan entender su situacion, ordenar sus antecedentes y avanzar con respaldo juridico claro.',
  paragraphs = defaultParagraphs,
  cards = defaultCards,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  paragraphs?: string[];
  cards?: IntroCard[];
}) {
  return (
    <section className="section-shell bg-[color:rgba(255,255,255,0.5)]">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionHeading
            description={description}
            eyebrow={eyebrow}
            title={title}
          />

          <div className="flex flex-col gap-6">
            {paragraphs.map((paragraph) => (
              <p className="section-copy max-w-none" key={paragraph}>
                {paragraph}
              </p>
            ))}

            <div className="grid gap-4 md:grid-cols-2">
              {cards.map((card) => (
                <div className="surface-card p-6" key={card.label}>
                  <p className="legal-kicker">{card.label}</p>
                  <p className="mt-3 text-xl font-semibold text-[color:var(--color-primary)]">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
