import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  label: string;
  count: number;
}

export function Tag({ label, count, ...props }: Props) {
  return (
    <button
      {...props}
      className='flex items-center bg-gray-200 rounded-lg dark:bg-slate-800'>
      <span className='px-2 py-1 font-semibold'>{label}</span>
      <span className='px-2 py-1 border-l-2 border-l-slate-100 dark:border-l-slate-600'>
        {count}
      </span>
    </button>
  );
}
