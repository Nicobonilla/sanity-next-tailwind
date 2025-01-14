import React from 'react';

import { ComponentProps } from '@/components/pages/PageTemplate';
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
