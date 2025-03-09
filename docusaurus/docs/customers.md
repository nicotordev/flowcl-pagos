---
id: flow-customers-api
sidebar_position: 5
title: Clientes - FlowCustomers
---

# API de Clientes - FlowCustomers

La clase `FlowCustomers` permite interactuar fácilmente con la API de clientes de Flow.cl, ofreciendo métodos para gestionar clientes, tarjetas de crédito y cobros automáticos.

## Inicialización

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow('tu_api_key', 'tu_secret_key', 'sandbox'); // o 'production'
const customers = flow.customers;
```

## Métodos Disponibles

### Clientes

- **Crear cliente**:

```typescript
customers.create(data: FlowCreateCustomerRequest): Promise<FlowCreateCustomerResponse>
```

- **Request**: `FlowCreateCustomerRequest` incluye:

  - `name`: `string`
  - `email`: `string`
  - `externalId`: `string`

- **Response**: `FlowCreateCustomerResponse` incluye:

  - `customerId`: `string`
  - `created`: `string`
  - `email`: `string`
  - `name`: `string`
  - `pay_mode`: `number`
  - `creditCardType`: `string`
  - `last4CardDigits`: `string`
  - `externalId`: `string`
  - `status`: `number`
  - `registerDate`: `string`

- **Editar cliente**:

```typescript
customers.edit(data: FlowEditCustomerRequest): Promise<FlowEditCustomerResponse>
```

- **Request**: `FlowEditCustomerRequest` incluye:
  - `customerId`: `string`
  - `name`: `string` _(opcional)_
  - `email`: `string` _(opcional)_
  - `externalId`: `string` _(opcional)_
- **Response**: `FlowEditCustomerResponse` incluye:

  - `customerId`: `string`
  - `created`: `string`
  - `email`: `string`
  - `name`: `string`
  - `pay_mode`: `number`
  - `creditCardType`: `string`
  - `last4CardDigits`: `string`
  - `externalId`: `string`
  - `status`: `number`
  - `registerDate`: `string`

- **Eliminar cliente**:

```typescript
customers.delete(customerId: string): Promise<FlowDeleteCustomerResponse>
```

- **Request**: `customerId`.

- **Response**: `FlowDeleteCustomerResponse` incluye:

  - `customerId`: `string`
  - `created`: `string`
  - `email`: `string`
  - `name`: `string`
  - `pay_mode`: `number`
  - `creditCardType`: `string`
  - `last4CardDigits`: `string`
  - `externalId`: `string`
  - `status`: `number`
  - `registerDate`: `string`

- **Obtener cliente**:

```typescript
customers.get(customerId: string): Promise<FlowGetCustomerResponse>
```

- **Request**: `customerId`.

- **Response**: `FlowGetCustomerResponse` incluye:

  - `customerId`: `string`
  - `created`: `string`
  - `email`: `string`
  - `name`: `string`
  - `pay_mode`: `number`
  - `creditCardType`: `string`
  - `last4CardDigits`: `string`
  - `externalId`: `string`
  - `status`: `number`
  - `registerDate`: `string`

- **Listar clientes**:

```typescript
customers.list(data: FlowGetCustomerListRequest): Promise<FlowListCustomersResponse>
```

- **Request**: `FlowGetCustomerListRequest` incluye:

  - `start`: `number` _(opcional)_
  - `limit`: `number` _(opcional)_
  - `filter`: `string` _(opcional)_
  - `status`: `number` _(opcional)_

- **Response**: `FlowListCustomersResponse` incluye:
  - `total`: `number`
  - `hasMore`: `number` (`0` | `1`)
  - `data`: `string` (arreglo con clientes)

### Tarjetas de Crédito

- **Registrar tarjeta**:

```typescript
customers.card.register(data: FlowRegisterCardRequest): Promise<FlowRegisterCardResponse>
```

- **Request**: `FlowRegisterCardRequest` incluye:

  - `customerId`: `string`
  - `url_return`: `string`

- **Response**: `FlowRegisterCardResponse` incluye:

  - `url`: `string`
  - `token`: `string`
  - `redirectUrl`: `string`

- **Estado registro tarjeta**:

```typescript
customers.card.status(token: string): Promise<FlowRegisterCardStatusResponse>
```

- **Request**: `token`
- **Response**: `FlowRegisterCardStatusResponse` incluye:

  - `status`: `number` (`0` | `1`)
  - `customerId`: `string`
  - `creditCardType`: `string`
  - `last4CardDigits`: `string`

- **Eliminar tarjeta registrada**:

```typescript
customers.card.delete(customerId: string): Promise<FlowDeleteCardResponse>
```

- **Request**: `customerId`
- **Response**: `FlowDeleteCardResponse` incluye:
  - `customerId`: `string`
  - `created`: `string`
  - `email`: `string`
  - `name`: `string`
  - `pay_mode`: `number`
  - `creditCardType`: `string`
  - `last4CardDigits`: `string`
  - `externalId`: `string`
  - `status`: `number`
  - `registerDate`: `string`

### Cobros

- **Cobro automático a tarjeta**:

```typescript
customers.card.charge(data: FlowChargeCardRequest): Promise<FlowChargeCardResponse>
```

- **Request**: `FlowChargeCardRequest` incluye:
  - `customerId`: `string`
  - `amount`: `number`
  - `subject`: `string`
  - `commerceOrder`: `string`
  - `currency`: `string` _(opcional)_
  - `optionals`: `string` _(opcional)_
- **Response**: `FlowChargeCardResponse` incluye:

  - `flowOrder`: `number`
  - `commerceOrder`: `string`
  - `status`: `number` (`0` | `1`)
  - `subject`: `string`
  - `currency`: `string`
  - `amount`: `number`
  - `payer`: `string`
  - `optional`: `string` _(opcional)_
  - `pending_info`: que incluye:
    - `media`: `string`
    - `date`: `string`
  - `paymentData`: que incluye:
    - `date`: `string`
    - `amount`: `number`
    - `currency`: `string`
    - `fee`: `number`
    - `balance`: `number`
  - `merchantId`: `string`

- **Enviar cobro único**:

```typescript
customers.card.sendCharge(data: FlowSendChargeRequest): Promise<FlowSendChargeResponse>
```

- **Request**: `FlowSendChargeRequest` incluye:
  - `customerId`: `string`
  - `commerceOrder`: `string`
  - `subject`: `string`
  - `amount`: `number`
  - `urlConfirmation`: `string`
  - `urlReturn`: `string`
  - `currency`: `string` _(opcional)_
  - `paymentMethod`: `string` `FlowPaymentMethods` _(opcional)_ // Este parametro es un numero en la API de Flow, se hace una conversión interna a string
  - `byEmail`: `number` _(opcional)_ (`1`)
  - `forward_days_after`:`number` _(opcional)_
  - `forward_times`: `number` _(opcional)_
  - `ignore_auto_charging`: `number` (`1`) _(opcional)_
  - `optionals`: `string` _(opcional)_
  - `timeout`: `number` _(opcional)_
- **Response**: `FlowSendChargeResponse` incluye:

  - `type`: `number` (`1` | `2` | `3`)
  - `commerceOrder`: `string`
  - `flowOrder`: `number`
  - `token`: `string`
  - `status`: `number` (`0` | `1`)
  - `paymentData`, que incluye:
    - `flowOrder`: `number`
    - `commerceOrder`: `string`
    - `requestDate`: `string`
    - `status` `number` (`1` | `2` | `3` | `4`)
    - `subject`: `string`
    - `currency`: `string`
    - `amount`: `number`
    - `payer`: `string`
    - `optional`: `string` _(opcional)_
    - `pending_info`:
      - `media` `string` _(opcional)_
      - `date` `string` _(opcional)_
    - `paymentData`:
      - `date`: `string` _(opcional)_
      - `amount`: `number` _(opcional)_
      - `currency`: `string` _(opcional)_
      - `fee`: `number` _(opcional)_
      - `balance`: `number` _(opcional)_
    - `merchantId`: `string`

- **Enviar cobros masivos**:

```typescript
customers.card.sendMassiveCharge(data: FlowSendMassiveChargeCardRequest): Promise<FlowSendMassiveChargeCardResponse>
```

- **Request**: `FlowSendMassiveChargeCardRequest` incluye:

  - `urlCallBack`: `string`
  - `urlConfirmation`: `string`
  - `urlReturn`: `string`
  - `batchRows`: arreglo que incluye:
    - `customerId`: `string`
    - `commerceOrder`: `string`
    - `subject`: `string`
    - `amount`: `number`
    - `currency`: `string` _(opcional)_
    - `paymentMethod`: `string` `FlowPaymentMethods` _(opcional)_ // Este parametro es un numero en la API de Flow, se hace una conversión interna a string
    - `optional`: `string` _(opcional)_
  - `byEmail`: `1` _(opcional)_
  - `forward_days_after`: `number` _(opcional)_
  - `forward_times`: `number` _(opcional)_
  - `timeout`: `number` _(opcional)_

- **Response**: `FlowSendMassiveChargeCardResponse` incluye:

  - `token`: `string`
  - `receivedRows`: `number`
  - `acceptedRows`: `number`
  - `rejectedRows`: arreglo que incluye:
    - `customerId`: `string`
    - `commerceOrder`: `string`
    - `rowNumber`: `number`
    - `parameter`: `string`
    - `errorCode`: `number` (`100` | `101` | `102` | `103` | `104` | `105` | `106` | `107` | `108` | `109` | `110`)
    - `errorMsg`: `string`

- **Estado de cobros masivos**:

```typescript
customers.card.massiveChargeStatus(token: string): Promise<FlowMassiveChargeCardStatusResponse>
```

- **Request**: `token`
- **Response**: `FlowMassiveChargeCardStatusResponse` incluye:

  - `token`: `string`
  - `createdDate`: `string` (fecha en formato `yyyy-mm-dd hh:mm:ss`)
  - `processedDate`: `string` (fecha en formato `yyyy-mm-dd hh:mm:ss`)
  - `status`: `string` (`'created'` | `'processing'` | `'processed'`)
  - `collectRows`: arreglo que incluye:
    - `commerceOrder`: `string`
    - `type`: `number` (`1` | `2` | `3`)
    - `flowOrder`: `number`
    - `url`: `string`
    - `token`: `string`
    - `status`: (`'unprocessed'` | `'collected'` | `'uncollected'`)
    - `erroorCode`: `number`
    - `errorMsg`: `string`

- **Revertir cobro**:

```typescript
customers.card.reverseCharge(data: FlowReverseChargeCardRequest): Promise<FlowReverseChargeCardResponse>
```

- **Request**: `FlowReverseChargeCardRequest` incluye:
  - `commerceOrder`: `string` _(opcional)_
  - `flowOrder`: `number` _(opcional)_
- **Response**: `FlowMassiveChargeCardStatusResponse` incluye:

  - `status`: `number` (`0` | `1`)
  - `message`: `string`

- `FlowReverseChargeCardRequest`: `commerceOrder`, `flowOrder` (ambos opcionales).

### Consultas y Listados

- **Listar cargos efectuados**:

```typescript
customers.card.listCharges(data: FlowListChargesRequest): Promise<FlowListChargesResponse>
```

- **Request**: `FlowListChargesRequest` incluye:
  - `customerId`
  - `fromDate`: `string` (fecha en formato `<yyyy-mm-dd>`) _(opcional)_
  - `start`: `number` _(opcional)_
  - `limit`: `number` _(opcional)_
  - `filter`: `string` _(opcional)_
  - `status`: `number` _(opcional)_
- **Response**: `FlowListChargesResponse` incluye:

  - `total`: `number`
  - `hasMore`: `number` (`0` | `1`)
  - `data` (arreglo con cargos)

- **Listar intentos fallidos**:

```typescript
customers.card.listFailedCharges(data: FlowListFailedChargesRequest): Promise<FlowListChargesResponse>
```

- **Request**: `FlowListFailedChargesRequest` incluye:
  - `customerId`: `string`
  - `commerceOrder`: `number` _(opcional)_
  - `fromDate`: `string` (fecha en formato `<yyyy-mm-dd>`) _(opcional)_
  - `start`: `number` _(opcional)_
  - `limit`: `number` _(opcional)_
  - `filter`: `string` _(opcional)_
- **Response**: `FlowListChargesResponse` incluye:

  - `total`: `number`
  - `hasMore`: `number` (`0` | `1`)
  - `data` (arreglo con cargos)

- **Listar suscripciones**:

```typescript
customers.card.subscriptions.list(data: FlowListPaginatedSubscriptionsRequest): Promise<FlowListPaginatedSubscriptionsResponse>
```

- **Request**: `FlowListPaginatedSubscriptionsRequest` incluye:
  - `customerId`: `string`
  - `start`: `number` _(opcional)_
  - `limit`: `number` _(opcional)_
  - `filter`: `string` _(opcional)_
- **Response**: `FlowListChargesResponse` incluye:
  - `total` `number`
  - `hasMore`: `number` (`0` | `1`)
  - `data`: `string` (arreglo con cargos)

## Manejo de Errores

| Error                                 | Descripción                                       |
| ------------------------------------- | ------------------------------------------------- |
| `FlowAPIError`                        | Error genérico de la API Flow.                    |
| `FlowAuthenticationError`             | Error de autenticación.                           |
| `FlowChargeCardError`                 | Error al efectuar cobro automático.               |
| `FlowCreateCustomerError`             | Error al crear cliente.                           |
| `FlowDeleteCardError`                 | Error al eliminar tarjeta.                        |
| `FlowDeleteCustomerError`             | Error al eliminar cliente.                        |
| `FlowEditCustomerError`               | Error al editar cliente.                          |
| `FlowGetCustomerError`                | Error al obtener cliente.                         |
| `FlowGetCustomerListError`            | Error al listar clientes.                         |
| `FlowListChargesCardError`            | Error al listar cargos.                           |
| `FlowListFailedChargesCardError`      | Error al listar intentos fallidos.                |
| `FlowListPaginatedSubscriptionsError` | Error al listar suscripciones.                    |
| `FlowMassiveChargeCardStatusError`    | Error al obtener estado de cobros masivos.        |
| `FlowRegisterCardError`               | Error al registrar tarjeta.                       |
| `FlowRegisterCardStatusError`         | Error al consultar estado de registro de tarjeta. |
| `FlowReverseChargeCardError`          | Error al revertir cobro.                          |
| `FlowSendChargeCardError`             | Error al enviar cobro único.                      |
| `FlowSendMassiveChargeCardError`      | Error al enviar cobros masivos.                   |

---

Para más detalles visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/customer).

**Nota:** Maneja correctamente todas las excepciones en tu aplicación.
