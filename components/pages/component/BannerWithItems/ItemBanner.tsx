import React from 'react';
import { PortableText } from 'next-sanity';
import { InlineSvgPreviewComponent } from '@focus-reactive/sanity-plugin-inline-svg-input';
import Image from 'next/image';
import { ItemProps } from '@/components/types';
import PTItemBanner, { type PTItemtype } from './PTextItemBanner';
import Iconfy from '../../../global/Icons/Iconfy';

interface ItemBannerProps {
  item: ItemProps;
  PTextItem?: keyof PTItemtype;
}

export default function ItemBanner({ item, PTextItem }: ItemBannerProps) {
  if (!item) return null;

  const selectedPT = PTextItem
    ? PTItemBanner[PTextItem as keyof PTItemtype]
    : PTItemBanner.PT1;
  const { icon, svgIconList, svgIcon, content } = item;

  const svg = svgIcon || svgIconList?.[0]?.icon || undefined;

  return (
    <div className="flex h-full flex-row p-2">
      <div className="relative z-0 mr-2 size-20">
        {svg ? (
          <InlineSvgPreviewComponent
            value={svg}
            className="inline-svg-preview size-16 object-fill"
          />
        ) : icon?.icon ? (
          <Iconfy
            icon={icon?.icon} // Nombre del ícono que se va a renderizar
            metadata={{
              hFlip: icon?.metadata?.hFlip, // Flip horizontal si se proporciona
              vFlip: icon?.metadata?.vFlip, // Flip vertical si se proporciona
              rotate: icon?.metadata?.rotate, // Ángulo de rotación
              size: {
                width: icon?.metadata?.size?.width, // Ancho del ícono
                height: icon?.metadata?.size?.height, // Alto del ícono
              },
              color: {
                hex: icon?.metadata?.color?.hex, // Color del ícono
              },
            }}
          />
        ) : (
          <Image
            src="/intranet.svg"
            fill
            className="inline-svg-preview z-10 size-16 p-2"
            alt="Default icon "
          />
        )}
      </div>
      {content && (
        <div className="relative w-4/5 text-justify leading-none">
          <PortableText value={content} components={selectedPT} />
        </div>
      )}
    </div>
  );
}
