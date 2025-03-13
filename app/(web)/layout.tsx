import '../globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { type SanityContextType } from '@/context/SanityContext';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { fonts } from '@/components/global/fonts';
import DisableDraftMode from '@/components/global/DisableDraftMode';
import ErrorBoundary from '@/components/ErrorBoundary';
import Providers from '@/context/Providers';
import { getPagesNavFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import WhatsappSticky from '@/components/global/WhatsappSticky';
import ContactForm from '@/components/global/ContactForm';
import { type Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
//import { GoogleTagManager } from '@next/third-parties/google';
//import GTMGlobals from '@/components/lib/GTMGlobals';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  const { settings } = data;
  return {
    metadataBase: new URL(
      `https://${process.env.NODE_ENV == 'development'
        ? 'localhost:3000'
        : settings?.metaBaseWebsite
      }`
    ), // URL base
    title: {
      template: '%s ' + settings?.templateTitle,
      default: settings?.templateTitle || '',
    },
    generator: 'Next.js',
    keywords: [
      'abogados San Felipe',
      'bufete de abogados San Felipe',
      'asesoría legal San Felipe',
      'servicios jurídicos San Felipe',
      'consulta legal San Felipe',
      'abogados de familia San Felipe',
      'derecho inmobiliario San Felipe',
      'contratos de arrendamiento San Felipe',
      'compraventa de inmuebles San Felipe',
      'herencias y testamentos San Felipe',
    ],
    description: settings?.description || '',
    publisher: 'Vercel',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/icon',
      apple: '/apple-icon',
      other: [
        { rel: 'icon', url: '/icon-192', sizes: '192x192' },
        { rel: 'icon', url: '/icon-512', sizes: '512x512' },
      ],
    },
    openGraph: {
      title: settings?.title || '',
      images: resolveOpenGraphImage(settings?.ogImage) || '',
      type: 'website',
    },
  };
}

// Async function to fetch data
async function getData(): Promise<SanityContextType> {
  try {
    const [pages, unitBusinessList, settings] =
      await Promise.all([
        getPagesNavFetch(),
        getUnitBusinessListFetch(),
        getSettingsFetch(),
      ]);
    if (!pages) throw new Error('Failed to fetch pages');
    if (!unitBusinessList) throw new Error('Failed to fetch unit business');
    if (!settings) throw new Error('Failed to fetch settings');
    return { pages, unitBusinessList, settings };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch necessary data for the application');
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { pages, unitBusinessList, settings } =
      await getData();
    if (!pages || !unitBusinessList || !settings) {
      throw new Error('Essential data is missing');
    }

    const initialData: SanityContextType = {
      pages,
      unitBusinessList,
      settings,
    };

    const { isEnabled } = draftMode();

    return (
      <html
        lang="es"
        className={`${Object.values(fonts)
          .map((font) => font.variable)
          .join(' ')} scroll-smooth`}
      >
        <head>
        </head>
        {/*<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
        <GTMGlobals />*/}

        <body className="min-h-screen min-w-[320px] flex-col">
          <ErrorBoundary>
            <Providers initialData={initialData} >
              <Navbar />
              <main className="grow flex-col">
                {children}
                <SpeedInsights />
                <ContactForm />

                <WhatsappSticky />
                {process.env.NODE_ENV === 'development' && <SanityLive />}

                {isEnabled && process.env.NODE_ENV === 'development' && (
                  <>
                    <DisableDraftMode />
                    <VisualEditing />
                  </>
                )}
              </main>
              <Footer />
            </Providers>
          </ErrorBoundary>
        </body>
      </html>
    );
  } catch (error) {
    console.error('Error in RootLayout:', error);
    return (
      <html lang="es">
        <body>
          <div className="error-message">
            An error occurred while loading the application. Please try again
            later.
          </div>
        </body>
      </html>
    );
  }
}
