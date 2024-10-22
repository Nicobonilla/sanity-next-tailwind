'use client';
import FooterWP from './FooterWP/WPlike.tsx';
import Simple from './Simple';
export default function Footer() {
  return (
    <>
      <Simple />
      <div className="bg-body-dark flex items-center justify-center text-white lg:p-2">
        Powered
      </div>
    </>
  );
}
