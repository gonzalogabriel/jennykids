import { getCategories } from '@jennykids/db'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react'

// Componente para mostrar el estado de configuración
function StatusCard({ 
  title, 
  status, 
  description 
}: { 
  title: string
  status: 'success' | 'error' | 'pending'
  description: string 
}) {
  const statusColors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    pending: 'bg-amber-500'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

// Componente para tarjetas de producto destacado
function FeaturedProductCard({ 
  title, 
  price, 
  originalPrice, 
  image, 
  href 
}: {
  title: string
  price: string
  originalPrice?: string
  image: string
  href: string
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          {originalPrice && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                -30%
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(24)</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Componente para categorías
function CategoryCard({ 
  name, 
  description, 
  image, 
  href 
}: {
  name: string
  description: string
  image: string
  href: string
}) {
  return (
    <Link href={href} className="group">
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-bold mb-1">{name}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default async function HomePage() {
  let categories: any[] = []
  let error: any = null

  try {
    categories = await getCategories()
  } catch (err) {
    console.error('Error al obtener categorías:', err)
    error = err
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header/Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Jenny Kids</h1>
                <p className="text-xs text-gray-500">Ropa infantil premium</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Nueva Colección Primavera 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Moda Infantil
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Extraordinaria
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre nuestra colección de ropa premium para niños y niñas. 
            Calidad excepcional, diseños únicos y comodidad garantizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/productos"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Explorar Colección
            </Link>
            <Link 
              href="/productos/vestido-floral-primavera"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Ver Producto Destacado
            </Link>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los favoritos de nuestros pequeños clientes. Piezas únicas que combinan estilo, comodidad y calidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeaturedProductCard
              title="Vestido Floral Primavera"
              price="$89.900"
              originalPrice="$129.900"
              image="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop"
              href="/productos/vestido-floral-primavera"
            />
            <FeaturedProductCard
              title="Conjunto Deportivo Niño"
              price="$65.900"
              image="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop"
              href="/productos/conjunto-deportivo"
            />
            <FeaturedProductCard
              title="Pijama Unicornio"
              price="$45.900"
              originalPrice="$65.900"
              image="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop"
              href="/productos/pijama-unicornio"
            />
            <FeaturedProductCard
              title="Chaqueta Denim Kids"
              price="$89.900"
              image="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop"
              href="/productos/chaqueta-denim"
            />
          </div>
        </div>
      </section>

      {/* Categorías */}
      {categories.length > 0 && (
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explora por Categorías</h2>
              <p className="text-gray-600">
                Encuentra exactamente lo que buscas para tu pequeño
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const categoryImages = [
                  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop'
                ]
                return (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    description={category.description || `Ropa para ${category.name.toLowerCase()}`}
                    image={categoryImages[index % categoryImages.length]}
                    href={`/categoria/${category.slug}`}
                  />
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Beneficios */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Envío Gratis</h3>
              <p className="text-gray-600">En compras superiores a $150.000 COP</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Devoluciones Fáciles</h3>
              <p className="text-gray-600">30 días para cambios y devoluciones</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compra Segura</h3>
              <p className="text-gray-600">Pagos 100% seguros con MercadoPago</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estado de configuración (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Estado de Configuración</h2>
              <p className="text-gray-600">Panel de desarrollo - Solo visible en modo desarrollo</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatusCard
                title="Next.js 14"
                status="success"
                description="App Router configurado"
              />
              <StatusCard
                title="Supabase"
                status={categories.length > 0 ? "success" : "error"}
                description={categories.length > 0 ? "Conectado y funcionando" : "Error de conexión"}
              />
              <StatusCard
                title="Tailwind CSS"
                status="success"
                description="Estilos configurados"
              />
              <StatusCard
                title="TypeScript"
                status="success"
                description="Tipado estricto"
              />
              <StatusCard
                title="Monorepo"
                status="success"
                description="Estructura organizada"
              />
              <StatusCard
                title="MercadoPago"
                status="pending"
                description="Pendiente configuración"
              />
            </div>
          </div>
        </section>
      )}

      {/* Error de conexión */}
      {error && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                ⚠️ Error de Conexión
              </h2>
              <p className="text-red-700">
                No se pudo conectar a Supabase. Verifica la configuración en el archivo .env.local
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">J</span>
            </div>
            <span className="text-xl font-bold">Jenny Kids</span>
          </div>
          <p className="text-gray-400 mb-6">
            La mejor tienda de ropa infantil en Colombia
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">Acerca de</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contacto</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
            © 2025 Jenny Kids. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}