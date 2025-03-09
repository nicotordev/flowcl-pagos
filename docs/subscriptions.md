---
id: flow-subscriptions-api
sidebar_position: 6
title: Suscripciones - FlowSubscriptions
---

# API de Suscripciones - FlowSubscriptions

La clase `FlowSubscriptions` permite interactuar fácilmente con la API de suscripciones de Flow.cl, ofreciendo métodos para gestionar suscripciones, planes y descuentos.

## Inicialización

```typescript
import Flow from '@nicotordev/flowcl-pagos';

const flow = new Flow('tu_api_key', 'tu_secret_key', 'sandbox'); // o 'production'
const subscriptions = flow.subscriptions;
```

## Métodos Disponibles

### Crear Suscripción a un Plan

```typescript
subscriptions.createToPlan(data: FlowCreateSubscriptionToPlanRequest): Promise<FlowCreateSubscriptionToPlanResponse>
```

- **Request**: `FlowCreateSubscriptionToPlanRequest` incluye:
  - `planId`: `string`
  - `customerId`: `string`
  - `subscription_start`: `string` _(opcional)_
  - `couponId`: `number` _(opcional)_
  - `trial_period_days`: `number` _(opcional)_
  - `periods_number`: `number` _(opcional)_

- **Response**: `FlowCreateSubscriptionToPlanResponse` incluye:
  - `subscriptionId`: `string`
  - `planId`: `string`
  - `plan_name`: `string`
  - `customerId`: `string`
  - `created`: `string`
  - `subscription_start`: `string`
  - `subscription_end`: `string | null`
  - `period_start`: `string`
  - `period_end`: `string`
  - `next_invoice_date`: `string`
  - `trial_period_days`: `number`
  - `trial_start`: `string`
  - `trial_end`: `string`
  - `cancel_at_period_end`: `number`
  - `cancel_at`: `string`
  - `periods_number`: `number`
  - `days_until_due`: `number`
  - `status`: `number`
  - `discount_balance`: `string`
  - `newPlanId`: `number`
  - `new_plan_scheduled_change_date`: `string`
  - `in_new_plan_next_attempt_date`: `string`
  - `morose`: `number`
  - `discount`:
    - `id`: `number`
    - `type`: `string`
    - `created`: `string`
    - `start`: `string`
    - `end`: `string`
    - `deleted`: `string | null`
    - `status`: `number`
    - `coupon`:
      - `id`: `number`
      - `name`: `string`
      - `percent_off`: `number | null`
      - `currency`: `string | null`
      - `amount`: `number | null`
      - `created`: `string`
      - `duration`: `number`
      - `times`: `number`
      - `max_redemptions`: `number`
      - `expires`: `string`
      - `status`: `number`
      - `redemptions`: `number`

### Obtener Suscripción por ID

```typescript
subscriptions.get.bySubscriptionId(subscriptionId: string): Promise<FlowGetSubscriptionBySubscriptionIdResponse>
```

- **Request**: `subscriptionId`
- **Response**: `FlowGetSubscriptionBySubscriptionIdResponse`
  - `subscriptionId`: `string`
  - `planId`: `string`
  - `plan_name`: `string`
  - `customerId`: `string`
  - `created`: `string`
  - `subscription_start`: `string`
  - `subscription_end`: `string | null`
  - `period_start`: `string`
  - `period_end`: `string`
  - `next_invoice_date`: `string`
  - `trial_period_days`: `number`
  - `trial_start`: `string`
  - `trial_end`: `string`
  - `cancel_at_period_end`: `number`
  - `cancel_at`: `string`
  - `periods_number`: `number`
  - `days_until_due`: `number`
  - `status`: `number`
  - `discount_balance`: `string`
  - `newPlanId`: `number`
  - `new_plan_scheduled_change_date`: `string`
  - `in_new_plan_next_attempt_date`: `string`
  - `morose`: `number`
  - `discount`:
    - `id`: `number`
    - `type`: `string`
    - `created`: `string`
    - `start`: `string`
    - `end`: `string`
    - `deleted`: `string | null`
    - `status`: `number`
    - `coupon`:
      - `id`: `number`
      - `name`: `string`
      - `percent_off`: `number | null`
      - `currency`: `string | null`
      - `amount`: `number | null`
      - `created`: `string`
      - `duration`: `number`
      - `times`: `number`
      - `max_redemptions`: `number`
      - `expires`: `string`
      - `status`: `number`
      - `redemptions`: `number`
### Obtener Lista de Suscripciones de un Plan

```typescript
subscriptions.getPlanSubscriptions(data: FlowGetPlanSubscriptionsRequest): Promise<FlowGetPlanSubscriptionsResponse>
```

