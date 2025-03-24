import { type ComponentProps } from '@/components/types';
import PtextHeading from '../Background/PtextHeading';
import type { CSSProperties } from 'react';
import Layer from '../Background/Layer';
import ImageLoader from '../ImageLoader';

type HeadingProps = {
  data: ComponentProps;
  styleBg?: CSSProperties;
};

export default function Heading({ data, styleBg }: HeadingProps) {
  const layer = data?.backgroundValue?.layer;

  return (
    <div className="relative w-full h-[350px]">
      {layer && <Layer layer={layer} currentStyle={styleBg} />}
      <ImageLoader
        imgBg={data?.imageBackground}
        className="object-cover"
        priority={true}
        desktopHencement={true}
      />
      <PtextHeading data={data.content} />
    </div>
  );
}
