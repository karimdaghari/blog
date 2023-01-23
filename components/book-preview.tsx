import { CoverImage } from './cover-image';
import { ItemPreview } from './item-preview';

interface Props {
  title: string;
  coverImage: string;
  excerpt: string;
  slug: string;
}

export function BookPreview({ title, excerpt, slug, coverImage }: Props) {
  return (
    <ItemPreview
      slug={`/books/${slug}`}
      title={title}
      description={excerpt}
      aside={
        <div className='pb-4 lg:pr-3 lg:pb-0'>
          <CoverImage
            title={title}
            src={coverImage}
            height={150}
            width={150}
            unoptimized
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
      }
    />
  );
}
