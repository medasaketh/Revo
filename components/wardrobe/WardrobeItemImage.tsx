"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DEFAULT_WARDROBE_IMAGE } from "@/lib/wardrobe/mappers";

const NEXT_IMAGE_HOSTS = new Set(["images.unsplash.com"]);

function isNextImageHost(url: string): boolean {
  try {
    return NEXT_IMAGE_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

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
  sizes = "(max-width: 640px) 50vw, 240px",
}: WardrobeItemImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || DEFAULT_WARDROBE_IMAGE);

  useEffect(() => {
    setCurrentSrc(src || DEFAULT_WARDROBE_IMAGE);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== DEFAULT_WARDROBE_IMAGE) {
      setCurrentSrc(DEFAULT_WARDROBE_IMAGE);
    }
  };

  if (isNextImageHost(currentSrc)) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        onError={handleError}
      />
    );
  }

  return (
    // User-provided URLs can be any host — use native img to avoid next/image allowlist errors.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      onError={handleError}
    />
  );
}
