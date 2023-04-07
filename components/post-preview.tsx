import Link from 'next/link';
import { DateFormatter } from './date-formatter';

interface Props {
  title: string;
  date: string;
  slug: string;
}

export function PostPreview({ title, date, slug }: Props) {
  return (
    <Link href={slug} className='block group'>
      <div className='flex flex-col items-start lg:items-center lg:flex-row'>
        <aside className='pr-2.5 font-light lg:w-1/4 lg:text-right'>
          <DateFormatter dateString={date} />
        </aside>
        <p className='pl-0 lg:pl-2.5 px-2.5 pt-0 lg:py-2.5 font-medium max-w-fit lg:group-hover:bg-blue-50 dark:lg:group-hover:bg-slate-150 lg:w-3/4'>
          {title}
        </p>
      </div>
    </Link>
  );
}
