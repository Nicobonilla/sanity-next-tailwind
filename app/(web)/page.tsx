import { HeroImage } from "@/components/pages/home/HeroImage";
import { ItemServicios } from "@/components/pages/home/ItemServicios";
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

        <div className="px-2 lg:px-0 py-5 container gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto flex flex-wrap"> 
        <ItemServicios servicio="Mediación Prejudicial" img="/layer.webp" />
        <ItemServicios servicio="Defensa en juicios" img="/layer.webp" />
        <ItemServicios servicio="Custodia y alimentos" img="/layer.webp" />
        <ItemServicios servicio="Divorcio y separación" img="/layer.webp" />
        <ItemServicios servicio="Compensación económica" img="/layer.webp" />
        <ItemServicios servicio="Autorizaciones de salida" img="/layer.webp" />
        <ItemServicios servicio="Medidas de protección" img="/layer.webp" />
        <ItemServicios servicio="Violencia intrafamiliar" img="/layer.webp" />
        </div>
        </>
  );
}

            