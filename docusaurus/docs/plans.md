---
id: flow-planes-api
sidebar_position: 6
title: Planes - FlowPlans
---

# API de Planes - FlowPlans

La clase `FlowPlans` Permite crear planes de suscripción, obtener información de planes, eliminar planes, editar planes y listar planes.

## Inicialización

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow('tu_api_key', 'tu_secret_key', 'sandbox'); // o 'production'
const plans = flow.plans;
```

## Métodos Disponibles

## Crear un plan

Crea un plan de suscripción.

```typescript
plans.create(data: FlowCreatePlanRequest): Promise<FlowCreatePlanResponse>
```

- **Request**: `FlowCreatePlanRequest` incluye:

  - `planId`
  - `name`
  - `currency` (opcional)
  - `amount`
  - `interval` (`1` o `2` o `3` o `4`)
  - `interval_count` (opcional)
  - `trial_period_days` (opcional)
  - `days_until_due` (opcional)
  - `periods_number` (opcional)
  - `urlCallback` (opcional)
  - `charges_retries_number` (opcional)
  - `currency_convert_option` (opcional) (`1` o `2`)

- **Response**: `FlowCreatePlanResponse` incluye:
  - `planId`
  - `name`
  - `currency`
  - `amount`
  - `interval`
  - `interval_count`
  - `created`
  - `trial_period_days`
  - `days_until_due`
  - `periods_number`
  - `urlCallback`
  - `charges_retries_number`
  - `currency_convert_option`
  - `status` (`0` o `1`)
  - `public` (`0` o `1`)

## Obtener un plan

Obtiene un plan de suscripción.

```typescript
plans.get(planId: string): Promise<FlowGetPlanResponse>
```

- **Request**: `planId`
- **Response**: `FlowGetPlanResponse` incluye:

  - `planId`
  - `name`
  - `currency`
  - `amount`
  - `interval`
  - `interval_count`
  - `created`
  - `trial_period_days`
  - `days_until_due`
  - `periods_number`
  - `urlCallback`
  - `charges_retries_number`
  - `currency_convert_option`
  - `status` (`0` o `1`)
  - `public` (`0` o `1`)

## Editar un plan

Edita un plan de suscripción.

```typescript
plans.edit(data: FlowEditPlanRequest): Promise<FlowEditPlanResponse>
```

- **Request**: `FlowEditPlanRequest` incluye:

  - `planId`
  - `name` (opcional)
  - `currency` (opcional)
  - `amount` (opcional)
  - `interval` (`1` o `2` o `3` o `4`) (opcional)
  - `interval_count` (opcional)
  - `trial_period_days` (opcional)
  - `days_until_due` (opcional)
  - `periods_number` (opcional)
  - `urlCallback` (opcional)
  - `charges_retries_number` (opcional)
  - `currency_convert_option` (opcional) (`1` o `2`)

- **Response**: `FlowEditPlanResponse` incluye:
  - `planId`
  - `name`
  - `currency`
  - `amount`
  - `interval`
  - `interval_count`
  - `created`
  - `trial_period_days`
  - `days_until_due`
  - `periods_number`
  - `urlCallback`
  - `charges_retries_number`
  - `currency_convert_option`
  - `status` (`0` o `1`)
  - `public` (`0` o `1`)

## Eliminar un plan

Elimina un plan de suscripción.

```typescript
plans.delete(planId: string): Promise<FlowDeletePlanResponse>
```

- **Request**: `planId`

- **Response**: `FlowEditPlanResponse` incluye:
  - `planId`
  - `name`
  - `currency`
  - `amount`
  - `interval`
  - `interval_count`
  - `created`
  - `trial_period_days`
  - `days_until_due`
  - `periods_number`
  - `urlCallback`
  - `charges_retries_number`
  - `currency_convert_option`
  - `status` (`0` o `1`)
  - `public` (`0` o `1`)

## Listar planes

Lista los planes de suscripción.

```typescript
plans.list(data: FlowListPlansRequest): Promise<FlowListPlansResponse>
```

- **Request**: `FlowListPlansRequest` incluye:

  - `start` (opcional)
  - `limit` (opcional)
  - `filter` (opcional)
  - `status` (opcional) (`0` o `1`)

- **Response**: `FlowListPlansResponse` incluye:
  - `planId`
  - `name`
  - `currency`
  - `amount`
  - `interval`
  - `interval_count`
  - `created`
  - `trial_period_days`
  - `days_until_due`
  - `periods_number`
  - `urlCallback`
  - `charges_retries_number`
  - `currency_convert_option`
  - `status` (`0` o `1`)
  - `public` (`0` o `1`)

## Manejo de Errores

| Error                     | Descripción                          |
| ------------------------- | ------------------------------------ |
| `FlowAPIError`            | Error general de API de Flow.        |
| `FlowAuthenticationError` | Error de autenticación.              |
| `FlowCreatePlanError`     | Error al crear un plan.              |
| `FlowEditPlanError`       | Error al crear un pago por email.    |
| `FlowListPlansError`      | Error al obtener el estado del pago. |

---

Para información adicional, visita la documentación oficial: [Flow.cl API Docs - Payments](https://www.flow.cl/docs/api.html#tag/plans).

**Nota:** Implementa siempre control de errores robusto en tu aplicación.
