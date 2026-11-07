import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
}

export default function BrandLogo({
  size = 'md',
  href = '/',
  className = '',
}: BrandLogoProps) {
  const heightClass =
    size === 'sm'
      ? 'h-8 sm:h-9'
      : size === 'lg'
      ? 'h-10 sm:h-12'
      : 'h-9 sm:h-11';

  const imgElement = (
    <img
      src="/images/infinio-logo.png"
      alt="Infinio Technology Solutions"
      width={9221}
      height={2462}
      decoding="async"
      className={`${heightClass} w-auto max-w-[200px] sm:max-w-[240px] object-contain select-none`}
    />
  );

  if (!href) {
    return (
      <div className={`inline-flex items-center py-1 ${className}`}>
        {imgElement}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label="Infinio Technology Solutions — Home"
      className={`inline-flex items-center rounded-lg py-1 pr-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb] ${className}`}
    >
      {imgElement}
    </Link>
  );
}
