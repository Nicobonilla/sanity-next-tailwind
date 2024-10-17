import type { ServiceItem } from "@/types";

 export const services: ServiceItem[] = [
  {
    iconName: 'shoppingCart',
    title: "E-commerce Solutions",
    description: "Our company excels in providing successful software development for e-commerce and optimizing shopping carts for online businesses."
  },
  {
    iconName: 'lightbulb',
    title: "CMS, WordPress, Drupal",
    description: "We develop Content Management Systems (CMS) to enable you to effectively manage site content."
  },
  {
    iconName: 'barChart2',
    title: "Intranets/Extranets",
    description: "Our team develops custom solutions for Intranet & Extranet development, Sharepoint integration, and knowledge management."
  },
  {
    iconName: 'smartphone',
    title: "Android/iOS Applications",
    description: "As a leading app development company, we offer Web, Android, and iOS App Development services."
  },
  {
    iconName: 'mail',
    title: "Email Marketing Solutions",
    description: "We create best-in-class email marketing software for creating, sending, and tracking email campaigns that yield results."
  },
  {
    iconName: 'code',
    title: "PHP and JS Development",
    description: "We provide software development services in PHP, Drupal, Python, JavaScript/jQuery, and other modern technologies."
  }
];


export const mockServices: ServiceItem[] = [
  {
      title: "Mediación Prejudicial",
      img: "/bunnwhite.svg",
      description: "Asesoría y apoyo en la mediación de conflictos."
  },
  {
      title: "Defensa en juicios",
      img: "/bunnwhite.svg",
      description: "Representación legal en procesos judiciales."
  },
  {
      title: "Custodia y alimentos",
      img: "/bunnwhite.svg",
      description: "Asesoramiento sobre custodia y manutención."
  },
  {
      title: "Divorcio y separación",
      img: "/bunnwhite.svg",
      description: "Asesoría legal para procesos de divorcio."
  },
  {
      title: "Compensación económica",
      img: "/bunnwhite.svg",
      description: "Asistencia en la reclamación de compensaciones."
  },
  {
      title: "Violencia intrafamiliar",
      img: "/bunnwhite.svg",
      description: "Apoyo legal en casos de violencia intrafamiliar."
  },
];

// Usa `mockServices` al renderizar `IconList`
