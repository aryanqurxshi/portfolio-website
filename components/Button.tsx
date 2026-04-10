import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  href?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
}

export function Button({ href, type = 'button', variant = 'primary', onClick, children }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 active:translate-x-[1px]';
  const styles = variant === 'primary' ? 'rpg-button' : 'rpg-secondary-button';

  if (href) {
    return (
      <a href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
