import { type FC } from 'react';
import { type ImageBlockProps } from '@/types/blog';
import Image from 'next/image';

const ImageBlock: FC<ImageBlockProps> = ({ src, alt, caption, width, height }) => {
  return (
    <figure className="mb-6">
      <div className="relative w-full aspect-video">
        <Image
          src={src}
          alt={alt}
          width={width || 1200}
          height={height || 630}
          className="rounded-lg object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageBlock;
