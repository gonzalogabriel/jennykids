import { getCategories } from '@jennykids/db'
import Link from 'next/link'

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
    success: 'bg-green-500',
    error: 'bg-red-500',
    pending: 'bg-yellow-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌟 Jenny Kids
          </h1>
          <p className="text-xl text-gray-600">
            Tienda de ropa infantil en Colombia
          </p>
        </div>

        {/* Estado de configuración */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

        {/* Enlace de ejemplo a página de producto */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">🛍️ Página de Producto</h2>
          <p className="text-gray-600 mb-4">
            Hemos creado una página de producto individual inspirada en H&M, adaptada para Jenny Kids.
          </p>
          <Link 
            href="/productos/vestido-floral-primavera"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Ver Página de Producto →
          </Link>
        </div>

        {/* Categorías */}
        {categories.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">📦 Categorías</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 border border-gray-200 rounded-lg text-center"
                >
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error de conexión */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              ⚠️ Error de Conexión
            </h2>
            <p className="text-red-700">
              No se pudo conectar a Supabase. Verifica la configuración.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
