'use client'

import React from 'react'
import { cn } from '@jennykids/utils'

interface SizeSelectorProps {
  sizes: string[]
  selectedSize?: string
  onSizeChange: (size: string) => void
  className?: string
}

export function SizeSelector({ 
  sizes, 
  selectedSize, 
  onSizeChange, 
  className 
}: SizeSelectorProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-sm font-medium text-gray-900">Talla</h3>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={cn(
              'h-10 border rounded-md text-sm font-medium transition-all',
              selectedSize === size
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
} 