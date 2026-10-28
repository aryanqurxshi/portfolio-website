import Image from 'next/image';

/** Company logo tile, falling back to a monogram when there is no image. */
export function Logo({ src, name }: { src?: string; name: string }) {
  if (src) {
    return <Image src={src} alt="" width={40} height={40} className="pixel-frame h-10 w-10 shrink-0 rounded-md object-cover" />;
  }
  const initials = name
    .split(/[\s.]+/)
    .filter((w) => /^[A-Za-z]/.test(w) && w.toLowerCase() !== 'the')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-well font-display text-lg italic text-foreground/70"
    >
      {initials}
    </span>
  );
}
