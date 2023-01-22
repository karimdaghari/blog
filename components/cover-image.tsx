import Image, { type ImageProps } from 'next/image';

interface Props extends Pick<ImageProps, 'width' | 'height' | 'unoptimized'> {
  title: string;
  src: string;
}

export function CoverImage({ title, src, height, width, unoptimized }: Props) {
  return (
    <div className='sm:mx-0'>
      <Image
        src={src}
        alt={`Image for ${title}`}
        className='w-full rounded-lg shadow-sm'
        width={1300 ?? width}
        height={630 ?? height}
        unoptimized={unoptimized}
      />
    </div>
  );
}
