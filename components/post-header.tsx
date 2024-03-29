import { DateFormatter } from './date-formatter';
import { CoverImage } from './cover-image';
import { NextSeo } from 'next-seo';

interface Props {
  title: string;
  coverImage?: string;
  date: string;
  excerpt?: string;
}

export function PostHeader({ title, coverImage, date, excerpt }: Props) {
  return (
    <div>
      <NextSeo description={excerpt} title={title} />
      <div className='space-y-1'>
        <h2>{title}</h2>
      </div>
      {coverImage && (
        <div className='pt-6 pb-4 md:pb-8'>
          <CoverImage title={title} src={coverImage} />
        </div>
      )}
      <div className='pt-2 pb-4'>
        <DateFormatter dateString={date} />
      </div>
    </div>
  );
}
