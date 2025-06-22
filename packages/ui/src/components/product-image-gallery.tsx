'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: (string | null)[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const validImages = images.filter((img): img is string => !!img);

  if (validImages.length === 0) {
    return (
       <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
         <p className="text-gray-500">Sin imagen</p>
       </div>
    )
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] pr-2">
        {validImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden transition-all ${
              selectedImage === index
                ? 'border-pink-500'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} vista ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagen principal */}
      <div className="flex-1">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={validImages[selectedImage]}
            alt={`${productName} imagen principal`}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
} 