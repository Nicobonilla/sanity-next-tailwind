import React from 'react';
import { PortableTextComponents } from 'next-sanity';

import { ComponentProps } from '@/components/types';
import Background from '../Background';


export default function Heading({ data }: { data: ComponentProps }) {
  return (
    <Background data={data}>
      <div></div>
    </Background>
  );
}
