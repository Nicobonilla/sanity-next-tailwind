import type { 
  GetPageDetailQueryResult, 
  GetPostListByUnitBusinessQueryResult, 
  GetPostListQueryResult, 
  GetServiceDetailQueryResult, 
  GetUnitBusinessDetailQueryResult 
} from '@/sanity.types';

// Tipo base para componentes
type BaseComponentProps = {
  _type: string;
  _key: string;
  [key: string]: any;
};

// Tipos específicos para cada origen de componentes
type ComponentsSource<T> = NonNullable<T>['components'];
type ComponentFromSource<T> = NonNullable<ComponentsSource<T>>[number];

// Definición de tipos específicos usando el tipo genérico
export type ComponentsPageProps = ComponentsSource<GetPageDetailQueryResult>;
export type ComponentPageProps = ComponentFromSource<GetPageDetailQueryResult>;

export type ComponentsServiceProps = ComponentsSource<GetServiceDetailQueryResult>;
export type ComponentServiceProps = ComponentFromSource<GetServiceDetailQueryResult>;

export type ComponentsUnitBusinessProps = ComponentsSource<GetUnitBusinessDetailQueryResult>;
export type ComponentUnitBusinessProps = ComponentFromSource<GetUnitBusinessDetailQueryResult>;

// Tipo unificado para todos los componentes
export type ComponentsProps = ComponentsPageProps | ComponentsServiceProps | ComponentsUnitBusinessProps;
export type ComponentProps = ComponentPageProps | ComponentServiceProps | ComponentUnitBusinessProps;

// Tipos para items dentro de componentes
export type ItemsProps = NonNullable<ComponentProps>['items'];
export type ItemProps = NonNullable<ItemsProps>[number];

// Tipos para componentes dinámicos
export type DynamicComponentType = React.ComponentType<{
  data: ComponentProps;
}>;

export interface LoadedComponent {
  dataComponents: ComponentProps;
  Component: DynamicComponentType;
}

// Tipos extendidos para casos específicos
export type ComponentWithBannerPosts = ComponentProps & {
  bannerPostsItems?: GetPostListQueryResult | null;
};

export type ComponentWithServices = ComponentProps & {
  services?: GetServiceDetailQueryResult['services'] | null;
};

// Tipos para posts
export type ComponentsPostsProps = NonNullable<GetPostListQueryResult>['posts'];
export type ComponentsPostsByUnitBusinessProps = NonNullable<GetPostListByUnitBusinessQueryResult>['posts'];
