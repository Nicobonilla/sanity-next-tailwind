import { HeroImage } from "@/components/pages/home/HeroImage";
import { ItemServicios } from "@/components/pages/home/ItemServicios";
import { Highlight1 } from "@/components/shared/Highlight1";
import IconList from "@/components/shared/Card/IconList";
import { services } from "@/sanity/lib/fetchMockData";
import Form from "@/components/shared/Form";


async function fetchServices() {
  //const query = '*[_type == "product"]'; 
  //const products = await client.fetch(query);
  //return products;
  return services
}

export default async function Page() {
  const services = await fetchServices();
  return (
    <>
      <HeroImage />
      <Form />
      <Highlight1
        title="25 Años De Experiencia Con Excelente Resultados!"
        description="En MBA Ingeniería, nuestra especialidad es proveer soluciones técnicas
        de vanguardia, personalizadas para una amplia gama de espacios,
        incluyendo inmobiliario residencial y corporativo, industrias, centros
        médicos y comerciales"
      />

      <IconList services={services}/>
      
      <div className="container  px-2 flex flex-wrap lg:px-0 py-5  gap-5 grid
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto ">
        <ItemServicios servicio="Mediación Prejudicial" img="/bunnwhite.svg" />
        <ItemServicios servicio="Defensa en juicios" img="/bunnwhite.svg" />
        <ItemServicios servicio="Custodia y alimentos" img="/bunnwhite.svg" />
        <ItemServicios servicio="Divorcio y separación" img="/bunnwhite.svg" />
        <ItemServicios servicio="Compensación económica" img="/bunnwhite.svg" />
        <ItemServicios servicio="Violencia intrafamiliar" img="/bunnwhite.svg" />
      </div>
    </>
  );
}

