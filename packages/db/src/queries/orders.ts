import { supabase, supabaseAdmin } from '../client'
import type { Database } from '../types/database.types'

type Order = Database['public']['Tables']['orders']['Row']
type OrderInsert = Database['public']['Tables']['orders']['Insert']
type OrderUpdate = Database['public']['Tables']['orders']['Update']
type OrderItem = Database['public']['Tables']['order_items']['Row']
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']

// Obtener órdenes del usuario
export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (
          id,
          name,
          image_urls
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Obtener orden por ID
export async function getOrderById(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (
          id,
          name,
          image_urls
        )
      )
    `)
    .eq('id', orderId)
    .single()

  if (error) throw error
  return data
}

// Crear nueva orden
export async function createOrder(order: OrderInsert, items: OrderItemInsert[]) {
  // Crear la orden
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (orderError) throw orderError

  // Crear los items de la orden
  const orderItems = items.map(item => ({
    ...item,
    order_id: orderData.id
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) throw itemsError

  return orderData
}

// Actualizar estado de orden (admin)
export async function updateOrderStatus(orderId: string, updates: OrderUpdate) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Obtener todas las órdenes (admin)
export async function getAllOrders() {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(`
      *,
      profiles (
        id,
        email,
        full_name
      ),
      order_items (
        *,
        products (
          id,
          name,
          image_urls
        )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
} 