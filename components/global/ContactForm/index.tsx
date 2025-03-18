import { Suspense } from "react";
import { ContactFormSkeleton } from "./ContactFormSkeleton";
import dynamic from "next/dynamic";
import type { NavbarProps } from "../Navbar";

const LazyContactFormClient = dynamic(() => import("./ContactFormClient"), { ssr: false });

export default function ContactForm({ logo, slogan }: Omit<NavbarProps, 'pages' | 'unitBusinessList'>) {
  return (
    <>
      <Suspense fallback={<ContactFormSkeleton />}>
        <LazyContactFormClient logo={logo} slogan={slogan} />
      </Suspense>
    </>
  )
}