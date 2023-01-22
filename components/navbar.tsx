import Link from 'next/link';

const links = [
  {
    href: '/blog',
    text: 'Blog'
  },
  {
    href: '/books',
    text: 'Books'
  }
];

export function Navbar() {
  return (
    <nav className='flex items-end justify-between w-full'>
      <h3>
        <Link href='/' className='inline-block'>
          Karim Daghari
        </Link>
      </h3>

      <ul className='flex flex-col items-start text-lg font-medium md:text-xl'>
        {links.map(({ href, text }) => (
          <li key={href}>
            <Link
              href={href}
              className='hover:underline underline-offset-[6px]'>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
