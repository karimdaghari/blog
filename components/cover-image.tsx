import Image, { type ImageProps } from 'next/image';

interface Props extends Omit<ImageProps, 'alt'> {
  title: string;
  src: string;
}

export function CoverImage({
  title,
  src,
  height = 630,
  width = 1300,
  ...props
}: Props) {
  return (
    <Image
      src={src}
      alt={`Image for ${title}`}
      width={width}
      height={height}
      {...props}
    />
  );
}
