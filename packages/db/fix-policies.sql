-- Eliminar políticas problemáticas y recrearlas correctamente
DROP POLICY IF EXISTS "Los admins pueden ver todos los perfiles" ON profiles;
DROP POLICY IF EXISTS "Solo admins pueden modificar categorías" ON categories;
DROP POLICY IF EXISTS "Solo admins pueden modificar productos" ON products;
DROP POLICY IF EXISTS "Los admins pueden ver todas las órdenes" ON orders;
DROP POLICY IF EXISTS "Los admins pueden actualizar órdenes" ON orders;
DROP POLICY IF EXISTS "Los admins pueden ver todos los items de órdenes" ON order_items;

-- Recrear políticas sin recursión
CREATE POLICY "Los admins pueden ver todos los perfiles" ON profiles FOR SELECT USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Solo admins pueden modificar categorías" ON categories FOR ALL USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Solo admins pueden modificar productos" ON products FOR ALL USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Los admins pueden ver todas las órdenes" ON orders FOR SELECT USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Los admins pueden actualizar órdenes" ON orders FOR UPDATE USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Los admins pueden ver todos los items de órdenes" ON order_items FOR SELECT USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
); 