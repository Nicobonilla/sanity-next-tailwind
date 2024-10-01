import { HeroImage } from "@/components/pages/home/HeroImage";
import { Highlight1 } from "@/components/shared/Highlight1";
export default async function Page() {

  return (
    <>
      <HeroImage />
      <Highlight1 
        title="25 Años De Experiencia Con Excelente Resultados!" 
        description="En MBA Ingeniería, nuestra especialidad es proveer soluciones técnicas
                de vanguardia, personalizadas para una amplia gama de espacios,
                incluyendo inmobiliario residencial y corporativo, industrias, centros
                médicos y comerciales"
        />
    </>
  );
}

            