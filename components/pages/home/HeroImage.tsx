import Image from "next/image";

export function HeroImage() {
  const imageUrl = '/meeting.jpeg'

  return (
    <div className="relative w-full h-[70vh]">
      <Image
        src={imageUrl}
        alt={"Home page image"}
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        objectPosition="top"
      />
      <div className="layer bg-lay/90"></div>
      <div className="layer layer1 bg-gray-100 z-10"></div>
      <div className="layer layer2 bg-gray-100/70"></div>
      <div className="layer layer3 bg-gray-100/40"></div>

      <div className="layer flex items-center justify-center">
        <div className="relative justify-center align-left 
        flex flex-col mx-10
        md:w-1/2 h-1/2 z-20">
          <h1 className="text-4xl font-extrabold text-white">UNIVERSO DIGITAL</h1>
          <h2 className="mt-5 text-lg font-extralight md:text-xl  text-white">
            Creamos tu Sitio Web o Tienda Virtual, sabemos que puede ser tu primera experiencia tecnológica, entendemos tu temor y tus dudas. Te brindamos un servicio cercano, asesoría completa. No somos tu proveedor, somos tu Partner Tecnológico.
          </h2>
            <button className="flex items-center justify-center
            mt-5 py-2 max-w-[250px]
            text-white font-light
            rounded border-2 border-second-400
            hover:bg-white/30 hover:border-0 hover:font-bold
           ">
              SEGUIR
            </button>
        </div>

      </div>
    </div>
  );
};