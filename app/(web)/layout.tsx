import '../globals.css';
import Navbar from '@/components/global/Navbar';

import Footer from '@/components/global/Footer';
import { getServicesNavFetch } from '@/sanity/lib/fetch';
import type { NavProps } from '@/types';
import { formatServices } from '@/components/pages/services/formatService';
import DarkModeScript from '@/components/global/Navbar/ThemeToggle/DarkModeScript';
import Head from 'next/head';
import {
  inter,
  robotoFlex,
  crimsonPro,
  montserrat,
  robotoMono,
} from '@/components/global/fonts';

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
        slug: '/services',
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
    <html
      lang="es"
      className={`${inter.variable} ${robotoFlex.variable} ${crimsonPro.variable} ${montserrat.variable} ${robotoMono.variable} scroll-smooth`}
    >
      <Head>
        <DarkModeScript />
      </Head>
      <body className="dark:bg-bodydark flex min-h-screen min-w-[320px] flex-col bg-gray-100 text-gray-900 dark:text-gray-200">
        <div className="z-50 h-24">
          <Navbar links={navProps.links} />
        </div>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
