---
id: intro
sidebar_position: 2
title: Flow.cl - Cliente API para Node.js
---

# Flow.cl - Cliente API para Node.js

![Flow.cl](https://www.flow.cl/images/header/logo-flow.svg)

[![NPM Version](https://img.shields.io/npm/v/@nicotordev/flowcl-pagos.svg)](https://www.npmjs.com/package/@nicotordev/flowcl-pagos)
[![License](https://img.shields.io/npm/l/@nicotordev/flowcl-pagos.svg)](https://nicotordev.github.io/flowcl-pagos/license/LICENSE)
![Tests](https://github.com/nicotordev/flowcl-pagos/actions/workflows/test.yml/badge.svg?style=flat-square)

## 🚀 ¿Qué es este Cliente API?

Este Cliente API proporciona una forma sencilla y eficiente de integrar la API de [Flow.cl](https://www.flow.cl/) en aplicaciones Node.js y TypeScript, facilitando procesos de pagos y gestión de transacciones.

## 📚 Funcionalidades principales

Este paquete permite gestionar fácilmente:

- ✅ **Pagos**
- ✅ **Clientes**
- ✅ **Planes de suscripción**
- ✅ **Suscripciones e ítems de suscripción**
- ✅ **Reembolsos**
- ✅ **Cupones**
- ✅ **Facturas (Invoices)**
- ✅ **Liquidaciones (Settlements)**
- ✅ **Información del comercio (Merchant)**

## 📦 Instalación

Con npm:

```sh
npm install @nicotordev/flowcl-pagos
```

O utilizando Yarn:

```sh
yarn add @nicotordev/flowcl-pagos
```

## ⚙️ Uso rápido

Importa y configura el cliente de forma sencilla:

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow(
  'tu_api_key',
  'tu_secret_key',
  'sandbox', // Cambia a 'production' en entorno real
);
```

¡Listo! Ya puedes empezar a interactuar con la API de Flow.cl.

## 📖 Documentación Completa

Explora la documentación detallada para aprovechar al máximo todas las funcionalidades del Cliente API:

- [📘 Documentación Oficial](https://www.flow.cl/docs/api.html)
<!-- - [🔍 Ejemplos prácticos y casos de uso](/docs/examples) -->
- [🛠️ Guía de Integración Rápida](./quick-start)

---

**Nota:** Asegúrate siempre de manejar correctamente los errores en tu aplicación para ofrecer una mejor experiencia a tus usuarios.
