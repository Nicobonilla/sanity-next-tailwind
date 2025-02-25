import React from 'react';

import { ComponentWithBannerPosts } from '@/components/types';
import Background from '../Background';
import InnerBannerWithItems from './InnerBannerWithItems';

// Componente principal del Banner con fondo condicional
export default function BannerPosts({
  data,
}: {
  data: ComponentWithBannerPosts;
}) {
  console.log('data posts', data);
  return (
    <Background data={data}>
      <InnerBannerWithItems data={data} />
    </Background>
  );
}
