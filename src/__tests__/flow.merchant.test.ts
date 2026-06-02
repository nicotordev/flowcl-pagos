import 'dotenv/config';
import FlowMerchants from '../clients/flow.merchants';
import {
  FlowCreateAssociatedMerchantRequest,
  FlowCreateAssociatedMerchantResponse,
  FlowEditAssociatedMerchantRequest,
  FlowEditAssociatedMerchantResponse,
  FlowDeleteAssociatedMerchantResponse,
  FlowGetAssociatedMerchantResponse,
  FlowGetAssociatedMerchantsRequest,
  FlowGetAssociatedMerchantsResponse,
} from '../types/flow';
import { FlowAPIError } from '../errors';
import {
  describeFlowMerchantIntegration,
  flowIntegrationConfig,
} from '../test-utils/flowIntegration';

describeFlowMerchantIntegration(
  'FlowMerchant API Integration Tests (integrator sandbox)',
  () => {
    let flowMerchant: FlowMerchants;
    let createdMerchantId: string;
    let createdMerchantName: string;
    let createdMerchantUrl: string;

    beforeAll(() => {
      flowMerchant = new FlowMerchants(
        flowIntegrationConfig.apiKey,
        flowIntegrationConfig.secretKey,
        flowIntegrationConfig.baseUrl,
      );
    });

    jest.setTimeout(30000);

    it('Debería crear un comercio asociado en sandbox', async () => {
      createdMerchantId = `merchant_${Date.now()}`;
      createdMerchantName = 'nicotordev';
      createdMerchantUrl = 'https://nicotordev.com';

      const requestData: FlowCreateAssociatedMerchantRequest = {
        id: createdMerchantId,
        name: createdMerchantName,
        url: createdMerchantUrl,
      };

      const response: FlowCreateAssociatedMerchantResponse =
        await flowMerchant.createAssociatedMerchant(requestData);

      expect(response.id).toBe(createdMerchantId);
    });

    it('Debería obtener la info de un comercio asociado', async () => {
      const response: FlowGetAssociatedMerchantResponse =
        await flowMerchant.getAssociatedMerchant(createdMerchantId);

      expect(response.id).toBe(createdMerchantId);
      expect(response.name).toBe(createdMerchantName);
      expect(response.url).toBe(createdMerchantUrl);
    });

    it('Debería editar el comercio asociado', async () => {
      const editData: FlowEditAssociatedMerchantRequest = {
        id: createdMerchantId,
        name: 'Edited Merchant',
        url: 'https://edited.com',
      };

      const response: FlowEditAssociatedMerchantResponse =
        await flowMerchant.editAssociatedMerchant(editData);

      expect(response.id).toBe(createdMerchantId);
      createdMerchantName = editData.name;
      createdMerchantUrl = editData.url;
    });

    it('Debería listar los comercios asociados', async () => {
      const requestData: FlowGetAssociatedMerchantsRequest = {
        start: 0,
        limit: 10,
        filter: '',
        status: 1,
      };

      const response: FlowGetAssociatedMerchantsResponse =
        await flowMerchant.getAssociatedMerchants(requestData);

      expect(response.hasMore).toBeDefined();
      const merchantsRaw = response.data || '[]';
      const merchants =
        typeof merchantsRaw === 'string'
          ? JSON.parse(merchantsRaw)
          : merchantsRaw;
      expect(Array.isArray(merchants)).toBe(true);
    });

    it('Debería eliminar el comercio asociado', async () => {
      const response: FlowDeleteAssociatedMerchantResponse =
        await flowMerchant.deleteAssociatedMerchant(createdMerchantId);

      expect(['ok', 'success']).toContain(response.status);
      expect(response.message).toBeDefined();
    });

    it('Debería manejar errores de API de Flow al crear un comercio duplicado', async () => {
      const requestData: FlowCreateAssociatedMerchantRequest = {
        id: createdMerchantId,
        name: 'Should Fail Merchant',
        url: 'https://error.com',
      };

      await expect(
        flowMerchant.createAssociatedMerchant(requestData),
      ).rejects.toThrow(FlowAPIError);
    });
  },
);
