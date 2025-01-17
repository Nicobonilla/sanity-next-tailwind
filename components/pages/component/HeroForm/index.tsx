import Form from '@/components/shared/Form';
import { ComponentProps } from '../../PageTemplate';
import Background from '../Background';

const HeroForm = ({ data }: { data: ComponentProps }) => {
  return (
    <Background data={data}>
      <Form data={data} />
    </Background>
  );
};

export default HeroForm;
