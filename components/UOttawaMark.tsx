import Image from 'next/image';

/** Inline uOttawa crest that swaps to the white version in dark mode. */
export function UOttawaMark({ className = 'h-[1.1em] w-[1.1em]' }: { className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 align-[-0.15em] ${className}`} aria-hidden="true">
      <Image src="/logos/uottawa-crest.png" alt="" fill sizes="32px" className="object-contain dark:hidden game:hidden" />
      <Image src="/logos/uottawa-crest-white.png" alt="" fill sizes="32px" className="hidden object-contain dark:block game:block" />
    </span>
  );
}
