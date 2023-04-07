import type { PropsWithChildren } from 'react';

export function Container({ children }: PropsWithChildren<{}>) {
  return <div className='max-w-xl p-4 mx-auto'>{children}</div>;
}
