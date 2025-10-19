# 🔌 Persistence Layer

**Responsabilidad**: Configuración global de persistencia y base de datos.

## Estructura

```
persistence/
├── database/            # Configuración de base de datos
│   ├── DatabaseConfig.ts
│   ├── ConnectionPool.ts
│   └── Migrations/
├── migrations/          # Migraciones de base de datos
│   ├── 001_create_restaurants.sql
│   ├── 002_create_tables.sql
│   ├── 003_create_products.sql
│   └── 004_create_orders.sql
└── models/             # Modelos de datos globales
    ├── BaseModel.ts
    ├── RestaurantModel.ts
    ├── TableModel.ts
    ├── ProductModel.ts
    └── OrderModel.ts
```

## Configuración de Base de Datos

### DatabaseConfig

- Configuración de conexión PostgreSQL
- Variables de entorno
- Pool de conexiones
- Configuración de SSL

### ConnectionPool

- Manejo del pool de conexiones
- Reconexión automática
- Monitoreo de conexiones

## Migraciones

### Estructura de Tablas

- **restaurants**: Información de restaurantes
- **tables**: Mesas del restaurante
- **products**: Productos del menú
- **orders**: Pedidos de clientes
- **order_lines**: Líneas de pedido

### Ejecución de Migraciones

```bash
npm run migrate:up    # Ejecutar migraciones
npm run migrate:down  # Revertir migraciones
npm run migrate:status # Estado de migraciones
```

## Modelos de Datos

### BaseModel

- Clase base para todos los modelos
- Timestamps automáticos
- Validaciones básicas

### Modelos Específicos

- **RestaurantModel**: Mapeo a tabla restaurants
- **TableModel**: Mapeo a tabla tables
- **ProductModel**: Mapeo a tabla products
- **OrderModel**: Mapeo a tabla orders

## Importaciones

```typescript
// TODO: Descomentar cuando se implementen los archivos
// import { DatabaseConfig } from "@/persistence/database/DatabaseConfig"
// import { RestaurantModel } from "@/persistence/models/RestaurantModel"
// import { runMigrations } from "@/persistence/migrations/migrate"
```
