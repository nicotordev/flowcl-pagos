---
id: flow-payments-api
sidebar_position: 2
title: API de Pagos - FlowPayments
---

# API de Pagos - FlowPayments

El objeto `FlowPayments` permite interactuar con la API de pagos de Flow.cl, proporcionando métodos para crear pagos, consultar su estado y realizar otras operaciones relacionadas.

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

### Crear un pago

Permite crear una orden de pago en Flow.

```typescript
payments.create(data: FlowCreatePaymentRequest): Promise<FlowCreatePaymentResponse>
```

- `FlowCreatePaymentRequest`: incluye campos como `commerceOrder`, `subject`, `currency`, `amount`, `email`, `paymentMethod`, `urlReturn`, `urlConfirmation`, `optional`, `timeout`, `merchantId` y `paymentCurrency`.
- `FlowCreatePaymentResponse`: incluye `token`, `url`, `flowOrder`, `redirectUrl`.

### Crear un pago por email

Genera un cobro enviando un email al pagador.

```typescript
payments.createByEmail(data: FlowCreatePaymentByEmailRequest): Promise<FlowCreatePaymentByEmailResponse>
```

- `FlowCreatePaymentByEmailRequest`: incluye `commerceOrder`, `subject`, `currency`, `amount`, `email`, `paymentMethod`, `urlConfirmation`, `urlReturn`, `optional`, `timeout`, `merchantId`, `payment_currency`.
- `FlowCreatePaymentByEmailResponse`: incluye `token`, `url`, `flowOrder`, `redirectUrl`.

### Consultar estado de pago

#### Por token

```typescript
payments.status.byToken(token: string): Promise<FlowPaymentStatusResponse>
```

- `FlowPaymentStatusResponse`: incluye `token`, `url`, `flowOrder`, `redirectUrl`.

#### Por identificador de comercio

```typescript
payments.status.byCommerceId(commerceId: string): Promise<FlowPaymentStatusResponse>
```

- `FlowPaymentStatusResponse`: incluye `token`, `url`, `flowOrder`, `redirectUrl`.

#### Por número de orden de Flow

```typescript
payments.status.byFlowOrderNumber(flowOrder: number): Promise<FlowPaymentStatusResponse>
```

- `FlowPaymentStatusResponse`: incluye información como `flowOrder`, `commerceOrder`, `requestDate`, `status`, `statusStr`, `subject`, `currency`, `amount`, `payer`, `optional`, `pendingInfo`, `paymentData`, `merchantId`.

### Obtener pagos recibidos por fecha

```typescript
payments.listPaymentsByDate(data: FlowPaymentsReceivedByDateRequest): Promise<FlowPaymentsReceivedByDateResponse>
```

- `FlowPaymentsReceivedByDateRequest`: requiere una fecha en formato `YYYY-MM-DD`.
- `FlowPaymentsReceivedByDateResponse`: incluye paginación con `total`, `hasMore`, y los datos específicos recibidos en la fecha indicada.

### Obtener transacciones recibidas por fecha

```typescript
payments.listTransactionsByDate(data: FlowTransactionsReceivedByDateRequest): Promise<FlowTransactionsReceivedByDateResponse>
```

- `FlowTransactionsReceivedByDateRequest`: requiere `date` (una fecha en formato `YYYY-MM-DD`), `start` (Número de registro de inicio de la página. Si se omite, el valor por defecto es `0`.) y `limit` (Número de registros por página).
- `FlowTransactionsReceivedByDateResponse`: incluye paginación con `total`, `hasMore`, y los datos específicos recibidos en la fecha indicada.

- Similar a la respuesta anterior, pero para transacciones específicas.

### Estado extendido del pago

#### Por token

```typescript
payments.statusExtended.byToken(token: string): Promise<FlowPaymentsStatusExtendedResponse>
```

#### Por número de orden de Flow

```typescript
payments.statusExtended.byFlowOrder(flowOrder: number): Promise<FlowPaymentsStatusExtendedResponse>
```

- `FlowPaymentsStatusExtendedResponse`: proporciona detalles avanzados sobre el estado del pago incluyendo información adicional de pagos, conversión de moneda, impuestos, y otros detalles específicos del pago, por ejemplo 

```typescript
type FlowPaymentsStatusExtendedResponse = {
  /**
   * The Flow order number.
   */
  flowOrder: number;

  /**
   * The commerce order number.
   */
  commerceOrder: string;

  /**
   * The order creation date in format yyyy-mm-dd hh:mm:ss.
   */
  requestDate: string;

  /**
   * The order status:
   * 1 - Pending payment
   * 2 - Paid
   * 3 - Rejected
   * 4 - Canceled
   */
  status: 1 | 2 | 3 | 4;

  ...otherProps
}
```

## Manejo de Errores

| Error                                 | Descripción                                    |
| ------------------------------------- | ---------------------------------------------- |
| `FlowCreatePaymentError`              | Error al crear el pago.                        |
| `FlowCreatePaymentByEmailError`       | Error al crear el pago por email.              |
| `FlowPaymentStatusError`              | Error al obtener el estado del pago.           |
| `FlowPaymentsReceivedByDateError`     | Error al obtener pagos por fecha.              |
| `FlowTransactionsReceivedByDateError` | Error al obtener transacciones por fecha.      |
| `FlowStatusExtendedError`             | Error al obtener el estado extendido del pago. |
| `FlowAPIError`                        | Errores relacionados con la API de Flow.       |

---

Para más detalles sobre tipos específicos, visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#section/Introduccion).

---

**Nota:** Asegúrate de manejar correctamente todas las excepciones en tu aplicación.
