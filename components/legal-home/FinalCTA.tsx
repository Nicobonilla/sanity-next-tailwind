import ContactDrawerButton from '@/components/global/ContactDrawerButton';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';

export default function FinalCTA() {
  return (
    <section className="section-shell" id="contacto">
      <div className="site-container">
        <div className="rounded-lg bg-[color:var(--color-primary)] px-6 py-10 text-[color:var(--color-bg)] md:px-10 md:py-12 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div className="flex flex-col gap-5">
              <span className="text-sm uppercase tracking-[0.2em] text-[color:rgba(245,242,236,0.72)]">
                Contacto
              </span>
              <h2 className="font-display text-4xl leading-tight text-[color:var(--color-bg)] md:text-5xl">
                Si necesita orientacion juridica, podemos revisar su caso y
                proponer el camino adecuado con seriedad y confidencialidad.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[color:rgba(245,242,236,0.76)]">
                Puede escribirnos, llamarnos o solicitar una primera
                orientacion. La prioridad es entender el asunto y dar una
                respuesta profesional clara.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ContactDrawerButton className="border-[color:var(--color-bg)] bg-[color:var(--color-bg)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-primary)]">
                  Solicitar orientacion
                </ContactDrawerButton>
                <Button
                  asChild
                  className="border-[color:rgba(245,242,236,0.4)] text-[color:var(--color-bg)] hover:bg-[color:rgba(255,255,255,0.08)] hover:text-[color:var(--color-bg)]"
                  variant="secondary"
                >
                  <a href={siteConfig.phoneHref}>Llamar ahora</a>
                </Button>
              </div>
            </div>

            <div className="surface-panel border-white/20 bg-[color:rgba(255,255,255,0.08)] p-6">
              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:rgba(245,242,236,0.65)]">
                    Telefono
                  </p>
                  <a
                    className="mt-2 block text-2xl font-semibold text-[color:var(--color-bg)]"
                    href={siteConfig.phoneHref}
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:rgba(245,242,236,0.65)]">
                    Correo
                  </p>
                  <a
                    className="mt-2 block text-lg text-[color:var(--color-bg)]"
                    href={siteConfig.emailHref}
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:rgba(245,242,236,0.65)]">
                    Ubicacion
                  </p>
                  <p className="mt-2 text-lg text-[color:var(--color-bg)]">
                    {siteConfig.addressLine}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
