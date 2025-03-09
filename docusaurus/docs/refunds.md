---
id: flow-refunds-api
sidebar_position: 4
title: Reembolsos - FlowRefunds
---

# API de Reembolsos - FlowRefunds

La clase `FlowRefunds` permite interactuar de forma sencilla con la API de Reembolsos de Flow.cl, ofreciendo métodos para crear, cancelar y consultar el estado de reembolsos.

## Inicialización

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow('tu_api_key', 'tu_secret_key', 'sandbox'); // o 'production'
const refunds = flow.refunds;
```

## Métodos Disponibles

### Crear Reembolso

Permite solicitar un reembolso en Flow.

```typescript
refunds.create(data: FlowCreateRefundRequest): Promise<FlowCreateRefundResponse>
```

- `FlowCreateRefundRequest`:

  - `refundCommerceOrder`
  - `receiverEmail`
  - `amount`
  - `urlCallBack`
  - `commerceTrxId`
  - `flowTrxId`

- `FlowCreateRefundResponse`:
  - `token`
  - `flowRefundOrder`
  - `date`
  - `status`
  - `amount`
  - `fee`

### Cancelar Reembolso

Permite cancelar una solicitud de reembolso existente.

```typescript
refunds.cancel(token: string): Promise<FlowCancelRefundResponse>
```

- `token`: Token del reembolso a cancelar.

- `FlowCancelRefundResponse`:
  - `token`
  - `flowRefundOrder`
  - `date`
  - `status`
  - `amount`
  - `fee`

### Estado del Reembolso

Consulta el estado de un reembolso.

```typescript
refunds.status.byToken(token: string): Promise<FlowRefundStatusResponse>
```

- `token`: Token del reembolso.

- `FlowRefundStatusResponse`:
  - `token`
  - `flowRefundOrder`
  - `date`
  - `status`
  - `amount`
  - `fee`

## Manejo de Errores

| Error                   | Descripción                               |
| ----------------------- | ----------------------------------------- |
| `FlowCreateRefundError` | Error al crear un reembolso.              |
| `FlowCancelRefundError` | Error al cancelar un reembolso.           |
| `FlowRefundStatusError` | Error al obtener el estado del reembolso. |
| `FlowAPIError`          | Error genérico relacionado con la API.    |

---

Para más información, visita la documentación oficial: [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/refund).

**Nota:** Asegúrate de manejar correctamente todas las excepciones en tu aplicación.
