'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@jennykids/utils'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  className?: string
}

export function ProductImageGallery({ 
  images, 
  productName, 
  className 
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className={cn('flex flex-col lg:flex-row gap-4', className)}>
      {/* Thumbnails - En móvil aparecen abajo, en desktop a la izquierda */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-96">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              'flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 border-2 rounded-lg overflow-hidden transition-all',
              selectedImage === index 
                ? 'border-black' 
                : 'border-gray-200 hover:border-gray-300'
            )}
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
      <div className="order-1 lg:order-2 flex-1">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={images[selectedImage]}
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