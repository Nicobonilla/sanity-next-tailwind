import '../globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import {
  getComponentListFetch,
  getPagesNavFetch,
  getServicesNavFetch,
} from '@/sanity/lib/fetch';
import { formatPages } from '@/components/pages/services/format';
import DarkModeScript from '@/components/global/Navbar/ThemeToggle/DarkModeScript';
import { GoogleTagManager } from '@next/third-parties/google';
import GTMGlobals from '@/components/lib/GTMGlobals';
import type { Links } from '@/types';
import { fonts } from '@/components/global/fonts';
import { AppContextProvider } from '@/context/AppContext';
import {
  GetComponentListQueryResult,
  GetPagesNavQueryResult,
  GetServicesNavQueryResult,
} from '@/sanity.types';
import { transformToDict } from '@/components/utils';
import { ScrollContextProvider } from '@/context/ScrollContext';
export { metadata, viewport } from 'next-sanity/studio';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch data for pages and services
  const pages: GetPagesNavQueryResult | null = await getPagesNavFetch();
  const servicesList: GetServicesNavQueryResult | null =
    await getServicesNavFetch();
  const componentList: GetComponentListQueryResult | null =
    await getComponentListFetch();

  if (!pages) {
    return <div>Lista de páginas no encontrada</div>;
  }

  if (!servicesList) {
    return <div>Lista de servicios no encontrada</div>;
  }
  const initialData = {
    componentsMap: transformToDict(componentList), // Add your component data here
    pagesLink: formatPages(pages, servicesList) as Links[], // Pass pagesLink to context as initial data
  };
  // Pass pagesLink to AppContextProvider as part of the initialData
  return (
    <html
      lang="es"
      className={`${Object.values(fonts)
        .map((font) => font.variable)
        .join(' ')} scroll-smooth`}
    >
      <head>
        <DarkModeScript />
      </head>
      <GTMGlobals />
      <GoogleTagManager gtmId={process.env.GTM || ''} />
      <body className="flex min-h-screen min-w-[320px] flex-col">
        <AppContextProvider initialData={initialData}>
          <ScrollContextProvider>
            <Navbar />
          </ScrollContextProvider>
          <main className="grow flex-col">
            {children}
          </main>
          <ScrollContextProvider>
            <Footer />
          </ScrollContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
