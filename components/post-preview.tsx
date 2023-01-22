import { DateFormatter } from './date-formatter';
import { ItemPreview } from './item-preview';

interface Props {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

export function PostPreview({ title, date, excerpt, slug }: Props) {
  return (
    <ItemPreview
      slug={`/blog/${slug}`}
      title={title}
      description={excerpt}
      aside={
        <div className='lg:pt-0.5'>
          <DateFormatter dateString={date} />
        </div>
      }
    />
  );
}
