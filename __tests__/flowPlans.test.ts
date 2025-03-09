import FlowPlans from '../src/clients/flow.plans';
import dotenv from 'dotenv';
import {
  FlowCreatePlanRequest,
  FlowCreatePlanResponse,
  FlowEditPlanRequest,
  FlowEditPlanResponse,
} from '../src/types/flow';

dotenv.config(); // Carga las variables de entorno desde .env

const API_KEY = process.env.FLOW_API_KEY!;
const SECRET_KEY = process.env.FLOW_SECRET_KEY!;
const BASE_URL = process.env.FLOW_BASE_URL!;

const flowPlans = new FlowPlans(API_KEY, SECRET_KEY, BASE_URL);

describe('Flow API Integration Tests', () => {
  let createdPlanId: string;

  test('✅ Crea un plan de suscripción exitosamente', async () => {
    const planData: FlowCreatePlanRequest = {
      planId: `test-plan-${Date.now()}`, // Evita colisiones
      name: 'Plan de Prueba',
      amount: 10000,
      interval: 3,
    };

    const expected: Partial<FlowCreatePlanResponse> = {
      planId: planData.planId,
    };

    const response = await flowPlans.create(planData);
    expect(response).toHaveProperty('planId');
    expect(response.planId).toBe(expected.planId);
    createdPlanId = response.planId;
  });

  test('✅ Obtiene los detalles del plan creado', async () => {
    if (!createdPlanId) throw new Error('Plan ID no disponible');

    const response = await flowPlans.get(createdPlanId);
    expect(response).toHaveProperty('planId', createdPlanId);
    expect(response.name).toBe('Plan de Prueba');
  });

  test('✅ Lista los planes de suscripción', async () => {
    const response = await flowPlans.list({ start: 0, limit: 10 });
    expect(response).toHaveProperty('total');
    expect(response).toHaveProperty('data');
  });

  test('✅ Edita un plan de suscripción', async () => {
    if (!createdPlanId) throw new Error('Plan ID no disponible');

    const editData: FlowEditPlanRequest = {
      planId: createdPlanId,
      name: 'Plan Modificado',
      amount: 12000,
    };

    const expected: Partial<FlowEditPlanResponse> = {
      planId: createdPlanId,
    };

    const response = await flowPlans.edit(editData);
    expect(response).toHaveProperty('planId', createdPlanId);
    expect(response.planId).toBe(expected.planId);
  });

  test('✅ Elimina un plan de suscripción', async () => {
    if (!createdPlanId) throw new Error('Plan ID no disponible');

    const response = await flowPlans.delete(createdPlanId);
    expect(response).toHaveProperty('planId', createdPlanId);
    expect(response.status).toBe(0); // 0 indica plan eliminado
  });
});
