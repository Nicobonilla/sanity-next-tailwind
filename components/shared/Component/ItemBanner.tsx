import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { Icon } from '@iconify/react';
import { InlineSvgPreviewComponent } from '@focus-reactive/sanity-plugin-inline-svg-input';
import { ItemProps } from '@/components/pages/PageTemplate';

export const PTextItemBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="h3 mx-auto mb-2 items-center justify-center font-montserrat text-sm font-extrabold md:max-w-[250px]">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="p3 px-1 pb-5 text-center font-crimson text-base leading-none xs4:px-5 md:max-w-[250px]">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};

export const PTextItemBanner2: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="h3 mx-auto mb-2 items-center justify-center font-montserrat text-sm font-extrabold md:max-w-[250px]">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="p3 px-5 pb-5 text-center font-crimson text-base leading-none md:max-w-[250px]">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};
export default function ItemBanner({ item }: { item: ItemProps }) {
  if (!item) return null;

  const { icon, metadata } = item.icon || {};
  const hasSvgIconList = item.svgIconList;
  const hasSvgIcon = item.svgIcon;
  const hasImage = item.image;
  const hasContent = item.content;

  return (
    <div className="hover:border-1 mb-10 flex h-full flex-col items-start rounded-3xl border-gray-300 text-center hover:cursor-pointer hover:shadow-lg xs4:h-72 md:mb-0">
      {/* Mostrar solo uno de los tipos, dependiendo de lo que esté disponible */}
      {icon && (
        <div className="relative z-0 mx-auto mb-5 flex items-center justify-center text-red-500 md:max-w-24">
          <Icon
            icon={icon}
            hFlip={metadata?.hFlip}
            vFlip={metadata?.vFlip}
            rotate={metadata?.rotate}
            width={metadata?.size?.width}
            height={metadata?.size?.height}
            style={{ color: metadata?.color?.hex }}
          />
        </div>
      )}
      {hasSvgIcon && !hasSvgIconList && !icon && (
        <div
          className={`relative z-0 mx-auto mb-1 mt-10 size-12 rounded-xl shadow-md`}
        >
          <InlineSvgPreviewComponent value={item.svgIcon || ''} />
        </div>
      )}
      {hasSvgIconList && hasSvgIconList.length > 0 && (
        <div className="relative z-0 mx-auto mb-1 mt-10 size-12 drop-shadow-md">
          {hasSvgIconList.map((item, index) => (
            <div key={index}>
              {index === 0 && (
                <div className="block text-black dark:hidden">
                  <InlineSvgPreviewComponent
                    value={item.icon}
                    style={{ color: 'currentColor' }}
                  />
                </div>
              )}
              {index === 1 && (
                <div className="hidden text-white dark:block">
                  <InlineSvgPreviewComponent
                    value={item.icon}
                    style={{ color: 'currentColor' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {hasImage && !hasSvgIconList && !hasSvgIcon && !icon && (
        <div className="relative flex h-[100px] w-full max-w-[100px] justify-center text-white">
          <InlineSvgPreviewComponent value={item.svgIcon || ''} />
        </div>
      )}

      {hasContent && (
        <div className="mt-4">
          <PortableText
            value={item.content || []}
            components={PTextItemBanner} // Utilizamos el conjunto de componentes para el texto
          />
        </div>
      )}
    </div>
  );
}
