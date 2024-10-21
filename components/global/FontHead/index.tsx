import Head from 'next/head';

interface FontHeadProps {
  fonts: string[]; // Lista de fuentes que se desea cargar
}

const FontHead: React.FC<FontHeadProps> = () => {
  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default FontHead;
