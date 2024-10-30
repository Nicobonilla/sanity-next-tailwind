import { PortableTextBlock } from 'next-sanity';
import { UrlObject } from 'url';
import { Item, Banner } from './sanity.types';

export type UniteBusiness = {
  title?: string; // Puede ser undefined o string
  icon?: 'user' | 'menu' | null; // Puede ser undefined, 'user', 'menu', o null
  slug?: string; // Puede ser undefined o string
} | null;

export type Links = {
  id?: string; // Puede ser undefined o string
  title?: string | null; // Puede ser undefined o string
  slug?: string | null; // Puede ser undefined o string
  subsections?: Links[] | null; // Puede ser undefined o un array de Links
  unitBusiness?: UniteBusiness | null; // Puede ser undefined o null
  content?: PortableTextBlock | null; // Puede ser undefined o string
  position?: number | null;
} | null;

// Updated NavProps type without null
export type NavProps = {
  links: Links[]; // links should always be an array
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
  img?: UrlObject | string;
  description?: string;
}
