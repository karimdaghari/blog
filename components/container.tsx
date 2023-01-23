import type { ReactNode } from 'react';
import cx from 'clsx';

interface Props {
  children?: ReactNode;
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <div className={cx('max-w-5xl px-5 mx-auto', className)}>{children}</div>
  );
}
