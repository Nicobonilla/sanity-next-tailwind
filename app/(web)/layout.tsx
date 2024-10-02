import "../globals.css";
import Navbar from "../../components/global/Navbar";

import { Inter } from "next/font/google";
import Footer from "@/components/global/Footer";

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
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
