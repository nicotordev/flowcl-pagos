# Flow.cl SDK para Node.js

![Flow.cl](https://www.flow.cl/images/header/logo-flow.svg)

[![NPM Version](https://img.shields.io/npm/v/@nicotordev/flowcl-pagos.svg)](https://www.npmjs.com/package/@nicotordev/flowcl-pagos)
[![License](https://img.shields.io/npm/l/@nicotordev/flowcl-pagos.svg)](LICENSE)
![Tests](https://github.com/nicotordev/flowcl-pagos/actions/workflows/test.yml/badge.svg?style=flat-square)

## Descripción

Este paquete proporciona un SDK en TypeScript para integrar pagos, clientes, planes de suscripción, reembolsos y suscripciones con la API de Flow.cl de manera sencilla y segura.

## Instalación

```sh
npm install @nicotordev/flowcl-pagos
```

## Uso

### Importar y configurar el cliente

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow(
  'tu_api_key',
  'tu_secret_key',
  'sandbox', // o 'production'
);
```

## Funcionalidades principales

### 1. Pagos

#### Crear una orden de pago

```typescript
const order = await flow.payments.createOrder({
  commerceOrder: '123456',
  subject: 'Compra de producto',
  amount: 10000,
  email: 'cliente@example.com',
  urlReturn: 'https://tusitio.com/retorno',
  urlConfirmation: 'https://tusitio.com/confirmacion',
});

console.log('URL de pago:', order.url + '?token=' + order.token);
```

#### Consultar el estado de un pago

```typescript
const status = await flow.payments.getPaymentStatus('token_de_transaccion');
console.log('Estado del pago:', status.status);
```

### 2. Clientes

#### Crear un cliente

```typescript
const customer = await flow.customers.createCustomer({
  email: 'cliente@example.com',
  name: 'Juan Pérez',
});
```

### 3. Planes de suscripción

#### Crear un plan

```typescript
const plan = await flow.plans.createPlan({
  name: 'Plan Mensual',
  amount: 5000,
  currency: 'CLP',
  frequency: 'monthly',
});
```

### 4. Suscripciones

#### Crear una suscripción

```typescript
const subscription = await flow.subscriptions.createSubscription({
  planId: '1234',
  customerId: '5678',
});
```

### 5. Reembolsos

#### Solicitar un reembolso

```typescript
const refund = await flow.refunds.createRefund({
  flowOrder: '98765',
  amount: 5000,
  reason: 'Producto defectuoso',
});
```

## Requisitos

- Node.js 16+
- TypeScript 5+

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request en el [repositorio de GitHub](https://github.com/nicotordev/flowcl-pagos).

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
