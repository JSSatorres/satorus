# Configuración de Supabase con Prisma

## ✅ Configuración completada

### 1. **Variables de entorno configuradas**

- `NEXT_PUBLIC_SUPABASE_URL`: https://gxtjvxpdbaowzfvmqgep.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Tu clave anónima pública
- `DATABASE_URL`: URL de conexión a PostgreSQL de Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Clave de servicio para operaciones del servidor

### 2. **Schema de Prisma creado**

- ✅ Modelos para: User, Restaurant, Table, Menu, MenuItem, Order, OrderItem
- ✅ Enums para: UserRole, OrderStatus
- ✅ Relaciones configuradas correctamente
- ✅ Cliente de Prisma generado

### 3. **Clientes configurados**

- ✅ `src/lib/supabase.ts`: Cliente de Supabase para autenticación
- ✅ `src/lib/prisma.ts`: Cliente de Prisma para base de datos

## 🔧 Próximos pasos

### 1. **Configurar variables de entorno**

Crea un archivo `.env.local` con:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://gxtjvxpdbaowzfvmqgep.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dGp2eHBkYmFvd3pmdm1xZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMDgyNzcsImV4cCI6MjA3MzY4NDI3N30.W5lwG1EN2cgXRZq_w6db5ZqdtTCExsj3EI3BkaDBs8Q

# Database URL for Prisma (PostgreSQL)
# Obtén la contraseña de la base de datos en tu dashboard de Supabase
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.gxtjvxpdbaowzfvmqgep.supabase.co:5432/postgres"

# Supabase Service Role Key (for server-side operations)
# Obtén esta clave en Settings > API de tu proyecto Supabase
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. **Obtener credenciales de Supabase**

#### **Contraseña de la base de datos:**

1. Ve a tu dashboard de Supabase
2. Ve a **Settings > Database**
3. Copia la contraseña de la base de datos
4. Reemplaza `[YOUR_PASSWORD]` en `DATABASE_URL`

#### **Service Role Key:**

1. Ve a **Settings > API**
2. Copia la **service_role** key (no la anon key)
3. Reemplaza `your_service_role_key_here` en `SUPABASE_SERVICE_ROLE_KEY`

### 3. **Ejecutar migraciones**

```bash
# Crear y aplicar migraciones
npx prisma migrate dev --name init

# O si prefieres usar push (para desarrollo)
npx prisma db push
```

### 4. **Verificar conexión**

```bash
# Verificar que Prisma puede conectarse
npx prisma db pull

# Abrir Prisma Studio (opcional)
npx prisma studio
```

## 🚀 Uso en tu aplicación

### **Autenticación con Supabase:**

```typescript
import { supabase } from "@/lib/supabase"

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password",
})

// Registro
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password",
})
```

### **Operaciones de base de datos con Prisma:**

```typescript
import { prisma } from "@/lib/prisma"

// Crear restaurante
const restaurant = await prisma.restaurant.create({
  data: {
    name: "Mi Restaurante",
    description: "Descripción del restaurante",
    ownerId: userId,
  },
})

// Obtener restaurantes
const restaurants = await prisma.restaurant.findMany({
  where: { ownerId: userId },
  include: { tables: true, menus: true },
})
```

## 🔒 Seguridad

- ✅ **RLS (Row Level Security)**: Configura políticas en Supabase
- ✅ **Autenticación**: Usa Supabase Auth para login/registro
- ✅ **Autorización**: Valida permisos antes de operaciones de BD
- ✅ **Variables de entorno**: Nunca expongas claves sensibles

## 📚 Recursos útiles

- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Guía de autenticación con Supabase](https://supabase.com/docs/guides/auth)
- [Prisma con PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)


