import React from 'react';

import { ComponentProps } from '@/components/types';
import Background from '../Background';
import PTextHero from '../Background/PTextHero';
import PtextHeading from '../Background/PtextHeading';
import ImageBg from '../Background/ImageBg';

export default function Heading({ data }: { data: ComponentProps }) {
  const dataBg = data?.backgroundValue || {};
  const typeComponent = data?.typeComponentValue || '';
  const height = dataBg?.responsiveHeight || '';

  return (
    <Background
      data={{
        bg: dataBg,
        typeComponent,
      }}
    >
      <ImageBg
        imgBg={data?.imageBackground}
        imgBgType={dataBg?.imageBackgroundType}
      />

      {height === 'h-900' && typeComponent !== 'heroForm' && (
        <PTextHero data={data} />
      )}

      {typeComponent == 'heading' && <PtextHeading data={data} />}
    </Background>
  );
}
