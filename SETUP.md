# 🔧 Configuración del Proyecto Jenny Kids

## 📋 Requisitos Previos

- Node.js 18+ 
- pnpm 8+
- Cuenta de Supabase
- Cuenta de MercadoPago (Colombia)

## 🚀 Configuración Inicial

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd jennykids
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea el archivo `apps/web/.env.local` con las siguientes variables:

```env
# Configuración de Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
NEXT_PUBLIC_SUPABASE_PROJECT_ID=tu-proyecto-id

# Configuración de MercadoPago (Colombia)
MP_ACCESS_TOKEN=tu_access_token
MP_PUBLIC_KEY=tu_public_key

# URL base de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Configurar Supabase

1. Ve a [Supabase](https://app.supabase.com/)
2. Crea un nuevo proyecto
3. **IMPORTANTE**: Ejecuta PRIMERO el esquema SQL desde `packages/db/schema.sql`
4. **CRÍTICO**: Ejecuta DESPUÉS el script de corrección desde `packages/db/fix-policies.sql` para arreglar las políticas RLS
5. Copia las credenciales a tu archivo `.env.local`

**⚠️ NOTA IMPORTANTE**: Si ves el error `infinite recursion detected in policy for relation "profiles"`, significa que necesitas ejecutar el archivo `packages/db/fix-policies.sql` en el SQL Editor de Supabase.

### 5. Ejecutar el proyecto

```bash
pnpm dev
```

El proyecto estará disponible en `http://localhost:3000`

## 🔒 Seguridad

- **NUNCA** subas archivos `.env*` al repositorio
- Las credenciales de Supabase y MercadoPago son sensibles
- Usa variables de entorno diferentes para producción

## 📁 Estructura del Proyecto

```
jennykids/
├── apps/web/          # Aplicación Next.js principal
├── packages/
│   ├── ui/           # Componentes reutilizables
│   ├── db/           # Configuración y queries de Supabase
│   └── utils/        # Utilidades compartidas
└── README.md
```

## 🛠️ Scripts Disponibles

- `pnpm dev` - Ejecutar en modo desarrollo
- `pnpm build` - Construir para producción
- `pnpm start` - Ejecutar en modo producción
- `pnpm lint` - Ejecutar linter 