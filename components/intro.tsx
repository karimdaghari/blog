import type { ReactNode } from 'react';

export interface IntroProps {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}

export function Intro({ title, description, children }: IntroProps) {
  return (
    <section className='py-24 space-y-2 text-xl'>
      <h3>{title}</h3>
      {typeof description === 'string' ? <p>{description}</p> : description}
      {children}
    </section>
  );
}
