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

const flow = new Flow(
  'tu_api_key',
  'tu_secret_key',
  'sandbox', // o 'production'
);

const payments = flow.payments;
```

## Métodos Disponibles

### Crear Pagos

#### Crear un pago

Crea una orden de pago.

```typescript
payments.create(data: FlowCreatePaymentRequest): Promise<FlowCreatePaymentResponse>
```

- **Request**: `FlowCreatePaymentRequest` incluye:

  - `commerceOrder`
  - `subject`
  - `currency`
  - `amount`
  - `email`
  - `paymentMethod`
  - `urlReturn`
  - `urlConfirmation`
  - `optional` (opcional)
  - `timeout` (opcional)
  - `merchantId` (opcional)
  - `paymentCurrency` (opcional)

- **Response**: `FlowCreatePaymentResponse` incluye:
  - `token`
  - `url`
  - `flowOrder`
  - `redirectUrl`

### Crear Pago por Email

Envía un pago directamente al email del cliente.

```typescript
payments.createByEmail(data: FlowCreatePaymentByEmailRequest): Promise<FlowCreatePaymentByEmailResponse>
```

- **Request**: Similar a `FlowCreatePaymentRequest`, incluye:

  - `payment_currency` (adicional).

- **Response**: Similar a `FlowCreatePaymentResponse`.

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
  - `token`
  - `url`
  - `flowOrder`
  - `redirectUrl`

### Estado Extendido del Pago

Permite obtener información extendida y detallada de un pago específico.

#### Por Token

```typescript
payments.statusExtended.byToken(token: string): Promise<FlowPaymentsStatusExtendedResponse>
```

#### Por número de orden Flow

```typescript
payments.statusExtended.byFlowOrder(flowOrder: number): Promise<FlowPaymentsStatusExtendedResponse>
```

- **Response** (`FlowPaymentsStatusExtendedResponse`) incluye:
  - `flowOrder`
  - `commerceOrder`
  - `requestDate`
  - `status`
  - `paymentData`
  - `paymentCurrency`
  - `paymentAmount`
  - `paymentMethod`
  - Otros detalles relacionados con la transacción.

## Consultas de Pagos

### Listar Pagos Recibidos por Fecha

```typescript
payments.listPaymentsByDate(data: FlowPaymentsReceivedByDateRequest): Promise<FlowPaymentsReceivedByDateResponse>
```

- **Request** (`FlowPaymentsReceivedByDateRequest`):

  - `date` (formato `YYYY-MM-DD`)
  - `start` (opcional)
  - `limit` (opcional)

- **Response** (`FlowPaymentsReceivedByDateResponse`):
  - `total`
  - `hasMore`
  - `data` (arreglo con pagos)

### Pagos Recibidos Extendidos por Fecha

Permite listar pagos y transacciones extendidas por fecha indicada.

```typescript
payments.listPaymentsExtendedByDate(data: FlowTransactionsReceivedByDateRequest): Promise<FlowTransactionsReceivedByDateResponse>
```

- **Request** (`FlowTransactionsReceivedByDateRequest`):

  - `date` (formato `YYYY-MM-DD`)
  - `start` (opcional, default: 0)
  - `limit` (opcional)

- **Response** (`FlowTransactionsReceivedByDateResponse`):
  - `total`
  - `hasMore`
  - `data`

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