- **Request**: `FlowGetPlanSubscriptionsRequest`
- **Response**: `FlowGetPlanSubscriptionsResponse`
  - `total`: `number`
  - `hasMore

### Modificar Días de Prueba de una Suscripción

```typescript
subscriptions.update.trialDays(subscriptionId: string, trial_period_days: number): Promise<FlowUpdateSubscriptionTrialDays>
```

- **Request**: `subscriptionId`, `trial_period_days`
- **Response**: `FlowUpdateSubscriptionTrialDays`

### Cancelar una Suscripción

```typescript
subscriptions.cancelSubscription(subscriptionId: string, at_period_end: number): Promise<FlowCancelSubscriptionResponse>
```

- **Request**: `subscriptionId`, `at_period_end`
- **Response**: `FlowCancelSubscriptionResponse`

### Agregar Descuento a una Suscripción

```typescript
subscriptions.addDiscountToSubscription(subscriptionId: string, couponId: string): Promise<FlowAddDiscountToSubscriptionResponse>
```

- **Request**: `subscriptionId`, `couponId`
- **Response**: `FlowAddDiscountToSubscriptionResponse`

### Remover Descuento de una Suscripción

```typescript
subscriptions.removeDiscountFromSubscription(subscriptionId: string): Promise<FlowRemoveDiscountFromSubscriptionResponse>
```

- **Request**: `subscriptionId`
- **Response**: `FlowRemoveDiscountFromSubscriptionResponse`

### Agregar Item a una Suscripción

```typescript
subscriptions.addItemToSubscription(subscriptionId: string, itemId: string): Promise<FlowAddItemToSubscriptionResponse>
```

- **Request**: `subscriptionId`, `itemId`
- **Response**: `FlowAddItemToSubscriptionResponse`

### Remover Item de una Suscripción

```typescript
subscriptions.removeItemFromSubscription(subscriptionId: string, itemId: string): Promise<FlowRemoveItemFromSubscriptionResponse>
```

- **Request**: `subscriptionId`, `itemId`
- **Response**: `FlowRemoveItemFromSubscriptionResponse`

### Cambiar Plan de una Suscripción

```typescript
subscriptions.changeAssociatedPlanToSubscription(data: FlowChangeAssociatedPlanToSubscriptionRequest): Promise<FlowChangeAssociatedPlanToSubscriptionResponse>
```

- **Request**: `FlowChangeAssociatedPlanToSubscriptionRequest`
- **Response**: `FlowChangeAssociatedPlanToSubscriptionResponse`

### Previsualizar Cambio de Plan

```typescript
subscriptions.previewSubscriptionPlanChange(data: FlowPreviewSubscriptionPlanChangeRequest): Promise<FlowPreviewSubscriptionPlanChangeResponse>
```

- **Request**: `FlowPreviewSubscriptionPlanChangeRequest`
- **Response**: `FlowPreviewSubscriptionPlanChangeResponse`

### Cancelar Cambio de Plan Programado

```typescript
subscriptions.cancelScheduledPlanChange(subscriptionId: string): Promise<FlowCancelScheduledPlanChangeResponse>
```

- **Request**: `subscriptionId`
- **Response**: `FlowCancelScheduledPlanChangeResponse`

## Manejo de Errores

| Error                                         | Descripción                                     |
|----------------------------------------------|-----------------------------------------------|
| `FlowAPIError`                               | Error general de la API Flow.                 |
| `FlowCreateSubscriptionToPlanError`          | Error al crear suscripción.                   |
| `FlowGetSubscriptionBySubscriptionIdError`   | Error al obtener suscripción.                 |
| `FlowGetPlanSubscriptionsError`              | Error al listar suscripciones de un plan.     |
| `FlowUpdateSubscriptionTrialDaysError`       | Error al modificar días de prueba.            |
| `FlowCancelSubscriptionError`                | Error al cancelar suscripción.                |
| `FlowAddDiscountToSubscriptionError`         | Error al agregar descuento.                   |
| `FlowRemoveDiscountFromSubscriptionError`    | Error al remover descuento.                   |
| `FlowAddItemToSubscriptionError`             | Error al agregar item.                        |
| `FlowRemoveItemFromSubscriptionError`        | Error al remover item.                        |
| `FlowChangeAssociatedPlanToSubscriptionError`| Error al cambiar plan de suscripción.        |
| `FlowPreviewSubscriptionPlanChangeError`     | Error al previsualizar cambio de plan.        |
| `FlowCancelScheduledPlanChangeError`         | Error al cancelar cambio de plan programado.  |
| `FlowAuthenticationError`                    | Error de autenticación con la API de Flow.    |

---

Para más detalles visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/subscription).

