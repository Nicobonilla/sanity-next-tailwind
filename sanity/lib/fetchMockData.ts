import type { Links, ServiceItem } from "@/types";

export const links: Links[] = [
    {
      id: 1,
      section: "INICIO",
      href: { pathname: "/abogado-familiar" },
      subsections: [{ id: 1, section: "H1", href: { pathname: "/H1" } }],
    },
    {
      id: 2,
      section: "SERVICIOS",
      href: { pathname: "/practica-asesoría-legal-san-felipe" },
      subsections: [
        {
          id: 4, section: "División de Activos y Propiedades", href: { pathname: "/division-de-activos" }
        },
        {
          id: 4, section: "Divorcio colaborativo", href: { pathname: "/division-de-activos" }
        }, {
          id: 4, section: "Procedimientos por desacato", href: { pathname: "/divisionS-de-activos" }
        }, {
          id: 4, section: "Separación legal", href: { pathname: "/division-de-activosSA" }
        }, {
          id: 4, section: "Divorcio", href: { pathname: "/division-de-activos" }
        }, {
          id: 4, section: "Divorcio Militarr", href: { pathname: "/division-de-activos" }
        }, {
          id: 4, section: "Acuerdos prenupciales", href: { pathname: "/division-de-activos" }
        }, {
          id: 4, section: "Apoyo Conyugal", href: { pathname: "/division-de-activos" }
        }, {
          id: 4, section: "Acuerdos prenupciales", href: { pathname: "/division-de-activos" }
        },]
    },
    {
      id: 5,
      section: "RECURSOS",
      href: { pathname: "/debes-saber-abogado-familiar" },
    },
    {
      id: 6,
      section: "CONTACTO",
      href: { pathname: "/contacto-abogado-familiar-san-felipe" },
    },
  ];

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