---
id: flow-payments-api
sidebar_position: 3
title: Pagos - FlowPayments
---

# API de Pagos - FlowPayments

La clase `FlowPayments` permite interactuar con la API de Pagos de Flow.cl, proporcionando métodos para crear, consultar y gestionar pagos realizados mediante la plataforma.

## Inicialización

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow: Flow = new Flow(
  'tu_api_key', // string
  'tu_secret_key',
  'sandbox', // o 'production'
);

const payments = flow.payments;
```

## Métodos Disponibles

### Crear Pagos

#### Crear un pago

```typescript
payments.create(data: FlowCreatePaymentRequest): Promise<FlowCreatePaymentResponse>
```

- **Request** (`FlowCreatePaymentRequest`):

  - `commerceOrder`: `string`
  - `subject`: `string`
  - `currency`: `string` _(opcional)_
  - `amount`: `number`
  - `email`: `string`
  - `paymentMethod`: `string` `FlowPaymentMethods` _(opcional)_ // Este parametro es un numero en la API de Flow, se hace una conversión interna a string
  - `urlReturn`: `string`
  - `urlConfirmation`: `string`
  - `optional`: `Record<string, string>` _(opcional)_
  - `timeout`: `number` _(opcional)_
  - `merchantId`: `string` _(opcional)_
  - `paymentCurrency`: `string` _(opcional)_

- **Response** (`FlowCreatePaymentResponse`):

  - `token`: `string`
  - `url`: `string`
  - `flowOrder`: `number`
  - `redirectUrl`: `string`

### Crear Pago por Email

```typescript
payments.createByEmail(data: FlowCreatePaymentByEmailRequest): Promise<FlowCreatePaymentByEmailResponse>
```

- **Request** (`FlowCreatePaymentByEmailRequest`):

  - `commerceOrder`: `string`
  - `subject`: `string`
  - `currency`: `string` _(opcional)_
  - `amount`: `number`
  - `email`: `string`
  - `paymentMethod`: `string` `FlowPaymentMethods` _(opcional)_ // Este parametro es un numero en la API de Flow, se hace una conversión interna a string
  - `urlConfirmation`: `string`
  - `urlReturn`: `string`
  - `optional`: `string` _(opcional)_
  - `timeout`: `number` _(opcional)_
  - `merchantId`: `string` _(opcional)_
  - `payment_currency`: `string` _(opcional)_

- **Response** (`FlowCreatePaymentByEmailResponse`):

  - `token`: `string`
  - `url`: `string`
  - `flowOrder`: `number`
  - `redirectUrl`: `string`

## Consultar Estado del Pago

### Estado por Token

```typescript
payments.status.byToken(token: string): Promise<FlowPaymentStatusResponse>
```

### Estado por ID del Comercio

```typescript
payments.status.byCommerceId(commerceId: string): Promise<FlowPaymentStatusResponse>
```

### Estado por Número de Orden Flow

```typescript
payments.status.byFlowOrder(flowOrder: number): Promise<FlowPaymentStatusResponse>
```

- **Response** (`FlowPaymentStatusResponse`):

  - `flowOrder`: `number`
  - `commerceOrder`: `string`
  - `requestDate`: `string`
  - `status`: `number` `1 | 2 | 3 | 4`
  - `statusStr`: `FlowPaymentStatus`
  - `subject`: `string`
  - `currency`: `string`
  - `amount`: `number`
  - `payer`: `string`
  - `optional`: `string | null`
  - `pendingInfo`: `{`
    - `media`: `string`
    - `date`: `string`
      `}`
  - `paymentData`: `{`
    - `date`: string | null;
    - `media`: string | null;
    - `conversionDate`: string | null;
    - `conversionRate`: number | null;
    - `amount`: number | null;
    - `currency`: string | null;
    - `fee`: number | null;
    - `balance`: number | null;
    - `transferDate`: string | null;
      `}` _(opcional)_
  - `merchantId`: `string` _(opcional)_

### Estado Extendido del Pago

#### Por Token

```typescript
payments.statusExtended.byToken(token: string): Promise<FlowPaymentsStatusExtendedResponse>
```

#### Por número de orden Flow

```typescript
payments.statusExtended.byFlowOrder(flowOrder: number): Promise<FlowPaymentsStatusExtendedResponse>
```

- **Response** (`FlowPaymentsStatusExtendedResponse`):
  - `flowOrder`: `number`
  - `commerceOrder`: `string`
  - `requestDate`: `string`
  - `status`: `1 | 2 | 3 | 4`
  - `statusStr`: `FlowPaymentStatus`
  - `subject`: `string`
  - `currency`: `string`
  - `amount`: `number`
  - `payer`: `string`
  - `optional`: `Record<string, unknown> | null`
  - `pendingInfo`: `{`
    - `media`: `string`
    - `date`: `string`
      `}`
  - `paymentData`: `{`
    - `date`: string | null;
    - `media`: string | null;
    - `conversionDate`: string | null;
    - `conversionRate`: number | null;
    - `amount`: number | null;
    - `currency`: string | null;
    - `fee`: number | null;
    - `balance`: number | null;
    - `transferDate`: string | null;
      `}` _(opcional)_
  - `paymentCurrency`: `string`
  - `paymentAmount`: `number`
  - `paymentMethod`: `string` `FlowPaymentMethods` _(opcional)_ // Este parametro es un numero en la API de Flow, se hace una conversión interna a string
  - `merchantId`: `string` _(opcional)_
  - `lastError`: `{`
    - `medioCode`: `string`
    - `code`: `string`
    - `message`: `string`
  `}`_(opcional)_

## Consultas de Pagos

### Listar Pagos Recibidos por Fecha

```typescript
payments.listPaymentsByDate(data: FlowPaymentsReceivedByDateRequest): Promise<FlowPaymentsReceivedByDateResponse>
```

- **Request** (`FlowPaymentsReceivedByDateRequest`):

  - `date`: `string | Date`
  - `start`: `number` _(opcional)_
  - `limit`: `number` _(opcional)_

- **Response** (`FlowPaymentsReceivedByDateResponse`):
  - `total`: `number`
  - `hasMore`: `0 | 1`
  - `data`: `string`

### Pagos Recibidos Extendidos por Fecha

```typescript
payments.listPaymentsExtendedByDate(data: FlowTransactionsReceivedByDateRequest): Promise<FlowTransactionsReceivedByDateResponse>
```

- **Request** (`FlowTransactionsReceivedByDateRequest`):

  - `date`: `string | Date`
  - `start`: `number` _(opcional)_
  - `limit`: `number` _(opcional)_

- **Response** (`FlowTransactionsReceivedByDateResponse`):
  - `total`: `number`
  - `hasMore`: `0 | 1`
  - `data`: `string`

## Manejo de Errores

| Error                             | Descripción                                    |
| --------------------------------- | ---------------------------------------------- |
| `FlowAPIError`                    | Error general de API de Flow.                  |
| `FlowCreatePaymentError`          | Error al crear un pago.                        |
| `FlowCreatePaymentByEmailError`   | Error al crear un pago por email.              |
| `FlowPaymentStatusError`          | Error al obtener el estado del pago.           |
| `FlowPaymentsListError`           | Error al listar pagos por fecha.               |
| `FlowPaymentsStatusExtendedError` | Error al obtener el estado extendido del pago. |

---

Para información adicional, visita la documentación oficial: [Flow.cl API Docs - Payments](https://www.flow.cl/docs/api.html#tag/payment).

**Nota:** Implementa siempre control de errores robusto en tu aplicación.
