import Form from '@/components/global/Form';
import { ComponentProps } from '@/components/types';
import Background from '@/components/pages/component/Background';
import Video from '../Background/Video';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';

const HeroForm = ({ data }: { data: ComponentProps }) => {
  console.log('data.backgroundValue: ', data.backgroundValue);
  return (
    <Background
      data={{
        bg: data.backgroundValue,
        typeComponent: data.typeComponentValue,
      }}
    >
      {data.backgroundMode === 'video' && data.videoUrl && data?.videoType && (
        <Video
          videoUrl={data?.videoUrl}
          videoType={data?.videoType}
          activeTheme={data.activeTheme}
        />
      )}

      {data?.imageBackground &&
        data.backgroundValue?.imageBackgroundType == 'dynamic' && (
          <Image
            src={urlForImage(data.imageBackground)?.url() || '/meeting.jpeg'}
            alt="Hero image for the homepage"
            className="inset-0 z-10 size-full object-cover object-center"
            quality={100}
            fill
            priority
          />
        )}

      {data?.imageBackground &&
        data.backgroundValue?.imageBackgroundType === 'fixed' && (
          <div
            className="absolute inset-0 z-10 bg-cover bg-fixed bg-center"
            style={{
              backgroundImage: `url(${urlForImage(data.imageBackground)?.url() || ''})`,
            }}
          />
        )}

      <Form />
    </Background>
  );
};

export default HeroForm;
