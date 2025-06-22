'use client'

import React, { useState } from 'react'
import {
  Heart,
  Share2
} from 'lucide-react'

import {
  Button,
  ColorSelector,
  ProductImageGallery,
  SizeSelector
} from '@jennykids/ui'
import type { Product } from '@jennykids/db'

// Tip: Podríamos mover estas opciones a la base de datos en el futuro
const productColors = [
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Verde', value: '#22c55e' },
]

const productSizes = ['2', '4', '6', '8', '10']


interface ProductDetailsProps {
  product: Product & {
    categories: {
      id: string;
      name: string;
      slug: string;
    } | null;
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>(productColors[0].name)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla.')
      return
    }
    console.log('Agregando al carrito:', {
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    })
    alert('¡Producto agregado al carrito!')
  }
  
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(Number(price))
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Galería de Imágenes */}
      <ProductImageGallery images={product.image_urls || []} productName={product.name} />

      {/* Detalles y acciones */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
        </div>

        <ColorSelector
          colors={productColors}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
        
        <SizeSelector
          sizes={productSizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />

        {/* Cantidad y Botón de compra */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Cantidad:</span>
            <div className="flex items-center rounded-md border">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-lg"
              >
                -
              </button>
              <span className="px-4 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1.5 text-lg"
              >
                +
              </button>
            </div>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className="w-full text-base"
            size="lg"
            disabled={!product.is_active || product.stock_quantity === 0}
          >
            {product.is_active && product.stock_quantity > 0
              ? 'Agregar al carrito'
              : 'Agotado'}
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" className="w-full">
              <Heart className="mr-2 h-4 w-4" />
              Favorito
            </Button>
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 