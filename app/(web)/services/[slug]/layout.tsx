import Form from "@/components/shared/Form";

export { metadata, viewport } from "next-sanity/studio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="">
        <Form />
      </div>
      <div>{children}</div>

    </div>
  );
}
