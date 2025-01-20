import Form from '@/components/global/Form';
import { ComponentProps } from '@/components/types';
import Background from '../Background';

const HeroForm = ({ data }: { data: ComponentProps }) => {
  return (
    <Background data={data}>
      <Form />
    </Background>
  );
};

export default HeroForm;
