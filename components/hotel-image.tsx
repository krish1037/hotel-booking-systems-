import React from 'react';
import Image from 'next/image';

interface HotelImageProps {
  hotel: {
    id: string;
    name: string;
    image: string;
  };
}

export function HotelImage({ hotel }: HotelImageProps) {
  return (
    <div className="relative h-64 md:h-auto md:w-1/3">
      <Image 
        src={hotel.image} 
        alt={hotel.name} 
        fill 
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={() => {
          // Fallback to placeholder if image fails to load
          const img = document.getElementById(`hotel-image-${hotel.id}`) as HTMLImageElement;
          if (img) {
            img.src = '/placeholder.svg';
          }
        }}
        id={`hotel-image-${hotel.id}`}
      />
    </div>
  );
} 