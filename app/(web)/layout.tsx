import "../globals.css";
import Navbar from "@/components/global/Navbar";

import { Inter } from "next/font/google";
import Footer from "@/components/global/Footer";
import { getServicesNavFetch } from "@/sanity/lib/fetch";
import type { Links, NavProps } from '@/types'
import { formatServices } from "@/components/formatServices";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export { metadata, viewport } from "next-sanity/studio";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const servicesList = await getServicesNavFetch() || null;

  if (!servicesList) {
    return <div>Lista de servicios no encontrados</div>
  }
  const formattedServices: Links[] = formatServices(servicesList);
  
  const navProps: NavProps  = {
    links: [
      {
        id: '1',
        section: "INICIO",
        href: { pathname: "/abogado-familiar" },
        subsections: [{ id: '1', section: "H1", href: { pathname: "/H1" } }],
      },
      {
        id: '2',
        section: "SERVICIOS",
        href: { pathname: "/servicios-legales" },
        subsections: formattedServices, // Aquí usamos `formattedServices` que es un array de `Links`
      },
      {
        id: '5',
        section: "RECURSOS",
        href: { pathname: "/debes-saber-abogado-familiar" },
      },
      {
        id: '6',
        section: "CONTACTO",
        href: { pathname: "/contacto-abogado-familiar-san-felipe" },
      },
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="flex flex-col min-h-screen min-w-[320px] 
      bg-gray-50 text-gray-900 
      dark:bg-slate-900 dark:text-gray-400">
        <div className="h-24 z-50">
          <Navbar links={ navProps.links } />
        </div>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
