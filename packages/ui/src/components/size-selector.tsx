'use client'

import React from 'react'
import { cn } from '@jennykids/utils'

interface SizeSelectorProps {
  sizes: string[]
  selectedSize?: string
  onSizeChange: (size: string) => void
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900">Talla</h3>
        <a href="#" className="text-sm font-medium text-pink-600 hover:text-pink-500">
          Guía de tallas
        </a>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSizeChange(size)}
            className={cn(
              'h-10 border rounded-md text-sm font-medium transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              selectedSize === size
                ? 'border-pink-500 bg-pink-500 text-white'
                : 'border-gray-300 bg-white text-gray-900 hover:border-pink-500',
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
} 