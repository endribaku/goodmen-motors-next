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

  const currentImage = urlFor(images[currentIndex]).width(2000).height(1500).url();

  return (
    <div className="w-full space-y-4">
      {/* Main Image */}
      <div className="relative aspect-4/3 w-full max-w-full overflow-hidden  bg-gray-100 min-h-[300px] md:min-h-[500px]">
        <Image
          src={currentImage}
          alt={images[currentIndex].alt || car.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((image, index) => (
            <button
              type="button"
              key={`${image.asset?._ref}-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-4/3 overflow-hidden transition-opacity ${
                currentIndex === index
                  ? 'opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={urlFor(image).width(400).height(300).url()}
                alt={image.alt || `${car.title} thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 25vw, 12.5vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

