import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  slug: string;
  aside?: ReactNode;
}

export function ItemPreview({ title, description, slug, aside }: Props) {
  return (
    <Link href={slug} className='block group'>
      <div className='flex flex-col lg:flex-row'>
        <aside className='lg:w-1/6 lg:flex-shrink-0'>{aside}</aside>
        <div className='w-full lg:w-5/6'>
          <h6 className='group-hover:underline group-hover:after:content-["_→"]'>
            {title}
          </h6>
          <p className='leading-relaxed'>{description}</p>
        </div>
      </div>
    </Link>
  );
}
