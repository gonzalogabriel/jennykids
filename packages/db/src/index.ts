// Exportar tipos
export type { Database, Json } from './types/database.types'

// Exportar clientes
export * from './client'

// Exportar funciones de consulta
export * from './queries/auth'
export * from './queries/categories'
export * from './queries/orders'
export * from './queries/products'

// Exportar tipos de la base de datos
export * from './types/database.types'
export type { Category, CategoryInsert, CategoryUpdate } from './queries/categories'
export type { Product, ProductInsert, ProductUpdate } from './queries/products'
export type { Order, OrderInsert, OrderUpdate } from './queries/orders'
export type { Profile, ProfileUpdate } from './queries/auth' 