---
id: flow-subscriptions-items-api
sidebar_position: 6
title: Items Adicionales de Suscripciones - FlowSubscriptionsItems
---

# API de Items Adicionales de Suscripciones - FlowSubscriptionsItems

La clase `FlowSubscriptionsItems` permite asociar ítems adicionales a suscripciones en Flow.cl, proporcionando métodos para la creación, edición, eliminación, obtención y listado de estos ítems.

## Inicialización

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow('tu_api_key', 'tu_secret_key', 'sandbox'); // o 'production'
const subscriptionItems = flow.subscriptionsItems;
```

## Métodos Disponibles

### Obtener un ítem adicional de suscripción

```typescript
subscriptionItems.get(itemId: string): Promise<FlowGetAdditionalSubscriptionItemResponse>
```

- **Request**: 
  - `itemId`: `string` (ID del ítem adicional de suscripción)
- **Response**: `FlowGetAdditionalSubscriptionItemResponse`
  - `id`: `string` (ID del ítem adicional de suscripción)
  - `name`: `string` (Nombre del ítem adicional)
  - `amount`: `number` (Monto del ítem adicional)
  - `currency`: `string` (Moneda del ítem adicional)
  - `associatedSubscriptionsCount`: `number` (Número de suscripciones asociadas)
  - `status`: `number` (`0` o `1` si está activo o inactivo)
  - `createdAt`: `string` (Fecha de creación)

### Crear un nuevo ítem adicional de suscripción

```typescript
subscriptionItems.create(data: FlowCreateAdditionalSubscriptionItemRequest): Promise<FlowCreateAdditionalSubscriptionItemResponse>
```

- **Request**: `FlowCreateAdditionalSubscriptionItemRequest` incluye:
  - `name`: `string` (Nombre del ítem adicional)
  - `currency`: `string` (Moneda del ítem adicional)
  - `amount`: `number` (Monto del ítem adicional, positivo para recargo, negativo para descuento)
- **Response**: `FlowCreateAdditionalSubscriptionItemResponse`
  - `id`: `string` (ID del ítem adicional de suscripción)
  - `name`: `string` (Nombre del ítem adicional)
  - `amount`: `number` (Monto del ítem adicional)
  - `currency`: `string` (Moneda del ítem adicional)
  - `associatedSubscriptionsCount`: `number` (Número de suscripciones asociadas)
  - `status`: `number` (`0` o `1` si está activo o inactivo)
  - `createdAt`: `string` (Fecha de creación)

### Editar un ítem adicional de suscripción

```typescript
subscriptionItems.edit(data: FlowEditAdditionalSubscriptionItemRequest): Promise<FlowEditAdditionalSubscriptionItemResponse>
```

- **Request**: `FlowEditAdditionalSubscriptionItemRequest` incluye:
  - `name`: `string` (Nuevo nombre del ítem adicional, opcional)
  - `amount`: `number` (Nuevo monto del ítem adicional)
  - `changeType`: `'to_future' | 'all'` (Aplicación del cambio solo a futuras suscripciones o a todas)
- **Response**: `FlowEditAdditionalSubscriptionItemResponse`
  - `id`: `string` (ID del ítem adicional de suscripción)
  - `name`: `string` (Nombre del ítem adicional)
  - `amount`: `number` (Monto del ítem adicional)
  - `currency`: `string` (Moneda del ítem adicional)
  - `associatedSubscriptionsCount`: `number` (Número de suscripciones asociadas)
  - `status`: `number` (`0` o `1` si está activo o inactivo)
  - `createdAt`: `string` (Fecha de creación)
### Eliminar un ítem adicional de suscripción

```typescript
subscriptionItems.delete(itemId: string, changeType: 'to_future' | 'all'): Promise<FlowDeleteAdditionalSubscriptionItemResponse>
```

- **Request**:
  - `itemId`: `string` (ID del ítem adicional de suscripción)
  - `changeType`: `'to_future' | 'all'` (Eliminar solo en futuras suscripciones o en todas)
- **Response**: `FlowDeleteAdditionalSubscriptionItemResponse`
  - `id`: `string` (ID del ítem adicional de suscripción)
  - `name`: `string` (Nombre del ítem adicional)
  - `amount`: `number` (Monto del ítem adicional)
  - `currency`: `string` (Moneda del ítem adicional)
  - `associatedSubscriptionsCount`: `number` (Número de suscripciones asociadas)
  - `status`: `number` (`0` o `1` si está activo o inactivo)
  - `createdAt`: `string` (Fecha de creación)
### Listar ítems adicionales de suscripción

```typescript
subscriptionItems.list(data: FlowListAdditionalSubscriptionItemRequest): Promise<FlowListAdditionalSubscriptionItemResponse>
```

- **Request**: `FlowListAdditionalSubscriptionItemRequest` incluye:
  - `start`: `number` (Número de inicio de la lista, opcional)
  - `limit`: `number` (Número de ítems por página, opcional)
  - `filter`: `string` (Filtro por nombre, opcional)
- **Response**: `FlowListAdditionalSubscriptionItemResponse`
  - `total`: `number` (Número total de ítems adicionales de suscripción)
  - `hasMore`: `number` (`0` o `1` si hay más ítems)
  - `data`: `string` (Array de ítems adicionales de suscripción)
## Manejo de Errores

| Error                                        | Descripción                                        |
|---------------------------------------------|----------------------------------------------------|
| `FlowAPIError`                               | Error genérico de la API de Flow.                  |
| `FlowAuthenticationError`                    | Error de autenticación con la API de Flow.         |
| `FlowCreateAdditionalSubscriptionItemError`  | Error al crear un ítem adicional de suscripción.   |
| `FlowEditAdditionalSubscriptionItemError`    | Error al editar un ítem adicional de suscripción.  |
| `FlowDeleteAdditionalSubscriptionItemError`  | Error al eliminar un ítem adicional de suscripción.|
| `FlowGetAdditionalSubscriptionItemError`     | Error al obtener un ítem adicional de suscripción. |
| `FlowListAdditionalSubscriptionItemError`    | Error al listar ítems adicionales de suscripción.  |

---

Para más detalles visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/subscription_items).

**Nota:** Asegúrate de manejar correctamente todas las excepciones en tu aplicación.