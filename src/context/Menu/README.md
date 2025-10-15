# 🍽️ Menu Context

**Responsabilidad**: Gestión del menú y productos del restaurante.

## Estructura

```
Menu/
├── domain/              # Entidades y reglas de negocio
│   ├── Product.ts
│   ├── ProductId.ts
│   ├── ProductName.ts
│   ├── ProductPrice.ts
│   ├── Category.ts
│   ├── ProductStatus.ts
│   └── ProductRepository.ts (interface)
├── application/         # Casos de uso y servicios
│   ├── CreateProduct.ts
│   ├── UpdateProduct.ts
│   ├── DeleteProduct.ts
│   ├── GetMenu.ts
│   ├── GetProductById.ts
│   └── MenuService.ts
└── infrastructure/      # Implementaciones concretas
    ├── ProductRepository.ts
    └── MenuDatabase.ts
```

## Entidades del Dominio

### Product

- **ProductId**: Identificador único del producto
- **Name**: Nombre del producto
- **Description**: Descripción del producto
- **Price**: Precio del producto
- **Category**: Categoría del producto
- **ImageUrl**: URL de la imagen (opcional)
- **Status**: Estado del producto (ACTIVE, INACTIVE, OUT_OF_STOCK)
- **CreatedAt**: Fecha de creación
- **UpdatedAt**: Fecha de última actualización

### Category

- **CategoryId**: Identificador único de la categoría
- **Name**: Nombre de la categoría
- **Description**: Descripción de la categoría
- **SortOrder**: Orden de visualización

## Casos de Uso

### CreateProduct

- Crear un nuevo producto
- Validar datos de entrada
- Asignar categoría
- Persistir producto

### UpdateProduct

- Actualizar información del producto
- Validar cambios
- Actualizar timestamp

### DeleteProduct

- Eliminar producto (soft delete)
- Validar que no esté en pedidos activos

### GetMenu

- Obtener menú completo
- Filtrar por categoría
- Ordenar por categoría y orden

### GetProductById

- Obtener producto específico
- Por ID del producto

## Importaciones

```typescript
// TODO: Descomentar cuando se implementen los archivos
// import { Product } from "@/context/Menu/domain/Product"
// import { CreateProduct } from "@/context/Menu/application/CreateProduct"
// import { ProductRepository } from "@/context/Menu/infrastructure/ProductRepository"
```
