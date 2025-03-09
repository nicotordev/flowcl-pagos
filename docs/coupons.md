---
id: flow-coupons-api
sidebar_position: 7
title: Cupones de Descuento - FlowCoupons
---

# API de Cupones de Descuento - FlowCoupons

La clase `FlowCoupons` permite gestionar cupones de descuento en Flow.cl, proporcionando métodos para la creación, edición, eliminación, obtención y listado de estos cupones.

## Inicialización

```typescript
import Flow from "@nicotordev/flowcl-pagos";

const flow = new Flow("tu_api_key", "tu_secret_key", "sandbox"); // o 'production'
const coupons = flow.coupons;
```

## Métodos Disponibles

### Obtener un cupón de descuento

```typescript
coupons.get(couponId: string): Promise<FlowGetDiscountCouponResponse>
```

- **Request**:
  - `couponId`: `string` (ID del cupón de descuento)
- **Response**: `FlowGetDiscountCouponResponse`
  - `id`: `string` (ID del cupón de descuento)
  - `name`: `string` (Nombre del cupón)
  - `percent_off`: `number | null` (Descuento en porcentaje, si aplica)
  - `amount`: `number | null` (Monto del descuento, si aplica)
  - `currency`: `string | null` (Moneda del descuento, si aplica)
  - `status`: `number` (`0` o `1` si está activo o inactivo)
  - `createdAt`: `string` (Fecha de creación)

### Crear un nuevo cupón de descuento

```typescript
coupons.create(data: FlowCreateDiscountCouponRequest): Promise<FlowCreateDiscountCouponResponse>
```

- **Request**: `FlowCreateDiscountCouponRequest` incluye:
  - `name`: `string` (Nombre del cupón)
  - `percent_off`: `number | null` (Descuento en porcentaje, opcional)
  - `currency`: `string | null` (Moneda del descuento, opcional)
  - `amount`: `number | null` (Monto del descuento, opcional)
  - `duration`: `0 | 1` (Duración del cupón: indefinida = 0, definida = 1)
  - `times`: `number | null` (Número de veces aplicable, opcional)
  - `max_redemptions`: `number | null` (Número máximo de usos, opcional)
  - `expires`: `string` (Fecha de expiración en formato `YYYY-MM-DD`)
- **Response**: `FlowCreateDiscountCouponResponse`
  - `id`: `string` (ID del cupón de descuento)
  - `name`: `string` (Nombre del cupón)
  - `percent_off`: `number | null` (Descuento en porcentaje, si aplica)
  - `amount`: `number | null` (Monto del descuento, si aplica)
  - `currency`: `string | null` (Moneda del descuento, si aplica)
  - `status`: `number` (`0` o `1` si está activo o inactivo)
  - `created`: `string` (Fecha de creación)
  - `duration`: `number` (`0` o `1` si es indefinido o definido)
  - `times`: `number | null` (Número de veces aplicable, si aplica)
  - `max_redemptions`: `number | null` (Número máximo de usos, si aplica)
  - `expires`: `string` (Fecha de expiración)

### Editar un cupón de descuento

```typescript
coupons.edit(data: FlowEditDiscountCouponRequest): Promise<FlowEditDiscountCouponResponse>
```

- **Request**: `FlowEditDiscountCouponRequest` incluye:
  - `couponId`: `string` (ID del cupón a editar)
  - `name`: `string` (Nuevo nombre del cupón)
- **Response**: `FlowEditDiscountCouponResponse`
  - Contiene la información del cupón editado.

### Eliminar un cupón de descuento

```typescript
coupons.delete(couponId: string): Promise<FlowDeleteDiscountCouponResponse>
```

- **Request**:
  - `couponId`: `string` (ID del cupón a eliminar)
- **Response**: `FlowDeleteDiscountCouponResponse`
  - Contiene la información del cupón eliminado.

### Listar cupones de descuento

```typescript
coupons.list(data: FlowListDiscountCouponsRequest): Promise<FlowListDiscountCouponsResponse>
```

- **Request**: `FlowListDiscountCouponsRequest` incluye:
  - `start`: `number` (Número de inicio de la lista, opcional)
  - `limit`: `number` (Número de cupones por página, opcional)
  - `filter`: `string` (Filtro por nombre, opcional)
- **Response**: `FlowListDiscountCouponsResponse`
  - `total`: `number` (Número total de cupones de descuento)
  - `hasMore`: `number` (`0` o `1` si hay más cupones)
  - `data`: `FlowCoupon[]` (Array de cupones de descuento)

## Manejo de Errores

| Error                           | Descripción                                |
| ------------------------------- | ------------------------------------------ |
| `FlowAPIError`                  | Error genérico de la API de Flow.          |
| `FlowAuthenticationError`       | Error de autenticación con la API de Flow. |
| `FlowCreateDiscountCouponError` | Error al crear un cupón de descuento.      |
| `FlowEditDiscountCouponError`   | Error al editar un cupón de descuento.     |
| `FlowDeleteDiscountCouponError` | Error al eliminar un cupón de descuento.   |
| `FlowGetDiscountCouponError`    | Error al obtener un cupón de descuento.    |
| `FlowListDiscountCouponsError`  | Error al listar cupones de descuento.      |

---

Para más detalles, visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/discount_coupons).

**Nota:** Asegúrate de manejar correctamente todas las excepciones en tu aplicación.
