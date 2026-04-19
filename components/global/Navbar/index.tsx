'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Route } from 'next';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import ContactDrawerButton from '@/components/global/ContactDrawerButton';
import Logo from '@/components/global/Logo';
import {
  trackNavClick,
  trackPracticeAreaClick,
} from '@/components/lib/GTMTrackers';
import { cn } from '@/lib/cn';
import {
  GetPagesNavQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';

type NavbarProps = {
  pages: GetPagesNavQueryResult;
  unitBusinessList: GetUnitBusinessListQueryResult;
  logo?: string | null;
  slogan?: string | null;
};

function normalizeHref(slug: string | null, isHome?: boolean | null): Route {
  if (isHome || slug === '' || slug === null) {
    return '/';
  }

  return `/${slug}` as Route;
}

function resolvePracticeHref(slug?: string | null): Route {
  return slug ? (`/area-de-practica/${slug}` as Route) : ('/#areas' as Route);
}

export default function Navbar({
  pages,
  unitBusinessList,
  logo,
  slogan,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const primaryPages = useMemo(
    () =>
      pages.filter(
        (page) =>
          page.showInNavbar !== false &&
          !['blog', 'services', 'area-de-practica', 'contacto'].includes(
            page.slug || ''
          )
      ),
    [pages]
  );

  const handleMobileContactOpen = () => {
    setMobileOpen(false);
    setPracticeOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setPracticeOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b bg-[color:rgba(245,242,236,0.92)] backdrop-blur-sm transition-all duration-300',
        hasScrolled
          ? 'border-[color:rgba(31,39,51,0.10)] shadow-[var(--shadow-soft)]'
          : 'border-transparent'
      )}
    >
      <div className="site-container">
        <div className="flex min-h-[86px] items-center justify-between gap-6 py-4">
          <Logo logo={logo} slogan={slogan} />

          <div className="hidden items-center gap-8 lg:flex">
            <nav aria-label="Principal">
              <ul className="flex items-center gap-7">
                {primaryPages.map((page) => {
                  const href = normalizeHref(page.slug, page.isHome);
                  const isActive = pathname === href;

                  return (
                    <li key={page.id}>
                      <Link
                        className={cn(
                          'font-body text-sm font-medium text-[color:var(--color-text-soft)] transition-colors duration-200 hover:text-[color:var(--color-primary)]',
                          isActive && 'text-[color:var(--color-primary)]'
                        )}
                        href={href}
                        onClick={() => trackNavClick(page.title || '', href)}
                      >
                        {page.title}
                      </Link>
                    </li>
                  );
                })}

                <li
                  className="relative"
                  onMouseEnter={() => setPracticeOpen(true)}
                  onMouseLeave={() => setPracticeOpen(false)}
                >
                  <button
                    aria-expanded={practiceOpen}
                    className="font-body inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-text-soft)] transition-colors duration-200 hover:text-[color:var(--color-primary)]"
                    onClick={() => setPracticeOpen((current) => !current)}
                    type="button"
                  >
                    Areas de practica
                    <ChevronDown
                      className={cn(
                        'size-4 transition-transform',
                        practiceOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {practiceOpen ? (
                    <div className="absolute left-0 top-full mt-4 w-[360px] rounded-lg border bg-[color:var(--color-surface)] p-3 shadow-[var(--shadow-soft)]">
                      <div className="grid gap-1">
                        {unitBusinessList.map((area) => (
                          <Link
                            className="rounded-md px-4 py-3 text-sm text-[color:var(--color-text-soft)] transition-colors duration-200 hover:bg-[color:rgba(30,42,56,0.04)] hover:text-[color:var(--color-primary)]"
                            href={resolvePracticeHref(area.slug)}
                            key={area.slug || area.title}
                            onClick={() =>
                              trackPracticeAreaClick(
                                area.slug || '',
                                area.title || '',
                                'navbar_desktop'
                              )
                            }
                          >
                            <span className="block font-semibold text-[color:var(--color-text)]">
                              {area.title}
                            </span>
                            <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[color:var(--color-text-soft)]">
                              {(area.services || []).length} servicios
                              vinculados
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>

                <li>
                  <Link
                    className={cn(
                      'font-body text-sm font-medium text-[color:var(--color-text-soft)] transition-colors duration-200 hover:text-[color:var(--color-primary)]',
                      pathname === '/blog' &&
                        'text-[color:var(--color-primary)]'
                    )}
                    href="/blog"
                    onClick={() => trackNavClick('Informate', '/blog')}
                  >
                    Informate
                  </Link>
                </li>
              </ul>
            </nav>

            <ContactDrawerButton source="navbar_desktop">
              Solicitar orientacion
            </ContactDrawerButton>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ContactDrawerButton
              className="min-h-[44px] px-4 text-sm"
              source="navbar_mobile_top"
              variant="secondary"
            >
              Contacto
            </ContactDrawerButton>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={mobileOpen}
              className="inline-flex size-11 items-center justify-center rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-primary)]"
              onClick={() => setMobileOpen((current) => !current)}
              type="button"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!mobileOpen}
        className={cn(
          'fixed inset-0 bg-[color:rgba(31,39,51,0.36)] transition-opacity duration-200 lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-[100dvh] w-full max-w-[380px] overflow-y-auto border-l bg-[color:var(--color-surface)] p-6 transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        id="mobile-navigation"
      >
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <p className="legal-kicker">Navegacion</p>
            <nav aria-label="Navegacion movil">
              <ul className="space-y-2">
                {primaryPages.map((page) => {
                  const href = normalizeHref(page.slug, page.isHome);

                  return (
                    <li key={page.id}>
                      <Link
                        className={cn(
                          'block rounded-md px-4 py-3 text-base font-medium text-[color:var(--color-text)] transition-colors duration-200 hover:bg-[color:rgba(30,42,56,0.04)]',
                          pathname === href &&
                            'bg-[color:rgba(30,42,56,0.06)] text-[color:var(--color-primary)]'
                        )}
                        href={href}
                        onClick={() => trackNavClick(page.title || '', href)}
                      >
                        {page.title}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    className={cn(
                      'block rounded-md px-4 py-3 text-base font-medium text-[color:var(--color-text)] transition-colors duration-200 hover:bg-[color:rgba(30,42,56,0.04)]',
                      pathname === '/blog' &&
                        'bg-[color:rgba(30,42,56,0.06)] text-[color:var(--color-primary)]'
                    )}
                    href="/blog"
                    onClick={() => trackNavClick('Informate', '/blog')}
                  >
                    Informate
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <button
              className="flex w-full items-center justify-between rounded-md border border-[color:var(--color-border)] px-4 py-3 text-left text-base font-semibold text-[color:var(--color-primary)]"
              onClick={() => setPracticeOpen((current) => !current)}
              type="button"
            >
              <span>Areas de practica</span>
              <ChevronDown
                className={cn(
                  'size-4 transition-transform',
                  practiceOpen && 'rotate-180'
                )}
              />
            </button>

            {practiceOpen ? (
              <div className="space-y-2">
                {unitBusinessList.map((area) => (
                  <Link
                    className="block rounded-md px-4 py-3 text-sm text-[color:var(--color-text-soft)] transition-colors duration-200 hover:bg-[color:rgba(30,42,56,0.04)] hover:text-[color:var(--color-primary)]"
                    href={resolvePracticeHref(area.slug)}
                    key={area.slug || area.title}
                    onClick={() =>
                      trackPracticeAreaClick(
                        area.slug || '',
                        area.title || '',
                        'navbar_mobile'
                      )
                    }
                  >
                    <span className="block font-semibold text-[color:var(--color-text)]">
                      {area.title}
                    </span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[color:var(--color-text-soft)]">
                      {(area.services || []).length} servicios
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <ContactDrawerButton
            className="w-full justify-center"
            onOpen={handleMobileContactOpen}
            source="navbar_mobile_drawer"
          >
            Solicitar orientacion
          </ContactDrawerButton>
        </div>
      </div>
    </header>
  );
}
