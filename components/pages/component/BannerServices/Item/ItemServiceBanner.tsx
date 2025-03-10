import React from 'react';
import { ComponentProps } from '@/components/types';
import Iconfy from '../../../../global/Icons/Iconfy';
import Link from 'next/link';
//import { trackButtonClick } from '@/components/lib/GTMTrackers';

export default function ItemServiceBanner({
  service,
}: ComponentProps['services']) {
  if (!service) return null;

  const { iconfyIcon, title, resumen, slug } = service;

  return (
    <Link
      href={{ pathname: `/services/${slug}` }}
      passHref
      className="size-full p-2 sm:p-4"
      //onClick={()=> trackButtonClick(slug, 'BannerServices')}
    >
      <div className="group flex size-full flex-col items-center justify-center rounded-lg bg-indigo-200/60 px-5 py-10">
        <div className="relative mx-auto mb-5 w-fit group-hover:animate-bounce">
          {iconfyIcon?.icon && (
            <Iconfy
              icon={iconfyIcon?.icon} // Nombre del ícono que se va a renderizar
              metadata={{
                hFlip: iconfyIcon?.metadata?.hFlip, // Flip horizontal si se proporciona
                vFlip: iconfyIcon?.metadata?.vFlip, // Flip vertical si se proporciona
                rotate: iconfyIcon?.metadata?.rotate, // Ángulo de rotación
                size: {
                  width: 50, // Ancho del ícono
                  height: 50, // Alto del ícono
                },
                color: {
                  hex: iconfyIcon?.metadata?.color?.hex, // Color del ícono
                },
              }}
            />
          )}
        </div>
        <div className="relative text-center text-neutral-600">
          {title && (
            <h3 className="font-fira font-semibold uppercase">{title}</h3>
          )}
          {resumen && <p className="font-fira text-sm">{resumen}</p>}
        </div>
      </div>
    </Link>
  );
}
