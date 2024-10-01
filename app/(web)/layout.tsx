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
    <html lang="en" className={inter.variable}>
      <body className="">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
