import Link from 'next/link';
import { SITE_NAME, SOCIAL_LINKS } from '~/lib/constants';

export function Navbar() {
  return (
    <nav className='flex items-center justify-between w-full'>
      <h5>
        <Link href='/' className='inline-block'>
          {SITE_NAME}
        </Link>
      </h5>
      <ul className='inline-flex items-end space-x-2'>
        {SOCIAL_LINKS.map(({ icon: Icon, url, name }) => (
          <a
            key={name}
            href={url}
            target='_blank'
            rel='noreferrer'
            className='inline-block'>
            <Icon className='w-5 h-5' />
          </a>
        ))}
      </ul>{' '}
    </nav>
  );
}
