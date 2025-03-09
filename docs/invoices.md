---
id: flow-invoices-api
sidebar_position: 8
title: Facturación - FlowInvoices
---

# API de Facturación - FlowInvoices

La clase `FlowInvoices` permite gestionar la facturación en Flow.cl, proporcionando métodos para obtener información de facturas, cancelarlas, registrar pagos externos y reintentar cobros de facturas vencidas.

## Inicialización

```typescript
import Flow from "@nicotordev/flowcl-pagos";

const flow = new Flow("tu_api_key", "tu_secret_key", "sandbox"); // o 'production'
const invoices = flow.invoices;
```

## Métodos Disponibles

### Obtener datos de una factura

```typescript
invoices.get(invoiceId: string): Promise<FlowGetInvoiceDataResponse>
```

- **Request**:
  - `invoiceId`: `string` (ID de la factura)
- **Response**: `FlowGetInvoiceDataResponse`
  - `id`: `number` (ID de la factura)
  - `customerId`: `string` (ID del cliente asociado)
  - `amount`: `number` (Monto total de la factura)
  - `currency`: `string` (Moneda utilizada)
  - `status`: `number` (`0` impago, `1` pagado, `2` anulado)
  - `due_date`: `string` (Fecha de vencimiento)
  - `paymentLink`: `string` (Enlace de pago, si aplica)

### Obtener facturas vencidas

```typescript
invoices.getOverdue(data: FlowGetOverdueInvoicesRequest): Promise<FlowGetOverdueInvoicesResponse>
```

- **Request**: `FlowGetOverdueInvoicesRequest`
  - `planId`: `string` (Opcional, filtrar por plan de suscripción)
- **Response**: `FlowGetOverdueInvoicesResponse`
  - `total`: `number` (Número total de facturas vencidas)
  - `data`: `string` (Lista de facturas vencidas)

### Cancelar una factura pendiente de pago

```typescript
invoices.cancelPendingPayment(invoiceId: string): Promise<FlowCancelInvoicePendingPaymentReponse>
```

- **Request**:
  - `invoiceId`: `string` (ID de la factura a cancelar)
- **Response**: `FlowCancelInvoicePendingPaymentReponse`
  - `id`: `number` (ID de la factura cancelada)
  - `status`: `number` (`2` anulado)

### Registrar un pago externo y marcar factura como pagada

```typescript
invoices.recordExternalPaymentAndMarkInvoicePaid(
  data: FlowRecordExternalPaymentAndMarkInvoicePaidRequest
): Promise<FlowRecordExternalPaymentAndMarkInvoicePaidResponse>
```

- **Request**: `FlowRecordExternalPaymentAndMarkInvoicePaidRequest`
  - `invoiceId`: `number` (ID de la factura)
  - `date`: `string` (Fecha de pago en formato `YYYY-MM-DD`)
  - `comment`: `string` (Opcional, descripción del pago externo)
- **Response**: `FlowRecordExternalPaymentAndMarkInvoicePaidResponse`
  - `id`: `number` (ID de la factura)
  - `status`: `number` (`1` pagado)
  - `outsidePayment`: `{ date: string, comment: string }` (Datos del pago externo)

### Reintentar el cobro de una factura vencida

```typescript
invoices.retryOverdueInvoicePayment(invoiceId: string): Promise<FlowRetryOverdueInvoicePaymentResponse>
```

- **Request**:
  - `invoiceId`: `string` (ID de la factura a reintentar el cobro)
- **Response**: `FlowRetryOverdueInvoicePaymentResponse`
  - `id`: `number` (ID de la factura)
  - `status`: `number` (`0` impago, `1` pagado, `2` anulado)
  - `next_attempt_date`: `string` (Fecha del próximo intento de cobro, si aplica)

## Manejo de Errores

| Error                                              | Descripción                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------- |
| `FlowAPIError`                                     | Error genérico de la API de Flow.                                   |
| `FlowAuthenticationError`                          | Error de autenticación con la API de Flow.                          |
| `FlowGetInvoiceDataError`                          | Error al obtener los datos de una factura.                          |
| `FlowGetOverdueInvoicesError`                      | Error al obtener la lista de facturas vencidas.                     |
| `FlowCancelInvoicePendingPaymentError`             | Error al cancelar una factura pendiente de pago.                    |
| `FlowRecordExternalPaymentAndMarkInvoicePaidError` | Error al registrar un pago externo y marcar la factura como pagada. |
| `FlowRetryOverdueInvoicePaymentError`              | Error al reintentar el cobro de una factura vencida.                |

---

Para más detalles, visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/invoices).

**Nota:** Asegúrate de manejar correctamente todas las excepciones en tu aplicación.
