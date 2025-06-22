import Link from 'next/link'
import Image from 'next/image'
import { getCategories, getProducts } from '@jennykids/db'
import type { Category, Product } from '@jennykids/db'

// Placeholder de colores para las categorías
const categoryColors = {
  Niñas: 'f472b6',
  Niños: '60a5fa',
  Bebés: 'a78bfa',
  Default: 'd1d5db'
}

function getCategoryColor(categoryName: string): string {
  const key = categoryName as keyof typeof categoryColors;
  return categoryColors[key] || categoryColors.Default;
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
  let categories: Category[] = []
  let products: Product[] = []
  let error = null

  try {
    // Obtenemos los datos en paralelo para optimizar la carga
    ;[categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ])
  } catch (err) {
    console.error('Error al obtener datos de la página de inicio:', err)
    error = 'No se pudieron cargar los datos. Por favor, inténtalo de nuevo más tarde.'
  }

  const featuredCategories = categories.slice(0, 3)
  const productsToDisplay = products.slice(0, 4) // Mostramos hasta 4 productos destacados

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden rounded-lg shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 lg:rounded-l-lg">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">La mejor moda para</span>
                  <span className="block text-pink-500 xl:inline"> los más pequeños</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Descubre colecciones llenas de color, comodidad y estilo para que tus hijos brillen en cada aventura.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/productos"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 md:py-4 md:text-lg md:px-10"
                    >
                      Ver colección
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/novedades"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200 md:py-4 md:text-lg md:px-10"
                    >
                      Novedades
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full lg:rounded-r-lg"
            src="https://dummyimage.com/1000x800/fce7f3/333.png&text=Jenny+Kids"
            alt="Placeholder para el hero banner de Jenny Kids"
            width={1000}
            height={800}
            priority
          />
        </div>
      </div>

      {/* Featured Categories */}
      <section aria-labelledby="category-heading" className="bg-white py-12 sm:py-16 mt-8 sm:mt-12 rounded-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="category-heading" className="text-3xl font-extrabold tracking-tight text-gray-900 text-center">
            Compra por Categoría
          </h2>
          {error ? (
            <div className="mt-10 text-center text-red-600 bg-red-50 p-4 rounded-md">
              <p>{error}</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8">
              {featuredCategories.map((category) => (
                <Link key={category.id} href={`/categorias/${category.slug}`} className="group block">
                  <div aria-hidden="true" className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden group-hover:opacity-75">
                    <Image
                      src={category.image_url || `https://dummyimage.com/500x350/${getCategoryColor(category.name)}/fff.png&text=${category.name}`}
                      alt={category.description || `Ropa para ${category.name}`}
                      width={500}
                      height={350}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">Ver productos</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <div className="bg-white mt-8 sm:mt-12 rounded-lg shadow-md">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center">
            Productos Destacados
          </h2>
          {error && !productsToDisplay.length ? (
            <div className="mt-10 text-center text-red-600 bg-red-50 p-4 rounded-md">
              <p>{error}</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productsToDisplay.map((product) => (
                <Link key={product.id} href={`/productos/${product.slug}`} className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <Image
                      src={product.image_urls?.[0] || 'https://dummyimage.com/400x500/e5e7eb/333.png&text=Sin+Imagen'}
                      alt={product.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(Number(product.price))}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}