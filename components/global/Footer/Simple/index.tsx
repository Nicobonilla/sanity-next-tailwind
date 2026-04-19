import Link from 'next/link';

import Logo from '@/components/global/Logo';
import { siteConfig } from '@/lib/site-config';
import { GetPagesNavQueryResult } from '@/sanity.types';

export default function Simple({
  logo,
  slogan,
  pages,
}: {
  logo?: string | null;
  slogan?: string | null;
  pages: GetPagesNavQueryResult;
}) {
  const footerPages = pages.filter(
    (page) => page.slug !== 'services' && page.slug !== 'blog'
  );

  return (
    <footer className="border-t border-[color:rgba(31,39,51,0.08)] bg-[color:var(--color-primary)] py-14 text-[color:var(--color-bg)]">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.9fr)]">
          <div className="space-y-5">
            <Logo align="left" invert logo={logo} slogan={slogan} />
            <p className="max-w-md text-base leading-7 text-[color:rgba(245,242,236,0.75)]">
              Asesoria legal y judicial para personas y empresas en San Felipe,
              con una practica orientada a la claridad, la responsabilidad y el
              acompanamiento profesional en cada etapa.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[color:rgba(245,242,236,0.62)]">
              Navegacion
            </p>
            <ul className="mt-5 space-y-3">
              {footerPages.map((page) => (
                <li key={page.id}>
                  <Link
                    className="text-base text-[color:var(--color-bg)] transition-colors duration-200 hover:text-[color:var(--color-surface-muted)]"
                    href={page.isHome ? '/' : `/${page.slug}`}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="text-base text-[color:var(--color-bg)] transition-colors duration-200 hover:text-[color:var(--color-surface-muted)]"
                  href="/blog"
                >
                  Informate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[color:rgba(245,242,236,0.62)]">
              Contacto
            </p>
            <div className="mt-5 space-y-4 text-base leading-7 text-[color:rgba(245,242,236,0.82)]">
              <a
                className="block transition-colors duration-200 hover:text-[color:var(--color-bg)]"
                href={siteConfig.phoneHref}
              >
                {siteConfig.phoneDisplay}
              </a>
              <a
                className="block transition-colors duration-200 hover:text-[color:var(--color-bg)]"
                href={siteConfig.emailHref}
              >
                {siteConfig.email}
              </a>
              <p>{siteConfig.addressLine}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[color:rgba(245,242,236,0.12)] pt-6 text-sm text-[color:rgba(245,242,236,0.6)]">
          {new Date().getFullYear()} {siteConfig.firmName}. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
