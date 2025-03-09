# Flow.cl SDK para Node.js

![Flow.cl](https://www.flow.cl/images/header/logo-flow.svg)

[![NPM Version](https://img.shields.io/npm/v/@nicotordev/flowcl-pagos.svg)](https://www.npmjs.com/package/@nicotordev/flowcl-pagos)
[![License](https://img.shields.io/npm/l/@nicotordev/flowcl-pagos.svg)]([LICENSE](https://github.com/nicotordev/flowcl-pagos/blob/main/LICENSE))
![Tests](https://github.com/nicotordev/flowcl-pagos/actions/workflows/test.yml/badge.svg?style=flat-square)


## Descripción

Este paquete proporciona un SDK en TypeScript para integrar:

- **Pagos**
- **Clientes**
- **Planes de suscripción**
- **Suscripciones e ítems de suscripción**
- **Reembolsos**
- **Cupones**
- **Facturas (Invoices)**
- **Liquidaciones (Settlements)**
- **Información del comercio (Merchant)**

con la API de [Flow.cl](https://www.flow.cl/) de manera sencilla y segura.

## Instalación

```sh
npm install @nicotordev/flowcl-pagos
```

```sh
yarn add @nicotordev/flowcl-pagos
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
const order = await flow.payments.create({
  commerceOrder: '123456',
  subject: 'Compra de producto',
  amount: 10000,
  email: 'cliente@example.com',
  urlReturn: 'https://tusitio.com/retorno',
  urlConfirmation: 'https://tusitio.com/confirmacion',
});

console.log('URL de pago:', order.url + '?token=' + order.token);

// Redireccionar al usuario a order.url + '?token=' + order.token || redirectUrl
```

#### Consultar el estado de un pago

```typescript
const status = await flow.payments.status.byToken('token_de_transaccion');
console.log('Estado del pago:', status.status);

// Se puede usar status.status o status.statusStr
```

### 2. Clientes

#### Crear un cliente

```typescript
const customer = await flow.customers.create{
  email: 'cliente@example.com',
  name: 'Juan Pérez',
  externalId: '123123',
});
console.log('Cliente creado:', customer);
```

### 3. Planes de suscripción

#### Crear un plan

```typescript
const plan = await flow.plans.create({
  name: 'Plan Mensual',
  amount: 5000,
  currency: 'CLP',
  interval: 3, // Monthly,
});
console.log('Plan creado:', plan);
```

### 4. Suscripciones

#### Crear una suscripción

```typescript
const subscription = await flow.subscriptions.createToPlan({
  planId: '1234',
  customerId: '5678',
});
console.log('Suscripción creada:', subscription);
```

### 5. Reembolsos

#### Solicitar un reembolso

```typescript
const refund = await flow.refunds.create({
  refundCommerceOrder: '98765',
  receiverEmail: 'example@example.com',
  amount: 5000,
  urlCallBack: 'https://tusitio.com/callback',
});
console.log('Reembolso solicitado:', refund);
```

### 6. Cupones

#### Crear un cupón

```typescript
const coupon = await flow.coupons.create({
  name: 'SomeCouponName',
  amount: 5000,
});
console.log('Cupón creado:', coupon);
```

### 7. Ítems de suscripción

#### Agregar un ítem a una suscripción

```typescript
const subscriptionItem = await flow.subscriptionsItems.create({
  name: 'SomeItemName',
  currency: 'CLP',
  amount: 1000,
});
console.log('Ítem agregado a la suscripción:', subscriptionItem);
```

### 8. Facturas (Invoices)

#### Obtener una Factura

```typescript
const invoice = await flow.invoices.get.normal('someUniqueUUid');
console.log('Factura creada:', invoice);
```

### 9. Liquidaciones (Settlements)

#### Obtener una liquidación por ID

```typescript
const settlement = await flow.settlements.getLiquidationById('stl_12345');
console.log('Liquidación:', settlement);
```

### 10. Información del comercio (Merchant)

#### Obtener información de comercios

```typescript
const merchantInfo = await flow.merchants.getAssociatedMerchants();
console.log('Información del comercio:', merchantInfo);
```

## Requisitos

- Node.js 16+
- TypeScript 5+

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request en el [repositorio de GitHub](https://github.com/nicotordev/flowcl-pagos).

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
