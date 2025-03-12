'use client'
import { ComponentProps } from '@/components/types';
import Background from '../Background';
import PtextHeading from '../Background/PtextHeading';
import ImageBg from '../Background/ImageBg';

export default function Heading({ data }: { data: ComponentProps }) {
  const dataBg = data?.backgroundValue || {};

  return (
    <Background
      data={{
        ...dataBg,
        typeComponent: 'heading',
      }}
    >
      <ImageBg imgBg={data?.imageBackground} index={0} />

      <PtextHeading data={data.content} />

    </Background>
  );
}
