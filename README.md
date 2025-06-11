# 🛍️ Jenny Kids - E-commerce de Ropa Infantil

Tienda digital moderna desarrollada con Next.js 14, Supabase y MercadoPago para el mercado colombiano.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 + App Router + TypeScript
- **Estilos**: Tailwind CSS
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Pagos**: MercadoPago (Colombia)
- **Despliegue**: Vercel
- **Monorepo**: pnpm workspaces

## 📁 Estructura del Proyecto

```
jennykids/
├── apps/
│   └── web/                 # Aplicación Next.js principal
├── packages/
│   ├── ui/                  # Componentes compartidos
│   ├── db/                  # Configuración Supabase + queries
│   └── utils/               # Utilidades y validaciones
└── package.json             # Configuración del monorepo
```

## ⚙️ Configuración Inicial

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.local` en `apps/web/` y actualiza las variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://eacwvwjecuzozenjwhww.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_SUPABASE_PROJECT_ID=eacwvwjecuzozenjwhww
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# MercadoPago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu-public-key
MERCADOPAGO_ACCESS_TOKEN=tu-access-token
MERCADOPAGO_WEBHOOK_SECRET=tu-webhook-secret

# General
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. 🗄️ Configurar Base de Datos

**IMPORTANTE**: Ejecuta el esquema SQL en Supabase:

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navega a **SQL Editor**
3. Copia y pega el contenido completo del archivo `packages/db/schema.sql`
4. Ejecuta el script

Este script creará:
- ✅ Todas las tablas necesarias
- ✅ Políticas de seguridad (RLS)
- ✅ Triggers automáticos
- ✅ Índices de rendimiento
- ✅ Categorías de ejemplo

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📦 Scripts Disponibles

```bash
# Desarrollo
pnpm dev

# Construcción
pnpm build

# Producción
pnpm start

# Linting
pnpm lint

# Verificación de tipos
pnpm type-check
```

## 🗃️ Esquema de Base de Datos

### Tablas principales:

- **profiles**: Perfiles de usuario con roles (admin/customer)
- **categories**: Categorías de productos
- **products**: Productos con imágenes y stock
- **cart_items**: Items del carrito de compras
- **orders**: Órdenes de compra
- **order_items**: Items de cada orden

### Características:

- 🔐 **Row Level Security (RLS)** habilitado
- 🔄 **Triggers automáticos** para `updated_at`
- 👤 **Creación automática de perfiles** al registrarse
- 🛡️ **Políticas de seguridad** por rol

## 🛒 Funcionalidades Planificadas

- [ ] Autenticación con email/password y Magic Link
- [ ] Catálogo de productos con filtros
- [ ] Carrito de compras persistente
- [ ] Checkout con MercadoPago
- [ ] Panel de administración
- [ ] Gestión de órdenes
- [ ] Subida de imágenes
- [ ] Notificaciones por email

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. El proyecto se desplegará automáticamente

## 🤝 Contribución

Este proyecto sigue las mejores prácticas de:
- TypeScript estricto
- Server Components por defecto
- Validación con Zod
- Comentarios en español
- Estructura escalable

---

**Desarrollado con ❤️ para Jenny Kids** 