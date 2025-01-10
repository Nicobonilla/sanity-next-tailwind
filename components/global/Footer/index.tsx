'use client';
import { ScrollContextProvider } from '@/context/ScrollContext';
import FooterWP from './FooterWP/index.jsx';
import Simple from './Simple';
export default function Footer() {
  return (
    <>
      <ScrollContextProvider>
        <Simple />
        {/*<div className="flex items-center justify-center bg-bodydark text-white lg:p-2">
          Powered
        </div> */}
      </ScrollContextProvider>
    </>
  );
}
