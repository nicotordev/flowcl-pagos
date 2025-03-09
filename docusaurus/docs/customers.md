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

- `FlowCreateCustomerRequest`: `name`, `email`, `externalId`.
- `FlowCreateCustomerResponse`: `customerId`, `created`, `email`, `name`, `pay_mode`, `creditCardType`, `last4CardDigits`, `externalId`, `status`, `registerDate`.

- **Editar cliente**:

```typescript
customers.edit(data: FlowEditCustomerRequest): Promise<FlowEditCustomerResponse>
```

- `FlowEditCustomerRequest`: `customerId`, `name` (opcional), `email` (opcional), `externalId` (opcional).
- `FlowEditCustomerResponse`: Similar a `FlowCreateCustomerResponse`.

- **Eliminar cliente**:

```typescript
customers.delete(customerId: string): Promise<FlowDeleteCustomerResponse>
```

- **Obtener cliente**:

```typescript
customers.get(customerId: string): Promise<FlowGetCustomerResponse>
```

- **Listar clientes**:

```typescript
customers.list(data: FlowGetCustomerListRequest): Promise<FlowListCustomersResponse>
```

- `FlowGetCustomerListRequest`: `start`, `limit`, `filter`, `status` (todos opcionales).
- `FlowListCustomersResponse`: `total`, `hasMore`, `data`.

### Tarjetas de Crédito

- **Registrar tarjeta**:

```typescript
customers.card.register(data: FlowRegisterCardRequest): Promise<FlowRegisterCardResponse>
```

- `FlowRegisterCardRequest`: `customerId`, `url_return`.
- `FlowRegisterCardResponse`: `url`, `token`, `redirectUrl`.

- **Estado registro tarjeta**:

```typescript
customers.card.status(token: string): Promise<FlowRegisterCardStatusResponse>
```

- `FlowRegisterCardStatusResponse`: `status`, `customerId`, `creditCardType`, `last4CardDigits`.

- **Eliminar tarjeta registrada**:

```typescript
customers.card.delete(customerId: string): Promise<FlowDeleteCardResponse>
```

### Cobros

- **Cobro automático a tarjeta**:

```typescript
customers.card.charge(data: FlowChargeCardRequest): Promise<FlowChargeCardResponse>
```

- `FlowChargeCardRequest`: Detalles del cobro.
- `FlowChargeCardResponse`: `flowOrder`, `commerceOrder`, `status`, `subject`, `currency`, `amount`, `payer`, `optional`, `pending_info`, `paymentData`, `merchantId`.

- **Enviar cobro único**:

```typescript
customers.card.sendCharge(data: FlowSendChargeRequest): Promise<FlowSendChargeResponse>
```

- **Enviar cobros masivos**:

```typescript
customers.card.sendMassiveCharge(data: FlowSendMassiveChargeCardRequest): Promise<FlowSendMassiveChargeCardResponse>
```

- `FlowSendMassiveChargeCardResponse`: `token`, `receivedRows`, `acceptedRows`, `rejectedRows`.

- **Estado de cobros masivos**:

```typescript
customers.card.massiveChargeStatus(token: string): Promise<FlowMassiveChargeCardStatusResponse>
```

- **Revertir cobro**:

```typescript
customers.card.reverseCharge(data: FlowReverseChargeCardRequest): Promise<FlowReverseChargeCardResponse>
```

- `FlowReverseChargeCardRequest`: `commerceOrder`, `flowOrder` (ambos opcionales).

### Consultas y Listados

- **Listar cargos efectuados**:

```typescript
customers.card.listCharges(data: FlowListChargesRequest): Promise<FlowListChargesResponse>
```

- **Listar intentos fallidos**:

```typescript
customers.card.listFailedCharges(data: FlowListFailedChargesRequest): Promise<FlowListChargesResponse>
```

- **Listar suscripciones**:

```typescript
customers.card.subscriptions.list(data: FlowListPaginatedSubscriptionsRequest): Promise<FlowListPaginatedSubscriptionsResponse>
```

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
