'use client'

import React, { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Share2, Truck, RotateCcw, Shield, Star, ChevronLeft, Plus, Minus } from 'lucide-react'

// Componente Button mejorado
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
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none'
  
  const variantClasses = {
    default: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-md',
    ghost: 'hover:bg-gray-100'
  }
  
  const sizeClasses = {
    default: 'h-12 py-3 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
    xl: 'h-16 px-10 text-lg'
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

// Componente ProductImageGallery mejorado
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
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-96">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
              selectedImage === index 
                ? 'border-pink-500 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} vista ${index + 1}`}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagen principal */}
      <div className="order-1 lg:order-2 flex-1">
        <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden relative">
          <Image
            src={images[selectedImage]}
            alt={`${productName} imagen principal`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4">
            <button className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente SizeSelector mejorado
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Talla</h3>
      <div className="grid grid-cols-4 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`h-12 border-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              selectedSize === size
                ? 'border-pink-500 bg-pink-500 text-white shadow-lg'
                : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

// Componente ColorSelector mejorado
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Color</h3>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color.name)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              selectedColor === color.name
                ? 'border-pink-500 scale-110 shadow-lg'
                : 'border-gray-300 hover:border-gray-400 hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
      {selectedColor && (
        <p className="text-sm text-gray-600 font-medium">
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
  description: 'Hermoso vestido floral perfecto para la primavera. Confeccionado en algodón suave y transpirable, ideal para el día a día de tu pequeña. Diseño exclusivo con estampado floral delicado y corte cómodo que permite libertad de movimiento.',
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
  care: 'Lavar a máquina en agua fría',
  rating: 4.8,
  reviews: 24
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

  const discount = productData.originalPrice 
    ? Math.round((1 - productData.price / productData.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header con navegación */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="font-semibold text-gray-900">Jenny Kids</span>
            </Link>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="px-4 py-4 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="hover:text-pink-600 transition-colors">Inicio</Link> 
          <span className="mx-2">/</span>
          <Link href="/categoria/ninas" className="hover:text-pink-600 transition-colors">Niñas</Link> 
          <span className="mx-2">/</span>
          <Link href="/categoria/vestidos" className="hover:text-pink-600 transition-colors">Vestidos</Link> 
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{productData.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="lg:sticky lg:top-24">
            <ProductImageGallery 
              images={productData.images}
              productName={productData.name}
            />
          </div>

          {/* Información del producto */}
          <div className="space-y-8">
            {/* Título, precio y rating */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full">
                  {productData.category}
                </span>
                {productData.inStock && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    En stock
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {productData.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(productData.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {productData.rating} ({productData.reviews} reseñas)
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(productData.price)}
                </span>
                {productData.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(productData.originalPrice)}
                    </span>
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      -{discount}%
                    </span>
                  </>
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Cantidad</h3>
              <div className="flex items-center border-2 border-gray-200 rounded-xl w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                size="xl"
                className="w-full"
                disabled={!productData.inStock}
              >
                {productData.inStock ? 'Agregar al carrito' : 'Agotado'}
              </Button>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                  {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Información de entrega */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de entrega</h3>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Envío gratis</p>
                  <p className="text-gray-600">En compras superiores a $150.000</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Devoluciones gratuitas</p>
                  <p className="text-gray-600">30 días para cambios y devoluciones</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Compra segura</p>
                  <p className="text-gray-600">Pago 100% seguro con MercadoPago</p>
                </div>
              </div>
            </div>

            {/* Descripción del producto */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Descripción</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {productData.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">Material:</span>
                  <span className="text-gray-600 ml-2">{productData.material}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Cuidado:</span>
                  <span className="text-gray-600 ml-2">{productData.care}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Categoría:</span>
                  <span className="text-gray-600 ml-2">{productData.category}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Disponibilidad:</span>
                  <span className="text-green-600 ml-2 font-medium">En stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}