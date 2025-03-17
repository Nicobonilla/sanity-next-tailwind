import { type ComponentProps } from '@/components/types';
import Background from '../Background';
import PtextHeading from '../Background/PtextHeading';
import ImageBg from '../Background/ImageBg';
import type { CSSProperties } from 'react';

type HeadingProps = {
  data: ComponentProps;
  styleBg?: CSSProperties;
};

export default function Heading({ data, styleBg }: HeadingProps) {
  const dataBg = data?.backgroundValue || {};

  return (
    <Background
      data={{
        ...dataBg,
        typeComponent: 'heading',
      }}
      styleBg={styleBg}
    >
      <ImageBg imgBg={data?.imageBackground} index={0} className='h-[350px]' />

      <PtextHeading data={data.content} />

    </Background>
  );
}
