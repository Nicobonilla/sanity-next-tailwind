import BannerWithItems from '@/components/shared/Component/BannerWithItems';
import Form from '@/components/shared/Form';

export { metadata, viewport } from 'next-sanity/studio';

export default function RootLayout({
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
