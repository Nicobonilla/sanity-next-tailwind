import React from 'react';

import { ComponentProps } from '@/components/types';
import Background from '../Background';
import InnerBannerWithItems from './InnerBannerWithItems';

// Componente principal del Banner con fondo condicional
export default function BannerWithItems({ data }: { data: ComponentProps }) {
  return (
    <Background data={data}>
      <InnerBannerWithItems data={data} />
    </Background>
  );
}
