import Form from '@/components/global/Form';
import { ComponentProps } from '@/components/types';
import Background from '@/components/pages/component/Background';
import ImageBg from '../Background/ImageBg';

const HeroForm = ({ data }: { data: ComponentProps }) => {
  console.log('data.backgroundValue: ', data.backgroundValue);
  const dataBg = data?.backgroundValue || {};
  return (
    <Background
      data={{
        ...dataBg,
        typeComponent: 'heroForm',
      }}
    >
      <ImageBg
        imgBg={data?.imageBackground}
        imgBgType={data.backgroundValue?.imageBackgroundType}
      />
      <Form />
    </Background>
  );
};

export default HeroForm;
