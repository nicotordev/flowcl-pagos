---
id: quick-start
sidebar_position: 1
title: Guía Rápida de Integración
---

# 🚀 Guía Rápida de Integración del SDK Flow.cl

Esta guía rápida te permitirá integrar pagos fácilmente en tu aplicación Node.js utilizando el SDK open-source para Flow.cl.

## ✅ Instalación

Instala el paquete usando npm o yarn:

```sh
npm install @nicotordev/flowcl-pagos

# o usando yarn
yarn add @nicotordev/flowcl-pagos
```

## ⚙️ Configuración inicial

Importa y configura el cliente Flow con tus credenciales:

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow(
  'tu_api_key',
  'tu_secret_key',
  'sandbox', // Cambia a 'production' para entorno real
);
```

## 💳 Crear un pago sencillo

Crea rápidamente un pago con pocos pasos:

```typescript
const response = await flow.payments.create({
  commerceOrder: 'orden123',
  subject: 'Compra de prueba',
  currency: 'CLP',
  amount: 15000,
  email: 'cliente@ejemplo.com',
  urlReturn: 'https://tuweb.com/gracias',
  urlConfirmation: 'https://tuweb.com/webhook',
});

console.log(response.redirectUrl); // Redirecciona aquí al usuario para completar el pago.
```

## 🎉 ¡Listo!

Tu aplicación ya está preparada para recibir pagos online con Flow.cl. Para detalles avanzados, consulta la [documentación completa](./intro).

## 📌 Próximos pasos recomendados:

- Explorar cómo gestionar [clientes](./flow-customers-api) y [reembolsos](./flow-refunds-api).

¡Continúa explorando las demás secciones para aprovechar al máximo el SDK!
