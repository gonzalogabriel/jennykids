// Exportar tipos
export type { Database, Json } from './types/database.types'

// Exportar clientes
export { supabase, supabaseAdmin } from './client'

// Exportar funciones de consulta
export * from './queries/products'
export * from './queries/categories'
export * from './queries/orders'
export * from './queries/auth' 