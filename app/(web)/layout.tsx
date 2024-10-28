import '../globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import { getPagesFetch, getServicesNavFetch } from '@/sanity/lib/fetch';
import { formatService, formatPages } from '@/components/pages/services/format';
import DarkModeScript from '@/components/global/Navbar/ThemeToggle/DarkModeScript';
import Head from 'next/head';
import { GoogleTagManager } from '@next/third-parties/google';
import GTMGlobals from '@/components/lib/GTMGlobals';
import type { Links } from '@/types';
import {
  inter,
  robotoFlex,
  crimsonPro,
  montserrat,
  robotoMono,
} from '@/components/global/fonts';
import {
  GetPagesQueryResult,
  GetServiceDetailQueryResult,
  GetServicesNavQueryResult,
} from '@/sanity.types';

export { metadata, viewport } from 'next-sanity/studio';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch data for pages and services
  const pages: GetPagesQueryResult | null = await getPagesFetch();
  const servicesList: GetServicesNavQueryResult | null =
    await getServicesNavFetch();

  // Handle cases where data is not available
  if (!pages) {
    return <div>Lista de páginas no encontrada</div>;
  }

  if (!servicesList) {
    return <div>Lista de servicios no encontrada</div>;
  }

  // Format pages and services data
  let pagesLink: Links[] = formatPages(pages);

  // Filtrar páginas y ordenarlas
  pagesLink = pagesLink.map((page) => {
    if (page && page.title && page.title.toLowerCase() === 'servicios') {
      return {
        ...page,
        subsections: formatService(servicesList),
      };
    }
    return page;
  });

  pagesLink = pagesLink
    .filter((page): page is Links => !!page && page.position != null)
    .sort((a, b) => a?.position! - b?.position!); // Aserción no nula

  console.log(pagesLink);

  return (
    <html
      lang="es"
      className={`${inter.variable} ${robotoFlex.variable} ${crimsonPro.variable} ${montserrat.variable} ${robotoMono.variable} scroll-smooth`}
    >
      <Head>
        <DarkModeScript />
      </Head>
      {/* Uncomment the following lines if Google Tag Manager is used */}
      <GTMGlobals />
      <GoogleTagManager gtmId={process.env.GTM || ''} />
      <body className="flex min-h-screen min-w-[320px] flex-col">
        <div className="z-50 h-24">
          <Navbar links={pagesLink || null} />
        </div>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
