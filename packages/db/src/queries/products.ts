import { supabase, supabaseAdmin } from '../client'
import type { Database } from '../types/database.types'

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

// Obtener todos los productos activos
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      description,
      price,
      compare_at_price,
      category_id,
      image_urls,
      stock_quantity,
      is_active,
      created_at,
      updated_at,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al obtener productos con su categoría:', error)
    throw error
  }

  return data
}

// Obtener producto por slug
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) throw error
  return data
}

// Obtener productos por categoría
export async function getProductsByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Crear producto (solo admin)
export async function createProduct(product: ProductInsert) {
  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) throw error
  return data
}

// Actualizar producto (solo admin)
export async function updateProduct(id: string, updates: ProductUpdate) {
  const { data, error } = await supabaseAdmin
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Eliminar producto (solo admin)
export async function deleteProduct(id: string) {
  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
} 