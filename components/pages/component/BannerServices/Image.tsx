import clsx from 'clsx';
import Image from 'next/image';

interface ImageItemProps {
  src: string;
  imagePosition: string | null;
}
const ImageItem = ({ src, imagePosition }: ImageItemProps) => {
  if (!src) return null;

  return (
    <div
      className={clsx('relative z-50 h-96 w-full lg:h-auto', {
        'lg:w-1/3': imagePosition === 'right' || imagePosition === 'left',
      })}
    >
      <Image
        src={src}
        fill
        alt="Banner Image"
        className="overflow-hidden object-cover object-top lg:overflow-visible"
      />
    </div>
  );
};

export default ImageItem;
