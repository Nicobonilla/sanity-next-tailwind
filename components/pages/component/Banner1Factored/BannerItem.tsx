import { PortableText } from '@portabletext/react';
import { InlineSvgPreviewComponent } from '@focus-reactive/sanity-plugin-inline-svg-input';
import Image from 'next/image';
import Iconfy, { IconfyProps } from '@/components/shared/Icons/Iconfy';
import { ItemProps } from '../../PageTemplate';
import PTItemBanner, {
  PTtype,
} from '@/components/pages/component/BannerWithItems/PTextItemBanner';

interface ItemBannerProps {
  item: {
    props: ItemProps;
    icon: IconfyProps;
  };
  variant: string;
  PTextItem?: string;
}
export function BannerItem({ item, variant, PTextItem }: ItemBannerProps) {
  if (!item) return null;

  const selectedPT = PTextItem ? PTItemBanner[PTextItem] : PTItemBanner.PT1;

  const { svgIcon, svgIconList, content } = item.props;
  const { icon } = item;

  const svg = svgIcon || svgIconList?.[0]?.icon;

  return (
    <div className="flex h-full flex-row rounded-lg p-2 hover:cursor-pointer hover:border hover:shadow-md">
      <div className="relative z-0 mr-2 size-20">
        {svg ? (
          <InlineSvgPreviewComponent
            value={svg}
            className="inline-svg-preview size-16 object-fill"
          />
        ) : icon?.icon ? (
          <Iconfy
            icon={icon.icon}
            metadata={{
              hFlip: icon.metadata?.hFlip,
              vFlip: icon.metadata?.vFlip,
              rotate: icon.metadata?.rotate,
              size: {
                width: icon.metadata?.size?.width,
                height: icon.metadata?.size?.height,
              },
              color: {
                hex: icon.metadata?.color?.hex,
              },
            }}
          />
        ) : (
          <Image
            src="/intranet.svg"
            fill
            className="inline-svg-preview size-16 p-2"
            alt="Default icon"
          />
        )}
      </div>
      {content && (
        <div className="relative w-4/5 text-justify leading-none">
          <PortableText value={content} components={selectedPT} />
        </div>
      )}
    </div>
  );
}
