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
import { FlowAPIError, FlowAuthenticationError } from '../errors';
import {
  describeFlowIntegration,
  flowIntegrationConfig,
} from '../test-utils/flowIntegration';

const runMerchantTests = process.env.FLOW_RUN_MERCHANT_TESTS === 'true';

describeFlowIntegration('FlowMerchant API Integration Tests (Real Sandbox)', () => {
  let flowMerchant: FlowMerchants;

  // Almacenar ID generado para reusarlo en las pruebas de "get", "edit" y "delete"
  let createdMerchantId: string;

  beforeAll(() => {
    flowMerchant = new FlowMerchants(
      flowIntegrationConfig.apiKey,
      flowIntegrationConfig.secretKey,
      flowIntegrationConfig.baseUrl,
    );
  });

  // Para evitar timeouts en caso de que el servicio demore.
  jest.setTimeout(30000);

  it('Debería lanzar FlowAuthenticationError si falta apiKey o secretKey', () => {
    // Verificamos que si no hay credenciales, lance la excepción
    expect(
      () =>
        new FlowMerchants(
          '',
          flowIntegrationConfig.secretKey,
          flowIntegrationConfig.baseUrl,
        ),
    ).toThrow(FlowAuthenticationError);
    expect(
      () =>
        new FlowMerchants(
          flowIntegrationConfig.apiKey,
          '',
          flowIntegrationConfig.baseUrl,
        ),
    ).toThrow(FlowAuthenticationError);
  });

  it('Debería crear un comercio asociado en sandbox', async () => {
    if (!runMerchantTests) {
      expect(runMerchantTests).toBe(false);
      return;
    }

    // Generamos un ID único para cada ejecución
    createdMerchantId = `merchant_${Date.now()}`;

    const requestData: FlowCreateAssociatedMerchantRequest = {
      id: createdMerchantId,
      name: 'nicotordev',
      url: 'https://nicotordev.com',
    };

    let response: FlowCreateAssociatedMerchantResponse;

    try {
      response = await flowMerchant.createAssociatedMerchant(requestData);
    } catch (error) {
      // Si hay un error de API, lo capturamos para ver si es un FlowAPIError
      if (error instanceof FlowAPIError) {
        console.error('FlowAPIError:', error.message);
      }
      throw error;
    }

    // Validamos que el response tenga la estructura esperada
    expect(response.id).toBe(createdMerchantId);
  });

  it('Debería obtener la info de un comercio asociado', async () => {
    if (!runMerchantTests) {
      expect(runMerchantTests).toBe(false);
      return;
    }

    // Utiliza el merchant ID creado en la prueba anterior
    const id = createdMerchantId;

    let response: FlowGetAssociatedMerchantResponse;

    try {
      response = await flowMerchant.getAssociatedMerchant(id);
    } catch (error) {
      if (error instanceof FlowAPIError) {
        console.error('FlowAPIError:', error.message);
      }
      throw error;
    }

    expect(response.id).toBe(id);
    expect(response.name).toBe('Test Merchant');
    expect(response.url).toBe('https://example.com');
    // etc...
  });

  it('Debería editar el comercio asociado', async () => {
    if (!runMerchantTests) {
      expect(runMerchantTests).toBe(false);
      return;
    }

    const editData: FlowEditAssociatedMerchantRequest = {
      id: createdMerchantId,
      name: 'Edited Merchant',
      url: 'https://edited.com',
    };

    let response: FlowEditAssociatedMerchantResponse;

    try {
      response = await flowMerchant.editAssociatedMerchant(editData);
    } catch (error) {
      if (error instanceof FlowAPIError) {
        console.error('FlowAPIError:', error.message);
      }
      throw error;
    }

    expect(response.id).toBe(createdMerchantId);
  });

  it('Debería listar los comercios asociados', async () => {
    if (!runMerchantTests) {
      expect(runMerchantTests).toBe(false);
      return;
    }

    // Ajusta el request según lo que necesites filtrar
    const requestData: FlowGetAssociatedMerchantsRequest = {
      start: 0,
      limit: 10,
      filter: '',
      status: 1, // Aprobados
    };

    let response: FlowGetAssociatedMerchantsResponse;

    try {
      response = await flowMerchant.getAssociatedMerchants(requestData);
    } catch (error) {
      if (error instanceof FlowAPIError) {
        console.error('FlowAPIError:', error.message);
      }
      throw error;
    }

    expect(response.hasMore).toBeDefined();
    const merchantsRaw = response.data || '[]';
    const merchants =
      typeof merchantsRaw === 'string' ? JSON.parse(merchantsRaw) : merchantsRaw;
    expect(Array.isArray(merchants)).toBe(true);
    // Podrías buscar el merchantId en la lista, etc.
  });

  it('Debería eliminar el comercio asociado', async () => {
    if (!runMerchantTests) {
      expect(runMerchantTests).toBe(false);
      return;
    }

    const id = createdMerchantId;
    let response: FlowDeleteAssociatedMerchantResponse;

    try {
      response = await flowMerchant.deleteAssociatedMerchant(id);
    } catch (error) {
      if (error instanceof FlowAPIError) {
        console.error('FlowAPIError:', error.message);
      }
      throw error;
    }

    expect(['ok', 'success']).toContain(response.status);
    expect(response.message).toBeDefined();
  });

  it('Debería manejar errores de API de Flow (Ejemplo)', async () => {
    if (!runMerchantTests) {
      expect(runMerchantTests).toBe(false);
      return;
    }

    // Aquí forzamos un error, por ejemplo intentando crear un comercio repetido.
    const requestData: FlowCreateAssociatedMerchantRequest = {
      id: createdMerchantId, // ID ya borrado o en uso
      name: 'Should Fail Merchant',
      url: 'https://error.com',
    };

    await expect(
      flowMerchant.createAssociatedMerchant(requestData),
    ).rejects.toThrow(FlowAPIError);
  });
});
