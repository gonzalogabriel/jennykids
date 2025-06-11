'use client'

import React from 'react'
import { cn } from '@jennykids/utils'

interface Color {
  name: string
  value: string
  image?: string
}

interface ColorSelectorProps {
  colors: Color[]
  selectedColor?: string
  onColorChange: (color: string) => void
  className?: string
}

export function ColorSelector({ 
  colors, 
  selectedColor, 
  onColorChange, 
  className 
}: ColorSelectorProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-sm font-medium text-gray-900">Color</h3>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color.name)}
            className={cn(
              'w-8 h-8 rounded-full border-2 transition-all',
              selectedColor === color.name
                ? 'border-black scale-110'
                : 'border-gray-300 hover:border-gray-400'
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
      {selectedColor && (
        <p className="text-sm text-gray-600">
          Color seleccionado: {colors.find(c => c.name === selectedColor)?.name}
        </p>
      )}
    </div>
  )
} 