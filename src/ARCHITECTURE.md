# 🏗️ Arquitectura Basada en Contextos (Context-Driven Architecture)

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Next.js   │  │   React     │  │  MaterialUI │        │
│  │   Pages     │  │ Components  │  │ Components  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTEXT LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Restaurant  │  │    Order    │  │    Menu     │        │
│  │   Context   │  │   Context   │  │   Context   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    Table    │  │   Shared    │  │ FileUpload  │        │
│  │   Context   │  │   Context   │  │   Context   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                INFRASTRUCTURE LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Persistence │  │   Database  │  │ External    │        │
│  │             │  │             │  │ Services    │        │
│  │ • PostgreSQL│  │ • Migrations│  │ • QR Code   │        │
│  │ • Repos     │  │ • Schemas   │  │   Generator │        │
│  │ • Models    │  │ • Queries   │  │ • Payment   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## Estructura de Contextos

Cada contexto es un **Bounded Context** que encapsula un área específica del dominio:

### 🏪 Restaurant Context

**Responsabilidad**: Gestión del restaurante y su configuración

- **Domain**: Restaurant, RestaurantId, RestaurantName, RestaurantAddress
- **Application**: CreateRestaurant, UpdateRestaurant, GetRestaurant
- **Infrastructure**: RestaurantRepository, RestaurantDatabase

### 🍽️ Menu Context

**Responsabilidad**: Gestión del menú y productos

- **Domain**: Product, ProductId, ProductName, ProductPrice, Category
- **Application**: CreateProduct, UpdateProduct, DeleteProduct, GetMenu
- **Infrastructure**: ProductRepository, MenuDatabase

### 🪑 Table Context

**Responsabilidad**: Gestión de mesas y códigos QR

- **Domain**: Table, TableId, TableNumber, QRCode, TableStatus
- **Application**: CreateTable, GenerateQRCode, UpdateTableStatus
- **Infrastructure**: TableRepository, QRCodeService

### 📋 Order Context

**Responsabilidad**: Gestión de pedidos y órdenes

- **Domain**: Order, OrderId, OrderLine, OrderStatus, Customer
- **Application**: CreateOrder, UpdateOrderStatus, GetOrderHistory
- **Infrastructure**: OrderRepository, OrderDatabase

### 🔗 Shared Context

**Responsabilidad**: Elementos comunes entre contextos

- **Domain**: AggregateRoot, ValueObject, DomainEvent
- **Infrastructure**: BaseRepository, DatabaseConfig, Logger

## Estructura de Carpetas

```
src/
├── context/                  # 🎯 Contextos del Dominio
│   ├── Restaurant/          # Contexto del Restaurante
│   │   ├── domain/         # Entidades y reglas de negocio
│   │   ├── application/    # Casos de uso y servicios
│   │   └── infrastructure/ # Implementaciones concretas
│   ├── Order/              # Contexto de Pedidos
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   ├── Menu/               # Contexto del Menú
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   ├── Table/              # Contexto de Mesas
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   └── Shared/             # Contexto Compartido
│       ├── domain/         # Elementos comunes del dominio
│       └── infrastructure/ # Servicios compartidos
├── persistence/            # 🔌 Persistencia Global
│   ├── database/          # Configuración de BD
│   ├── migrations/        # Migraciones
│   └── models/           # Modelos de datos
└── FileUpload/           # 📁 Gestión de Archivos
    ├── domain/
    ├── application/
    └── infrastructure/
```

## Flujo de Datos por Contexto

### 1. Cliente crea pedido

```
Cliente → React Component → Order Context → Order Application → Order Domain → Order Infrastructure → Persistence
```

### 2. Dueño gestiona menú

```
Dueño → React Component → Menu Context → Menu Application → Menu Domain → Menu Infrastructure → Persistence
```

### 3. Generar QR para mesa

```
Dueño → React Component → Table Context → Table Application → Table Domain → Table Infrastructure → QR Service
```

## Principios de la Arquitectura

### ✅ Bounded Contexts

- Cada contexto tiene su propio modelo de dominio
- Contextos independientes con interfaces bien definidas
- Comunicación entre contextos a través de eventos o servicios

### ✅ Domain-Driven Design

- Cada contexto encapsula un área específica del negocio
- Lenguaje ubicuo dentro de cada contexto
- Agregados y entidades bien definidos

### ✅ Separation of Concerns

- **Domain**: Lógica de negocio pura
- **Application**: Casos de uso y orquestación
- **Infrastructure**: Detalles técnicos y persistencia

### ✅ Testabilidad

- Cada contexto se puede probar independientemente
- Fácil inyección de dependencias
- Mocks específicos por contexto

## Importaciones por Contexto

```typescript
// TODO: Descomentar cuando se implementen los archivos
// ✅ Importaciones por contexto específico
// import { Restaurant } from "@/context/Restaurant/domain/Restaurant"
// import { CreateOrderUseCase } from "@/context/Order/application/CreateOrderUseCase"
// import { TableRepository } from "@/context/Table/infrastructure/TableRepository"
// import { AggregateRoot } from "@/context/Shared/domain/AggregateRoot"

// ✅ Servicios compartidos
// import { DatabaseConfig } from "@/persistence/database/DatabaseConfig"
// import { FileUploadService } from "@/FileUpload/application/FileUploadService"
```

## Ventajas de esta Arquitectura

1. **Escalabilidad**: Cada contexto puede evolucionar independientemente
2. **Mantenibilidad**: Cambios en un contexto no afectan otros
3. **Claridad**: Cada contexto tiene responsabilidades bien definidas
4. **Reutilización**: Elementos compartidos en el contexto Shared
5. **Testing**: Fácil testing por contexto
6. **Team Work**: Diferentes equipos pueden trabajar en diferentes contextos
