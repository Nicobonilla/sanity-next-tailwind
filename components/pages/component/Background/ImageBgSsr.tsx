import type { ComponentProps } from '@/components/types';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';

export default function ImageBgSsr({
    imgBg,
    index,
    className,
    sizes
}: {
    imgBg?: ComponentProps['imageBackground'] | null;
    index: number;
    className?: string;
    sizes?: string;
}): React.ReactNode {
    const isPriority = index === 0;
    const hasImage = !!imgBg?.asset?._ref;

    // Configuración fija para SSR: tamaño y calidad optimizados para móviles
    const imageWidth = 768; // Tamaño fijo para móviles
    const quality = 50; // Calidad baja para carga rápida

    const optimizedSrc =
        urlForImage(imgBg)
            ?.width(imageWidth)
            ?.auto('format')
            ?.fit('max')
            ?.quality(quality)
            ?.url() || '/meeting.jpeg';


    return (<>
        {hasImage && <Image
            src={optimizedSrc}
            alt="Background image (SSR)"
            sizes={sizes || '100vw'}
            data-key={index}
            fill
            className={`absolute inset-0 size-full ${className}`}
            priority={isPriority} // Prioridad para el primer slide
        />}
    </>
    );
}