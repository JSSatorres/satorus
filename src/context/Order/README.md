# 📋 Order Context

**Responsabilidad**: Gestión de pedidos y órdenes de los clientes.

## Estructura

```
Order/
├── domain/              # Entidades y reglas de negocio
│   ├── Order.ts
│   ├── OrderId.ts
│   ├── OrderLine.ts
│   ├── OrderStatus.ts
│   ├── Customer.ts
│   └── OrderRepository.ts (interface)
├── application/         # Casos de uso y servicios
│   ├── CreateOrder.ts
│   ├── UpdateOrderStatus.ts
│   ├── GetOrderHistory.ts
│   ├── AddOrderLine.ts
│   └── OrderService.ts
└── infrastructure/      # Implementaciones concretas
    ├── OrderRepository.ts
    └── OrderDatabase.ts
```

## Entidades del Dominio

### Order

- **OrderId**: Identificador único del pedido
- **TableId**: ID de la mesa (referencia a Table Context)
- **Customer**: Información del cliente
- **OrderLines**: Líneas del pedido (productos y cantidades)
- **Status**: Estado del pedido (PENDING, CONFIRMED, PREPARING, READY, DELIVERED)
- **TotalAmount**: Monto total del pedido
- **CreatedAt**: Fecha de creación
- **UpdatedAt**: Fecha de última actualización

### OrderLine

- **ProductId**: ID del producto (referencia a Menu Context)
- **Quantity**: Cantidad del producto
- **UnitPrice**: Precio unitario
- **Subtotal**: Subtotal de la línea

### Customer

- **Name**: Nombre del cliente
- **Phone**: Teléfono (opcional)
- **Email**: Email (opcional)

## Casos de Uso

### CreateOrder

- Crear un nuevo pedido
- Validar mesa disponible
- Calcular totales
- Persistir pedido

### UpdateOrderStatus

- Actualizar estado del pedido
- Validar transiciones de estado
- Notificar cambios

### GetOrderHistory

- Obtener historial de pedidos
- Por mesa, fecha o estado

### AddOrderLine

- Agregar producto al pedido
- Validar producto disponible
- Recalcular totales

## Importaciones

```typescript
// TODO: Descomentar cuando se implementen los archivos
// import { Order } from "@/context/Order/domain/Order"
// import { CreateOrder } from "@/context/Order/application/CreateOrder"
// import { OrderRepository } from "@/context/Order/infrastructure/OrderRepository"
```
