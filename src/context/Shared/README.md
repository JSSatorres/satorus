# 🔗 Shared Context

**Responsabilidad**: Elementos comunes y compartidos entre todos los contextos.

## Estructura

```
Shared/
├── domain/              # Elementos comunes del dominio
│   ├── AggregateRoot.ts
│   ├── ValueObject.ts
│   ├── DomainEvent.ts
│   ├── Entity.ts
│   └── Repository.ts (interface base)
└── infrastructure/      # Servicios compartidos
    ├── DatabaseConfig.ts
    ├── Logger.ts
    ├── EventBus.ts
    └── BaseRepository.ts
```

## Elementos del Dominio

### AggregateRoot

- Clase base para agregados
- Manejo de eventos de dominio
- Validaciones de consistencia

### ValueObject

- Clase base para objetos de valor
- Inmutabilidad
- Comparación por valor

### DomainEvent

- Clase base para eventos de dominio
- Serialización
- Timestamp

### Entity

- Clase base para entidades
- Identificador único
- Comparación por identidad

## Servicios de Infraestructura

### DatabaseConfig

- Configuración de conexión a base de datos
- Pool de conexiones
- Configuración de transacciones

### Logger

- Servicio de logging
- Diferentes niveles (DEBUG, INFO, WARN, ERROR)
- Formato estructurado

### EventBus

- Bus de eventos de dominio
- Publicación y suscripción
- Manejo asíncrono

### BaseRepository

- Implementación base para repositorios
- Operaciones CRUD comunes
- Manejo de transacciones

## Importaciones

```typescript
// TODO: Descomentar cuando se implementen los archivos
// import { AggregateRoot } from "@/context/Shared/domain/AggregateRoot"
// import { ValueObject } from "@/context/Shared/domain/ValueObject"
// import { DatabaseConfig } from "@/context/Shared/infrastructure/DatabaseConfig"
// import { Logger } from "@/context/Shared/infrastructure/Logger"
```

## Uso en Otros Contextos

```typescript
// TODO: Descomentar cuando se implementen las clases base
// En cualquier contexto, extender las clases base
// export class Restaurant extends AggregateRoot {
//   // Implementación específica del restaurante
// }

// export class ProductPrice extends ValueObject {
//   // Implementación específica del precio
// }
```
