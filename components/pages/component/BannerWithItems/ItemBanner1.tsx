import React from 'react';
import { PortableText } from 'next-sanity';
import { InlineSvgPreviewComponent } from '@focus-reactive/sanity-plugin-inline-svg-input';
import { ItemProps } from '@/components/types';
import PTItemBanner, {
  type PTItemtype,
} from '@/components/pages/component/BannerWithItems/PTextItemBanner';

export default function ItemBanner1({
  item,
  PTextItem,
}: {
  item: ItemProps;
  PTextItem: string | undefined;
}) {
  if (!item) return null;

  // Selección del conjunto de componentes de PortableText
  const selectedPT = PTextItem
    ? PTItemBanner[PTextItem as keyof PTItemtype]
    : PTItemBanner.PT1;

  const hasSvgIconList = item.svgIconList;
  const hasSvgIcon = item.svgIcon;
  const hasImage = item.image;
  const hasContent = item.content;

  return (
    <div className="hover:border-1 mb-10 flex h-full flex-col items-start rounded-3xl border-gray-300 text-center hover:cursor-pointer hover:shadow-lg xs4:h-72 md:mb-0">
      {/* Contenedor de íconos o imágenes */}
      <div className="relative z-0 mx-auto mb-1 mt-10 size-12 rounded-lg shadow-md drop-shadow-md">
        {/* Mostrar el ícono SVG si está disponible y no hay otros elementos */}
        {hasSvgIcon && !hasSvgIconList && (
          <InlineSvgPreviewComponent value={item.svgIcon || ''} />
        )}

        {/* Mostrar la lista de SVGs, dependiendo de su longitud */}
        {!hasSvgIcon && hasSvgIconList && hasSvgIconList.length > 0 && (
          <div className="flex justify-center">
            {hasSvgIconList.map((svgItem, index) => (
              <div key={index}>
                {index === 0 && (
                  <div className="block text-black dark:hidden">
                    <InlineSvgPreviewComponent
                      value={svgItem.icon}
                      style={{ color: 'currentColor' }}
                    />
                  </div>
                )}
                {index === 1 && (
                  <div className="hidden text-white dark:block">
                    <InlineSvgPreviewComponent
                      value={svgItem.icon}
                      style={{ color: 'currentColor' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Si no hay SVGs ni lista, mostramos una imagen por defecto */}
        {!hasSvgIcon && !hasSvgIconList && (
          <img
            src="/intranet.svg"
            alt="Imagen de ejemplo"
            className="h-auto w-full"
          />
        )}

        {/* Mostrar la imagen si está disponible */}
        {hasImage && !hasSvgIconList && !hasSvgIcon && (
          <div className="relative flex h-[100px] w-full max-w-[100px] justify-center text-white">
            <img
              src={'/intranet.svg'}
              alt="Imagen del ítem"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
