import { HeroImage } from "@/components/pages/home/HeroImage";
import { Highlight1 } from "@/components/shared/Highlight1";
import IconList from "@/components/shared/Card/ServiceIconList";
import Form from "@/components/shared/Form";
import BasicImageCard from "@/components/shared/Card/BasicImageCard";

import { services } from "@/sanity/lib/fetchMockData";
import { mockServices } from "@/sanity/lib/fetchMockData";
import Banner1 from "@/components/shared/Banner/Banner1";
import Banner3Features from "@/components/shared/Banner/Banner3Features";

async function fetchServices() {
  //const query = '*[_type == "product"]'; 
  //const products = await client.fetch(query);
  //return products;
  return services
}


async function fetchServices2() {
  //const query = '*[_type == "product"]'; 
  //const products = await client.fetch(query);
  //return products;
  return mockServices
}

export default async function Page() {
  const services = await fetchServices();
  const mockServices = await fetchServices2();
  return (
    <>
      <HeroImage />
      <Banner1  />
      <Banner3Features />
      <Form />
      <Highlight1
        title="25 Años De Experiencia Con Excelente Resultados!"
        description="En MBA Ingeniería, nuestra especialidad es proveer soluciones técnicas
        de vanguardia, personalizadas para una amplia gama de espacios,
        incluyendo inmobiliario residencial y corporativo, industrias, centros
        médicos y comerciales"
      />

      <IconList services={services}/>
      
      <BasicImageCard services={mockServices} />
    </>
  );
}

