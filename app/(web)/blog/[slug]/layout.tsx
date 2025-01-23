export { metadata, viewport } from 'next-sanity/studio';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
