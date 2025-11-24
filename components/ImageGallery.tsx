'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CarListing } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import { Card } from '@/components/ui/card';

interface ImageGalleryProps {
  car: CarListing;
}

export default function ImageGallery({ car }: ImageGalleryProps) {
  const images = car.mainImage
    ? [car.mainImage, ...(car.gallery || [])]
    : car.gallery || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return (
      <Card className="flex h-96 items-center justify-center text-gray-500">
        No imagery available
      </Card>
    );
  }

  const currentImage = urlFor(images[currentIndex]).width(1600).height(1000).url();

  return (
    <div className="space-y-4">
      <Card className="relative aspect-[16/10] overflow-hidden border-none p-0">
        <Image
          src={currentImage}
          alt={images[currentIndex].alt || car.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </Card>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image.asset?._ref}-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl border ${
                currentIndex === index
                  ? 'border-amber-500 ring-2 ring-amber-500'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={urlFor(image).width(400).height(300).url()}
                alt={image.alt || `${car.title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

