import "../globals.css";
import Navbar from "@/components/global/Navbar";

import { Inter } from "next/font/google";
import Footer from "@/components/global/Footer";
import { links } from "@/sanity/lib/fetchMockData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export { metadata, viewport } from "next-sanity/studio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="flex flex-col min-h-screen min-w-[320px] bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        <div className="h-24 z-50">
          <Navbar links={links} />
        </div>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
