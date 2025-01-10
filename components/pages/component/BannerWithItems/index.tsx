import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/utils';
import ItemBanner from './ItemBanner';
import type { ItemProps } from '@/components/pages/PageTemplate';

import { ComponentProps } from '@/components/pages/PageTemplate';
import clsx from 'clsx';
import PTItemBanner from './PTextItemBanner';
import Background from './Background';
import Inner from './Inner';

// Componente principal del Banner con fondo condicional
export default function BannerWithItems({ data }: { data: ComponentProps }) {
  return (
    <Background data={data}>
      <Inner data={data} />
    </Background>
  );
}
