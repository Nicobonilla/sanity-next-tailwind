import Form from '@/components/shared/Form';

export { metadata, viewport } from 'next-sanity/studio';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="container mx-auto max-w-screen-xl px-5 py-8 md:px-10">
        {children}
      </div>
    </div>
  );
}
