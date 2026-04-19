import Simple from './Simple';
export default function Footer({
  logo,
  slogan,
}: {
  logo?: string | null;
  slogan?: string | null;
}) {
  return (
    <>
      <Simple logo={logo} slogan={slogan} />
      {/*<div className="flex items-center justify-center bg-bodydark text-white lg:p-2">
        Powered
      </div> */}
    </>
  );
}
