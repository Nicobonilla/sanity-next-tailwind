import { type ComponentProps } from '@/components/types';
import PtextHeading from '../Background/PtextHeading';
import ImageBg from '../Background/ImageCsr';
import type { CSSProperties } from 'react';
import Layer from '../Background/Layer';

type HeadingProps = {
  data: ComponentProps;
  styleBg?: CSSProperties;
};

export default function Heading({ data, styleBg }: HeadingProps) {
  const layer = data?.backgroundValue?.layer;

  return (
    <div className='relative w-full h-[350px]'>
      {layer && <Layer layer={layer} currentStyle={styleBg} />}
      <ImageBg imgBg={data?.imageBackground} index={0} className='h-[350px]' />

      <PtextHeading data={data.content} />

    </div>
  );
}
