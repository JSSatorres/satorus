# 🏪 Restaurant Context

**Responsabilidad**: Gestión del restaurante y su configuración básica.

## Estructura

```
Restaurant/
├── domain/              # Entidades y reglas de negocio
│   ├── Restaurant.ts
│   ├── RestaurantId.ts
│   ├── RestaurantName.ts
│   ├── RestaurantAddress.ts
│   └── RestaurantRepository.ts (interface)
├── application/         # Casos de uso y servicios
│   ├── CreateRestaurant.ts
│   ├── UpdateRestaurant.ts
│   ├── GetRestaurant.ts
│   └── RestaurantService.ts
└── infrastructure/      # Implementaciones concretas
    ├── RestaurantRepository.ts
    └── RestaurantDatabase.ts
```

## Entidades del Dominio

### Restaurant

- **RestaurantId**: Identificador único del restaurante
- **RestaurantName**: Nombre del restaurante
- **RestaurantAddress**: Dirección del restaurante
- **PhoneNumber**: Número de teléfono
- **Email**: Correo electrónico
- **CreatedAt**: Fecha de creación
- **UpdatedAt**: Fecha de última actualización

## Casos de Uso

### CreateRestaurant

- Crear un nuevo restaurante
- Validar datos de entrada
- Generar ID único
- Persistir en base de datos

### UpdateRestaurant

- Actualizar información del restaurante
- Validar cambios
- Actualizar timestamp

### GetRestaurant

- Obtener información del restaurante
- Por ID o por criterios de búsqueda

## Importaciones

```typescript
// TODO: Descomentar cuando se implementen los archivos
// import { Restaurant } from "@/context/Restaurant/domain/Restaurant"
// import { CreateRestaurant } from "@/context/Restaurant/application/CreateRestaurant"
// import { RestaurantRepository } from "@/context/Restaurant/infrastructure/RestaurantRepository"
```
