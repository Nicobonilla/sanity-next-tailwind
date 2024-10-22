import '../globals.css';
import Navbar from '@/components/global/Navbar';

import { Inter, Montserrat } from 'next/font/google';
import FontHead from '@/components/global/FontHead';
import Footer from '@/components/global/Footer';
import { getServicesNavFetch } from '@/sanity/lib/fetch';
import type { Links, NavProps } from '@/types';
import { formatServices } from '@/components/pages/services/formatService';

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
  
  const formattedList = formatServices(servicesList);
  const navProps: NavProps = {
    links: [
      {
        id: '1',
        title: 'INICIO',
        slug: '/',
      },
      {
        id: '2',
        title: 'SERVICIOS',
        slug: '/desarrollo-de-aplicaciones-web',
        subsections: formattedList, // Aquí usamos `formattedServices` que es un array de `Links`
      },
      {
        id: '5',
        title: 'PRECIOS',
        slug: '/debes-saber-abogado-familiar',
      },
      {
        id: '6',
        title: 'CONTACTO',
        slug: '/contacto-abogado-familiar-san-felipe',
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
