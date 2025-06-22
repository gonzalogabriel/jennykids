'use client'

import React from 'react'
import { cn } from '@jennykids/utils'

interface ColorSelectorProps {
  colors: { name: string; value: string }[]
  selectedColor?: string
  onColorChange: (color: string) => void
}

export function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">
        Color: <span className="font-normal text-gray-600">{selectedColor}</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onColorChange(color.name)}
            className={cn(
              'w-8 h-8 rounded-full border-2 transition-transform',
              selectedColor === color.name
                ? 'border-pink-500 scale-110'
                : 'border-gray-300 hover:border-gray-400',
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
             <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
} 