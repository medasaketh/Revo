"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DEFAULT_WARDROBE_IMAGE } from "@/lib/wardrobe/mappers";

interface WardrobeItemImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function WardrobeItemImage({
  src,
  alt,
  className,
}: WardrobeItemImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || DEFAULT_WARDROBE_IMAGE);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || DEFAULT_WARDROBE_IMAGE);
    setFailed(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== DEFAULT_WARDROBE_IMAGE) {
      setCurrentSrc(DEFAULT_WARDROBE_IMAGE);
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-[#1a1a1a] text-[10px] uppercase tracking-wider text-gray-500",
          className
        )}
        aria-label={alt}
      >
        No image
      </div>
    );
  }

  return (
    // Native img avoids next/image optimizer issues with external URLs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      loading="lazy"
      onError={handleError}
    />
  );
}
