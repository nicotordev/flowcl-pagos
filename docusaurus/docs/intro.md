---
id: intro
sidebar_position: 1
title: Flow
---

# Flow.cl SDK para Node.js

![Flow.cl](https://www.flow.cl/images/header/logo-flow.svg)

[![NPM Version](https://img.shields.io/npm/v/@nicotordev/flowcl-pagos.svg)](https://www.npmjs.com/package/@nicotordev/flowcl-pagos)
[!LICENSE](https://github.com/nicotordev/flowcl-pagos/blob/main/LICENSE)
![Tests](https://github.com/nicotordev/flowcl-pagos/actions/workflows/test.yml/badge.svg?style=flat-square)
![Bandera de Chile](https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg)

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

o con Yarn:

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