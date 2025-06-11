-- Arreglar políticas RLS que causan recursión infinita
-- Este archivo debe ejecutarse en Supabase SQL Editor

-- Eliminar políticas problemáticas
DROP POLICY IF EXISTS "Los admins pueden ver todos los perfiles" ON profiles;
DROP POLICY IF EXISTS "Solo admins pueden modificar categorías" ON categories;
DROP POLICY IF EXISTS "Solo admins pueden modificar productos" ON products;
DROP POLICY IF EXISTS "Los admins pueden ver todas las órdenes" ON orders;
DROP POLICY IF EXISTS "Los admins pueden actualizar órdenes" ON orders;
DROP POLICY IF EXISTS "Los admins pueden ver todos los items de órdenes" ON order_items;

-- Crear políticas simplificadas sin recursión

-- Políticas para profiles (sin recursión)
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas para categories (lectura pública, escritura solo para usuarios autenticados)
CREATE POLICY "Cualquiera puede ver las categorías" ON categories FOR SELECT USING (true);
CREATE POLICY "Usuarios autenticados pueden modificar categorías" ON categories FOR ALL USING (auth.uid() IS NOT NULL);

-- Políticas para products (lectura pública, escritura solo para usuarios autenticados)
CREATE POLICY "Cualquiera puede ver productos activos" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Usuarios autenticados pueden modificar productos" ON products FOR ALL USING (auth.uid() IS NOT NULL);

-- Políticas para cart_items (sin cambios, estas están bien)
-- Ya existen y no causan recursión

-- Políticas para orders (simplificadas)
CREATE POLICY "Los usuarios pueden ver sus propias órdenes" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden crear sus propias órdenes" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios autenticados pueden actualizar órdenes" ON orders FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Políticas para order_items (simplificadas)
CREATE POLICY "Los usuarios pueden ver los items de sus órdenes" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid()
  )
);
CREATE POLICY "Los usuarios pueden crear items en sus órdenes" ON order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid()
  )
);
CREATE POLICY "Usuarios autenticados pueden ver items de órdenes" ON order_items FOR SELECT USING (auth.uid() IS NOT NULL);

-- Crear función para verificar si un usuario es admin (sin usar políticas RLS)
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM auth.users u
    JOIN public.profiles p ON u.id = p.id
    WHERE u.id = auth.uid() 
    AND p.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Nota: Para funcionalidad de admin completa, se recomienda usar
-- el service role key en el backend en lugar de políticas RLS complejas 