import Image from "next/image";

export function HeroImage() {
  const imageUrl = '/layer.webp'

  return (
      <div className="relative mt-20 w-full h-[50vh] z-0">
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
        <div className="layer layer1"></div>
        <div className="layer layer2"></div>
        <div className="layer layer3"></div>
      </div>
  );
};
