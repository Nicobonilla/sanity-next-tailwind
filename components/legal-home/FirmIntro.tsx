import SectionHeading from './SectionHeading';

export default function FirmIntro() {
  return (
    <section className="section-shell bg-[color:rgba(255,255,255,0.5)]">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionHeading
            description={
              <>
                Una web jurídica confiable no necesita exagerar. Necesita
                transmitir orden, criterio y una forma profesional de trabajar.
              </>
            }
            eyebrow="Quiénes somos"
            title="Un estudio orientado a resolver asuntos legales con rigor, cercanía y claridad."
          />

          <div className="flex flex-col gap-6">
            <p className="section-copy max-w-none">
              Nuestro enfoque combina análisis técnico, atención responsable y
              comunicación clara. Buscamos que cada persona sepa qué está
              ocurriendo, qué alternativas existen y qué pasos corresponde dar.
            </p>
            <p className="section-copy max-w-none">
              La confianza en un estudio jurídico no se construye con promesas
              grandilocuentes, sino con una práctica sobria, ordenada y
              consistente. Esa es la experiencia que esta web debe reflejar.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="surface-card p-6">
                <p className="legal-kicker">Cómo trabajamos</p>
                <p className="mt-3 text-xl font-semibold text-[color:var(--color-primary)]">
                  Escucha, análisis y acompañamiento.
                </p>
              </div>
              <div className="surface-card p-6">
                <p className="legal-kicker">Qué priorizamos</p>
                <p className="mt-3 text-xl font-semibold text-[color:var(--color-primary)]">
                  Claridad, seriedad y decisiones bien fundamentadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
