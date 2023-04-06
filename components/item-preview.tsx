import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  slug: string;
  aside?: ReactNode;
}

export function ItemPreview({ title, slug, aside }: Props) {
  return (
    <Link href={slug} className='block group'>
      <div className='flex flex-col lg:flex-row'>
        <aside className='lg:w-1/6 lg:flex-shrink-0'>
          <p>{aside}</p>
        </aside>
        <div className='w-full lg:w-5/6'>
          <p className='group-hover:underline group-hover:after:content-["_→"] font-bold'>
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}
