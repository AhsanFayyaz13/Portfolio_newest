import { useState } from 'react';
import { Layers } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  className = '',
  objectPosition = 'center center',
  fallbackTitle,
  priority = false,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#111827] swiss-grid-bg p-6 text-center ${className}`}
      >
        <div className="flex h-11 w-11 items-center justify-center border border-white/10 bg-[#0A0F1C] text-[#94A3B8]">
          <Layers className="h-5 w-5" aria-hidden="true" />
        </div>
        {fallbackTitle ? (
          <span className="mt-3 font-mono text-xs tracking-wide text-[#94A3B8]">
            {fallbackTitle}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      style={{ objectPosition }}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
