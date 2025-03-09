---
id: flow-planes-api
sidebar_position: 6
title: Planes - FlowPlans
---

# API de Planes - FlowPlans

La clase `FlowPlans` permite crear planes de suscripción, obtener información de planes, eliminar planes, editar planes y listar planes.

## Inicialización

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow('tu_api_key', 'tu_secret_key', 'sandbox'); // o 'production'
const plans = flow.plans;
```

## Métodos Disponibles

### Crear un plan

```typescript
plans.create(data: FlowCreatePlanRequest): Promise<FlowCreatePlanResponse>
```

- **Request** (`FlowCreatePlanRequest`):

  - `planId`: `string`
  - `name`: `string`
  - `currency`: `string` _(opcional)_
  - `amount`: `number`
  - `interval`: 1 | 2 | 3 | 4
  - `interval_count`: `number` _(opcional)_
  - `trial_period_days`: `number` _(opcional)_
  - `days_until_due`: `number` _(opcional)_
  - `periods_`number``: `number` _(opcional)_
  - `urlCallback`: `string` _(opcional)_
  - `charges_retries_`number``: `number` _(opcional)_
  - `currency_convert_option`: 1 | 2 _(opcional)_

- **Response** (`FlowCreatePlanResponse`):
  - `planId`: `string`
  - `name`: `string`
  - `currency`: `string`
  - `amount`: `number`
  - `interval`: `number`
  - `interval_count`: `number`
  - `created`: `string`
  - `trial_period_days`: `number`
  - `days_until_due`: `number`
  - `periods_`number``: `number`
  - `urlCallback`: `string`
  - `charges_retries_`number``: `number`
  - `currency_convert_option`: `number`
  - `status`: 0 | 1
  - `public`: 0 | 1

## Obtener un plan

```typescript
plans.get(planId: `string`): Promise<FlowGetPlanResponse>
```

- **Request**:

  - `planId`: `string`

- **Response**: `FlowGetPlanResponse`

## Editar un plan

```typescript
plans.edit(data: FlowEditPlanRequest): Promise<FlowEditPlanResponse>
```

- **Request**: `FlowEditPlanRequest` incluye:

  - `planId`: `string`
  - `name`: `string` _(opcional)_
  - `currency`: `string` _(opcional)_
  - `amount`: `number` _(opcional)_
  - `interval`: 1 | 2 | 3 | 4 _(opcional)_
  - `interval_count`: `number` _(opcional)_
  - `trial_period_days`: `number` _(opcional)_ 
  - `days_until_due`: `number` _(opcional)_
  - `periods_`number``: `number` _(opcional)_
  - `urlCallback`: `string` _(opcional)_
  - `charges_retries_`number``: `number` _(opcional)_
  - `currency_convert_option`: 1 | 2 _(opcional)_

- **Response**: `FlowEditPlanResponse`

## Eliminar un plan

```typescript
plans.delete(planId: `string`): Promise<FlowDeletePlanResponse>
```

- **Request**:

  - `planId`: `string`

- **Response**: `FlowDeletePlanResponse`

## Listar planes

```typescript
plans.list(data: FlowListPlansRequest): Promise<FlowListPlansResponse>
```

- **Request**: `FlowListPlansRequest` incluye:

  - `start`: `number` _(opcional)_
  - `limit`: `number` _(opcional)_
  - `filter`: `string` _(opcional)_
  - `status`: 0 | 1 _(opcional)_

- **Response**: `FlowListPlansResponse`

## Manejo de Errores

| Error                     | Descripción                   |
| ------------------------- | ----------------------------- |
| `FlowAPIError`            | Error general de API de Flow. |
| `FlowAuthenticationError` | Error de autenticación.       |
| `FlowCreatePlanError`     | Error al crear un plan.       |
| `FlowEditPlanError`       | Error al editar un plan.      |
| `FlowListPlansError`      | Error al listar los planes.   |

---

Para información adicional, visita la documentación oficial: [Flow.cl API Docs - Payments](https://www.flow.cl/docs/api.html#tag/plans).

**Nota:** Implementa siempre control de errores robusto en tu aplicación.
