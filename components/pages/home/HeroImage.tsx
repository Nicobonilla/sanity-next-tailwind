import Image from 'next/image';

export function HeroImage() {
  const imageUrl = '/meeting.jpeg';

  return (
    <div className="relative h-[70vh] w-full">
      <Image
        src={imageUrl}
        alt={'Home page image'}
        className="size-full object-cover object-top"
        quality={100}
        fill
      />
      <div className="layer bg-lay/90"></div>
      <div className="layer layer1 z-10 bg-gray-100 dark:bg-body-dark"></div>
      <div className="layer layer2 bg-gray-100/70 dark:bg-body-dark/60"></div>
      <div className="layer layer3 bg-gray-100/40 dark:bg-body-dark/40"></div>

      <div className="layer flex items-center justify-center">
        <div className="align-left relative z-20 mx-10 flex h-1/2 flex-col justify-center md:w-1/2">
          <h1 className="h1 text-4xl font-extrabold text-white md:text-5xl">
            UNIVERSO DIGITAL
          </h1>
          <h2 className="mt-5 font-mono text-sm font-thin leading-5 text-white md:text-xl lg:text-2xl">
            Creamos tu Sitio Web o Tienda Virtual. Somos tu Partner Tecnológico.
          </h2>
          <button className="mt-5 flex max-w-[250px] items-center justify-center rounded border-2 border-second-400 py-2 font-light text-white hover:border-0 hover:bg-white/30 hover:font-bold">
            SEGUIR
          </button>
        </div>
      </div>
    </div>
  );
}
