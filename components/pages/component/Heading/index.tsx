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
        ...dataBg,
        typeComponent: 'heading',
      }}
    >
      <ImageBg
        imgBg={data?.imageBackground}
        imgBgType={dataBg?.imageBackgroundType}
      />

      <PtextHeading data={data} />
    </Background>
  );
}
