import { notFound } from 'next/navigation'
import { getProductBySlug } from '@jennykids/db'
import ProductDetails from './_components/product-details'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Aquí iría la galería de imágenes, que estará dentro de ProductDetails */}
          <div>
            {/* Placeholder para la galería, se implementará en el componente cliente */}
          </div>
          
          {/* Detalles del producto, ahora manejados por un componente cliente */}
          <ProductDetails product={product} />
        </div>

        {/* Sección de información adicional */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Producto</h3>
          <div className="prose prose-sm text-gray-600">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 