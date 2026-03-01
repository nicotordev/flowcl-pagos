import 'dotenv/config';
import FlowPlans from '../clients/flow.plans';
import {
  FlowCreatePlanRequest,
  FlowCreatePlanResponse,
  FlowEditPlanRequest,
  FlowEditPlanResponse,
} from '../types/flow';
import {
  describeFlowIntegration,
  flowIntegrationConfig,
} from '../test-utils/flowIntegration';

describeFlowIntegration('Flow API Integration Tests', () => {
  let flowPlans: FlowPlans;
  let createdPlanId: string;

  beforeAll(() => {
    flowPlans = new FlowPlans(
      flowIntegrationConfig.apiKey,
      flowIntegrationConfig.secretKey,
      flowIntegrationConfig.baseUrl,
    );
  });

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
