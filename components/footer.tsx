import { SOCIAL_LINKS } from '~/lib/constants';

export function Footer() {
  return (
    <footer className='flex justify-between w-full pt-20'>
      <p>&copy; Karim Daghari - {new Date().getFullYear()}</p>
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
      </ul>
    </footer>
  );
}
