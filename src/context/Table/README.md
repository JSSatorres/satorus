# 🪑 Table Context

**Responsabilidad**: Gestión de mesas y códigos QR.

## Estructura

```
Table/
├── domain/              # Entidades y reglas de negocio
│   ├── Table.ts
│   ├── TableId.ts
│   ├── TableNumber.ts
│   ├── QRCode.ts
│   ├── TableStatus.ts
│   └── TableRepository.ts (interface)
├── application/         # Casos de uso y servicios
│   ├── CreateTable.ts
│   ├── GenerateQRCode.ts
│   ├── UpdateTableStatus.ts
│   ├── GetTableByQR.ts
│   └── TableService.ts
└── infrastructure/      # Implementaciones concretas
    ├── TableRepository.ts
    ├── QRCodeService.ts
    └── TableDatabase.ts
```

## Entidades del Dominio

### Table

- **TableId**: Identificador único de la mesa
- **TableNumber**: Número de la mesa
- **QRCode**: Código QR único de la mesa
- **Status**: Estado de la mesa (AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE)
- **Capacity**: Capacidad de la mesa (número de personas)
- **RestaurantId**: ID del restaurante (referencia a Restaurant Context)
- **CreatedAt**: Fecha de creación
- **UpdatedAt**: Fecha de última actualización

### QRCode

- **Code**: Código QR generado
- **Url**: URL que apunta al menú de la mesa
- **ExpiresAt**: Fecha de expiración (opcional)

## Casos de Uso

### CreateTable

- Crear una nueva mesa
- Validar número único
- Generar código QR
- Persistir mesa

### GenerateQRCode

- Generar código QR para mesa
- Crear URL única
- Actualizar mesa con nuevo QR

### UpdateTableStatus

- Actualizar estado de la mesa
- Validar transiciones de estado
- Notificar cambios

### GetTableByQR

- Obtener mesa por código QR
- Validar QR activo
- Retornar información de la mesa

## Importaciones

```typescript
// TODO: Descomentar cuando se implementen los archivos
// import { Table } from "@/context/Table/domain/Table"
// import { GenerateQRCode } from "@/context/Table/application/GenerateQRCode"
// import { TableRepository } from "@/context/Table/infrastructure/TableRepository"
```
