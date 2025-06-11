'use client'

import React, { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Heart, Share2, Truck, RotateCcw, Shield } from 'lucide-react'

// Componente Button local
function Button({ 
  children, 
  onClick, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  disabled = false 
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'outline'
  size?: 'default' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none'
  
  const variantClasses = {
    default: 'bg-black text-white hover:bg-gray-800',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50'
  }
  
  const sizeClasses = {
    default: 'h-10 py-2 px-4 text-sm',
    lg: 'h-11 px-8 text-sm',
    xl: 'h-12 px-8 text-base'
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  )
}

// Componente ProductImageGallery local
function ProductImageGallery({ 
  images, 
  productName 
}: {
  images: string[]
  productName: string
}) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-96">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 border-2 rounded-lg overflow-hidden transition-all ${
              selectedImage === index 
                ? 'border-black' 
                : 'border-gray-200 hover:border-gray-300'
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

// Componente SizeSelector local
function SizeSelector({ 
  sizes, 
  selectedSize, 
  onSizeChange 
}: {
  sizes: string[]
  selectedSize?: string
  onSizeChange: (size: string) => void
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">Talla</h3>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`h-10 border rounded-md text-sm font-medium transition-all ${
              selectedSize === size
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

// Componente ColorSelector local
function ColorSelector({ 
  colors, 
  selectedColor, 
  onColorChange 
}: {
  colors: { name: string; value: string }[]
  selectedColor?: string
  onColorChange: (color: string) => void
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">Color</h3>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color.name)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === color.name
                ? 'border-black scale-110'
                : 'border-gray-300 hover:border-gray-400'
            }`}
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

// Datos de ejemplo del producto
const productData = {
  id: '1',
  name: 'Vestido Floral Primavera',
  price: 89900,
  originalPrice: 129900,
  description: 'Hermoso vestido floral perfecto para la primavera. Confeccionado en algodón suave y transpirable, ideal para el día a día de tu pequeña.',
  images: [
    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop'
  ],
  colors: [
    { name: 'Rosa', value: '#FFB6C1' },
    { name: 'Azul', value: '#87CEEB' },
    { name: 'Amarillo', value: '#F0E68C' },
    { name: 'Blanco', value: '#FFFFFF' }
  ],
  sizes: ['2', '4', '6', '8', '10', '12', '16'],
  inStock: true,
  category: 'Vestidos',
  material: '100% Algodón',
  care: 'Lavar a máquina en agua fría'
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>(productData.colors[0].name)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  // En producción, aquí harías fetch del producto por slug
  if (!productData) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla')
      return
    }
    
    console.log('Agregando al carrito:', {
      productId: productData.id,
      size: selectedSize,
      color: selectedColor,
      quantity
    })
    
    alert('¡Producto agregado al carrito!')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="px-4 py-3 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto">
          <span>Inicio</span> / <span>Niñas</span> / <span>Vestidos</span> / 
          <span className="text-gray-900 font-medium"> {productData.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="lg:sticky lg:top-8">
            <ProductImageGallery 
              images={productData.images}
              productName={productData.name}
            />
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Título y precio */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {productData.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(productData.price)}
                </span>
                {productData.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(productData.originalPrice)}
                  </span>
                )}
                {productData.originalPrice && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    -{Math.round((1 - productData.price / productData.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Selector de color */}
            <ColorSelector
              colors={productData.colors}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />

            {/* Selector de talla */}
            <SizeSelector
              sizes={productData.sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            {/* Cantidad */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Cantidad</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                size="xl"
                className="w-full"
                disabled={!productData.inStock}
              >
                {productData.inStock ? 'Agregar al carrito' : 'Agotado'}
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  Favoritos
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Información de entrega */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Envío gratis</p>
                  <p className="text-gray-600">En compras superiores a $150.000</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Devoluciones gratuitas</p>
                  <p className="text-gray-600">30 días para cambios y devoluciones</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Compra segura</p>
                  <p className="text-gray-600">Pago 100% seguro con MercadoPago</p>
                </div>
              </div>
            </div>

            {/* Descripción del producto */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {productData.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Material:</span> {productData.material}</p>
                <p><span className="font-medium">Cuidado:</span> {productData.care}</p>
                <p><span className="font-medium">Categoría:</span> {productData.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 