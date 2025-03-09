---
id: flow-merchants-api
sidebar_position: 10
title: Comercios Asociados - FlowMerchants
---

# API de Comercios Asociados - FlowMerchants

La clase `FlowMerchants` permite gestionar los comercios asociados en Flow.

## Inicialización

```typescript
import Flow from "@nicotordev/flowcl-pagos";

const flow = new Flow("tu_api_key", "tu_secret_key", "sandbox"); // o 'production'
const merchants = flow.merchants;
```

## Métodos Disponibles

### Crear un comercio asociado

```typescript
merchants.createAssociatedMerchant(
  data: FlowCreateAssociatedMerchantRequest
): Promise<FlowCreateAssociatedMerchantResponse>
```

- **Request**: `FlowCreateAssociatedMerchantRequest`
  - `id`: `string` (ID del comercio asociado)
  - `name`: `string` (Nombre del comercio asociado)
  - `url`: `string` (URL del comercio asociado)
- **Response**: `FlowCreateAssociatedMerchantResponse`
  - `id`: `string`
  - `name`: `string`
  - `url`: `string`
  - `createdate`: `string` (Fecha de creación)
  - `status`: `number` (Estado: `0` Pendiente, `1` Aprobado, `2` Rechazado)
  - `verifydate`: `string | null` (Fecha de verificación)

### Editar un comercio asociado

```typescript
merchants.editAssociatedMerchant(
  data: FlowEditAssociatedMerchantRequest
): Promise<FlowEditAssociatedMerchantResponse>
```

- **Request**: `FlowEditAssociatedMerchantRequest`
  - `id`: `string` (ID del comercio asociado)
  - `name`: `string` (Nuevo nombre del comercio asociado)
  - `url`: `string` (Nueva URL del comercio asociado)
- **Response**: `FlowEditAssociatedMerchantResponse`
  - (Igual que `FlowCreateAssociatedMerchantResponse`)

### Eliminar un comercio asociado

```typescript
merchants.deleteAssociatedMerchant(
  id: string
): Promise<FlowDeleteAssociatedMerchantResponse>
```

- **Request**:
  - `id`: `string` (ID del comercio asociado a eliminar)
- **Response**: `FlowDeleteAssociatedMerchantResponse`
  - `status`: `string` (Estado de la operación)
  - `message`: `string` (Mensaje descriptivo)

### Obtener un comercio asociado por ID

```typescript
merchants.getAssociatedMerchant(
  id: string
): Promise<FlowGetAssociatedMerchantResponse>
```

- **Request**:
  - `id`: `string` (ID del comercio asociado a consultar)
- **Response**: `FlowGetAssociatedMerchantResponse`
  - (Igual que `FlowCreateAssociatedMerchantResponse`)

### Obtener lista de comercios asociados

```typescript
merchants.getAssociatedMerchants(
  data: FlowGetAssociatedMerchantsRequest
): Promise<FlowGetAssociatedMerchantsResponse>
```

- **Request**: `FlowGetAssociatedMerchantsRequest`
  - `start`: `number` (Número de inicio de la página, por defecto `0`)
  - `limit`: `number` (Registros por página, por defecto `10`, máximo `100`)
  - `filter`: `string` (Filtro por nombre del comercio asociado)
  - `status`: `0 | 1 | 2` (Filtro por estado: `0` Pendiente, `1` Aprobado, `2` Rechazado)
- **Response**: `FlowGetAssociatedMerchantsResponse`
  - `data`: `Array<FlowAssociatedMerchant>` (Lista de comercios asociados paginada)

## Manejo de Errores

| Error                                   | Descripción                                        |
|-----------------------------------------|----------------------------------------------------|
| `FlowAPIError`                          | Error genérico de la API de Flow.                 |
| `FlowAuthenticationError`               | Error de autenticación con la API de Flow.        |
| `FlowCreateAssociatedMerchantError`     | Error al crear un comercio asociado.              |
| `FlowDeleteAssociatedMerchantError`     | Error al eliminar un comercio asociado.           |

---

Para más detalles, visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/merchant).

**Nota:** Asegúrate de manejar correctamente todas las excepciones en tu aplicación.

