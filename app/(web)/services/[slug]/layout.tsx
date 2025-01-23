import Form from '@/components/global/Form';

export { metadata, viewport } from 'next-sanity/studio';

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="max-w-screen-3xl w-full">{children}</div>
      <Form />
    </div>
  );
}
