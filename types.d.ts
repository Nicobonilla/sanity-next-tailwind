import { UrlObject } from 'url';

export type UniteBusiness = {
  title?: string; // Puede ser undefined o string
  icon?: 'user' | 'menu' | null; // Puede ser undefined, 'user', 'menu', o null
  slug?: string; // Puede ser undefined o string
} | null;

export type Links = {
  id?: string; // Puede ser undefined o string
  title?: string; // Puede ser undefined o string
  slug?: string; // Puede ser undefined o string
  subsections?: Links[]; // Puede ser undefined o un array de Links
  unitBusiness?: UniteBusiness; // Puede ser undefined o null
};

export type NavProps = {
  links: Links[];
};

export interface ServiceItem {
  iconName?:
    | 'shoppingCart'
    | 'lightbulb'
    | 'barChart2'
    | 'smartphone'
    | 'mail'
    | 'code'; // Definir los nombres de los íconos disponibles
  title: string;
  img?: string;
  description?: string;
}
