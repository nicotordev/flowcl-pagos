---
id: flow-refunds-api
sidebar_position: 3
title: API de Reembolsos - FlowRefunds
---

# API de Reembolsos - FlowRefunds

El objeto `FlowRefunds` permite interactuar con la API de pagos de Flow.cl, proporcionando métodos para crear reembolsos, consultar su estado y realizar otras operaciones relacionadas.

## Inicialización

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow(
  'tu_api_key',
  'tu_secret_key',
  'sandbox', // o 'production'
);

const refunds = flow.refunds;
```

## Métodos Disponibles

### Crear un Reembolso

Permite crear un reembolso en Flow.

```typescript
refunds.create(data: FlowCreateRefundRequest): Promise<FlowCreateRefundResponse>
```

- `FlowCreateRefundRequest`: incluye campos como `refundCommerceOrder`, `receiverEmail`, `amount`, `urlCallBack`, `commerceTrxId`, `flowTrxId`.
- `FlowCreateRefundResponse`: incluye `token`, `flowRefundOrder`, `date`, `status`, `amount`, `fee`.

### Cancelar un Reembolso

Permite cancelar un reembolso en Flow.

```typescript
refunds.cancel(token: string): Promise<FlowCancelRefundResponse>
```

- `token`: token del reembolso a cancelar.
- `FlowCancelRefundResponse`: incluye `token`, `flowRefundOrder`, `date`, `status`, `amount`, `fee`.

### Obtener el estado un Reembolso

```typescript
refunds.status.byToken(token: string): Promise<FlowRefundStatusResponse>
```

- `token`: token del reembolso a obtener.
- `FlowCancelRefundResponse`: incluye `token`, `flowRefundOrder`, `date`, `status`, `amount`, `fee`.

## Manejo de Errores

| Error                                 | Descripción                                    |
| ------------------------------------- | ---------------------------------------------- |
| `FlowRefundStatusError`               | Error al obtener el estado del reembolso.      |
| `FlowCancelRefundError`               | Error al cancelar el reembolso.                |
| `FlowCreateRefundError`               | Error al crear el reembolso.                   |
| `FlowAPIError`                        | Errores relacionados con la API de Flow.       |

---

Para más detalles sobre tipos específicos, visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/refund).

---

**Nota:** Asegúrate de manejar correctamente todas las excepciones en tu aplicación.
