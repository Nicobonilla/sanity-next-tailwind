import { UrlObject } from 'url'

export type Links = {
  id: string;
  section: string;
  href: { pathname: string } ;
  subsections?: Links[];
};

export type NavProps = {
  links: Links[];
};

export interface ServiceItem {
  iconName?: 'shoppingCart' | 'lightbulb' | 'barChart2' | 'smartphone' | 'mail' | 'code' ;  // Definir los nombres de los íconos disponibles
  title: string;
  img?: string;
  description?: string;
}
