---
id: flow-settlements-api
sidebar_position: 9
title: Liquidaciones - FlowSettlements
---

# API de Liquidaciones - FlowSettlements

La clase `FlowSettlements` permite obtener información sobre las liquidaciones de pagos efectuadas por Flow.

## Inicialización

```typescript
import Flow from "@nicotordev/flowcl-pagos";

const flow = new Flow("tu_api_key", "tu_secret_key", "sandbox"); // o 'production'
const settlements = flow.settlements;
```

## Métodos Disponibles

### Obtener liquidaciones por rango de fechas

```typescript
settlements.getLiquidationsByDateRange(
  data: FlowGetLiquidationsByDateRangeRequest
): Promise<FlowGetLiquidationsByDateRangeResponse>
```

- **Request**: `FlowGetLiquidationsByDateRangeRequest`
  - `startDate`: `string` (Fecha de inicio en formato `YYYY-MM-DD`)
  - `endDate`: `string` (Fecha de fin en formato `YYYY-MM-DD`)
  - `currency`: `string` (Opcional, moneda de la liquidación)
- **Response**: `FlowGetLiquidationsByDateRangeResponse`
  - `data`: `Array<{ id: number; date: string; currency: string; initial_balance: number; final_balance: number; transferred: number; billed: number; }>`

### Obtener liquidación por ID

```typescript
settlements.getLiquidationById(id: string): Promise<FlowGetLiquidationByIdResponse>
```

- **Request**:
  - `id`: `string` (ID de la liquidación a consultar)
- **Response**: `FlowGetLiquidationByIdResponse`
  - `id`: `number` (ID de la liquidación)
  - `date`: `string` (Fecha de la liquidación)
  - `currency`: `string` (Moneda de la liquidación)
  - `initial_balance`: `number` (Saldo inicial)
  - `final_balance`: `number` (Saldo final)
  - `transferred`: `number` (Total transferido)
  - `billed`: `number` (Monto neto facturado)
  - `summary`: `object` (Resumen de la liquidación)
  - `detail`: `object` (Detalle de la liquidación)

## Manejo de Errores

| Error                                  | Descripción                                            |
|----------------------------------------|--------------------------------------------------------|
| `FlowAPIError`                         | Error genérico de la API de Flow.                     |
| `FlowAuthenticationError`              | Error de autenticación con la API de Flow.            |
| `FlowGetLiquidationsByDateRangeError`  | Error al obtener liquidaciones por rango de fechas.   |

---

Para más detalles, visita [Flow.cl API Docs](https://www.flow.cl/docs/api.html#tag/settlement).

**Nota:** Asegúrate de manejar correctamente todas las excepciones en tu aplicación.