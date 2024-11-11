import Form from '@/components/shared/Form';

export { metadata, viewport } from 'next-sanity/studio';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Form />
      <div className="max-w-screen-3xl w-full">{children}</div>
    </div>
  );
}
