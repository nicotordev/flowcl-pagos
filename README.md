# Flow.cl SDK para Node.js

![Flow.cl](https://www.flow.cl/images/header/logo-flow.svg)

[![NPM Version](https://img.shields.io/npm/v/@nicotordev/flowcl-pagos.svg)](https://www.npmjs.com/package/@nicotordev/flowcl-pagos)
[![License](https://img.shields.io/npm/l/@nicotordev/flowcl-pagos.svg)](LICENSE)

## Descripción

Este paquete proporciona un SDK en TypeScript para integrar pagos con la API de Flow.cl de manera sencilla y segura.

## Instalación

```sh
npm install @nicotordev/flowcl-pagos
```

## Uso

### Importar y configurar el cliente

```typescript
import FlowClient from '@nicotordev/flowcl-pagos';

const flow = new FlowClient(
  'tu_api_key',
  'tu_secret_key',
  'sandbox' // o 'production'
);
```

### Crear una orden de pago

```typescript
const order = await flow.createOrder({
  commerceOrder: '123456',
  subject: 'Compra de producto',
  amount: 10000,
  email: 'cliente@example.com',
  urlReturn: 'https://tusitio.com/retorno',
  urlConfirmation: 'https://tusitio.com/confirmacion'
});

console.log('URL de pago:', order.url + '?token=' + order.token);
```

### Consultar el estado de un pago

```typescript
const status = await flow.getPaymentStatus('token_de_transaccion');
console.log('Estado del pago:', status.status);
```

## Tipos de datos

### `FlowCreatePaymentRequest`

- `commerceOrder`: Número único de orden.
- `subject`: Descripción de la orden.
- `amount`: Monto total en CLP.
- `email`: Correo del pagador.
- `urlReturn`: URL de retorno tras el pago.
- `urlConfirmation`: URL para recibir confirmaciones.
- `paymentMethod` (opcional): Medio de pago específico.

### `FlowCreatePaymentResponse`

- `token`: Identificador de la transacción.
- `url`: URL de pago.
- `flowOrder`: Número de orden en Flow.

### `FlowPaymentStatusResponse`

- `flowOrder`: Número de orden en Flow.
- `commerceOrder`: Número de orden del comercio.
- `status`: Estado de la orden (`1`: Pendiente, `2`: Pagada, `3`: Rechazada, `4`: Anulada).
- `amount`: Monto total.
- `payer`: Correo del pagador.

## Requisitos

- Node.js 16+
- TypeScript 5+

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request en el [repositorio de GitHub](https://github.com/4cidkid/flowcl-pagos).

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
