import { GetServiceDetailQueryResult } from '@/sanity.types';

// Tipo para el componente dinámico
type DynamicComponentType = React.ComponentType<{
  data: ComponentProps;
}>;

// Tipo para los componentes cargados
export interface LoadedComponent {
  dataComponents: ComponentProps;
  Component: DynamicComponentType;
}

// Definiciones de tipos
type ComponentsPageProps = NonNullable<GetPageDetailQueryResult>['components'];
type ComponentPageProps = NonNullable<ComponentsPageProps>[number];

type ComponentsServiceProps =
  NonNullable<GetServiceDetailQueryResult>['components'];
type ComponentServiceProps = NonNullable<ComponentsServiceProps>[number];

export type ComponentWithBannerPosts = ComponentProps & {
  bannerPostsItems?: GetPostListQueryResult | null;
};

export type ComponentWithServices = ComponentProps & {
  services?: GetServiceDetailQueryResult['services'] | null;
};

export type ComponentsProps = ComponentsPageProps | ComponentsServiceProps;
export type ComponentProps = ComponentPageProps | ComponentServiceProps;

export type ItemsProps = NonNullable<ComponentProps>['items'];
export type ItemProps = NonNullable<ItemsProps>[number];
