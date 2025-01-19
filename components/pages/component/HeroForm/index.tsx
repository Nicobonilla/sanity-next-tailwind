import Form from '@/components/global/Form';
import { ComponentProps } from '../../PageTemplate';
import Background from '../Background';

const HeroForm = ({ data }: { data: ComponentProps }) => {
  return (
    <Background data={data}>
      <Form />
    </Background>
  );
};

export default HeroForm;
