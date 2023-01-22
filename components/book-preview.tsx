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
        <div className='w-full lg:pr-3 h-60'>
          <CoverImage title={title} src={coverImage} unoptimized />
          <div className='w-full h-full bg-gray-200 rounded-lg' />
        </div>
      }
    />
  );
}
