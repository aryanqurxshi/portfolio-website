import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  href?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
}

export function Button({ href, type = 'button', variant = 'primary', onClick, children }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition';
  const styles =
    variant === 'primary'
      ? 'bg-purple text-black hover:bg-purple/90'
      : 'border border-white/10 bg-white/5 text-gray-200 hover:border-purple/40 hover:text-white';

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
