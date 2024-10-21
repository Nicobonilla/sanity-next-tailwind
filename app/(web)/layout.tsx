import '../globals.css';
import Navbar from '@/components/global/Navbar';

import { Inter, Montserrat } from 'next/font/google';
import FontHead from '@/components/global/FontHead';
import Footer from '@/components/global/Footer/FooterWP';
import { getServicesNavFetch } from '@/sanity/lib/fetch';
import type { Links, NavProps } from '@/types';
import { formatServices } from '@/components/formatServices';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export { metadata, viewport } from 'next-sanity/studio';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const servicesList = (await getServicesNavFetch()) || null;

  if (!servicesList) {
    return <div>Lista de servicios no encontrados</div>;
  }
  const formattedServices: Links[] = formatServices(servicesList);

  const navProps: NavProps = {
    links: [
      {
        id: '1',
        section: 'INICIO',
        href: { pathname: '/' },
      },
      {
        id: '2',
        section: 'SERVICIOS',
        href: { pathname: '/desarrollo-de-aplicaciones-web' },
        subsections: formattedServices, // Aquí usamos `formattedServices` que es un array de `Links`
      },
      {
        id: '5',
        section: 'RECURSOS',
        href: { pathname: '/debes-saber-abogado-familiar' },
      },
      {
        id: '6',
        section: 'CONTACTO',
        href: { pathname: '/contacto-abogado-familiar-san-felipe' },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <FontHead fonts={['montserrat']} />
      <body className="flex min-h-screen min-w-[320px] flex-col bg-gray-100 text-gray-900 dark:bg-body-dark dark:text-gray-200">
        <div className="z-50 h-24">
          <Navbar links={navProps.links} />
        </div>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
