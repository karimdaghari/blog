import { DateFormatter } from './date-formatter';
import { CoverImage } from './cover-image';
import Link from 'next/link';

interface Props {
  parent: {
    slug: string;
    title: string;
  };
  title: string;
  coverImage: string;
  date: string;
}

export function PostHeader({ parent, title, coverImage, date }: Props) {
  return (
    <>
      <div className='-space-y-2'>
        <Link
          href={parent.slug}
          className='inline-block hover:underline underline-offset-2'>
          {parent.title} / {title}
        </Link>
        <h1>{title}</h1>
      </div>
      <div className='pt-6 pb-4 md:pb-8'>
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className='pb-4'>
        <DateFormatter dateString={date} />
      </div>
    </>
  );
}
