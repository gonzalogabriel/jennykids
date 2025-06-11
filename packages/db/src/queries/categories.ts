import { supabase, supabaseAdmin } from '../client'
import type { Database } from '../types/database.types'

type Category = Database['public']['Tables']['categories']['Row']
type CategoryInsert = Database['public']['Tables']['categories']['Insert']
type CategoryUpdate = Database['public']['Tables']['categories']['Update']

// Obtener todas las categorías
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data
}

// Obtener categoría por slug
export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// Crear categoría (solo admin)
export async function createCategory(category: CategoryInsert) {
  const { data, error } = await supabaseAdmin
    .from('categories')
    .insert(category)
    .select()
    .single()

  if (error) throw error
  return data
}

// Actualizar categoría (solo admin)
export async function updateCategory(id: string, updates: CategoryUpdate) {
  const { data, error } = await supabaseAdmin
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Eliminar categoría (solo admin)
export async function deleteCategory(id: string) {
  const { error } = await supabaseAdmin
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) throw error
} 