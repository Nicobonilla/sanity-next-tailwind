// app/layout.tsx

import '../globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import { getComponentListFetch, getPagesNavFetch, getServicesNavFetch } from '@/sanity/lib/fetch';
import { formatPages } from '@/components/pages/services/format';
import DarkModeScript from '@/components/global/Navbar/ThemeToggle/DarkModeScript';
import { GoogleTagManager } from '@next/third-parties/google';
import GTMGlobals from '@/components/lib/GTMGlobals';
import { AppContextProvider } from '@/context/AppContext';
import { ScrollContextProvider } from '@/context/ScrollContext';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { transformToDict } from '@/components/utils';
import { fonts } from '@/components/global/fonts';
import type { Links } from '@/types';
import {
  GetComponentListQueryResult,
  GetPagesNavQueryResult,
  GetServicesNavQueryResult,
} from '@/sanity.types';

async function getData() {
  const pages: GetPagesNavQueryResult | null = await getPagesNavFetch();
  const servicesList: GetServicesNavQueryResult | null = await getServicesNavFetch();
  const componentList: GetComponentListQueryResult | null = await getComponentListFetch();
  return {
    pages,
    servicesList,
    componentList,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetching data for the layout (pages, services, and components)
  const { pages, servicesList, componentList } = await getData();
  
  // Error handling if no data is returned
  if (!pages || !servicesList) {
    return (
      <div className="error-message">
        { !pages && "Lista de páginas no encontrada" }
        { !servicesList && "Lista de servicios no encontrada" }
      </div>
    );
  }

  // Prepare the initial data for context
  const initialData = {
    componentsMap: transformToDict(componentList) as Record<string, string | null>,
    pagesLink: formatPages(pages, servicesList) as Links[],
  };

  // Check if draft mode is enabled (for content editing features)
  const isDraftMode = await draftMode();

  return (
    <html lang="es" className={`${Object.values(fonts).map((font) => font.variable).join(' ')} scroll-smooth`}>
      <head>
        <DarkModeScript />
      </head>
      <GTMGlobals />
      <GoogleTagManager gtmId={process.env.GTM || ''} />
      <body className="flex min-h-screen min-w-[320px] flex-col">
        {/* Global context providers */}
        <AppContextProvider initialData={initialData}>
          <ScrollContextProvider>
            {/* Navbar */}
            <Navbar />
          </ScrollContextProvider>

          <main className="grow flex-col">
            {/* Render children (the content of the page) */}
            {children}

            {/* Live Content Editing */}
            <SanityLive />
            {isDraftMode.isEnabled && <VisualEditing />}
          </main>

          <ScrollContextProvider>
            {/* Footer */}
            <Footer />
          </ScrollContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
