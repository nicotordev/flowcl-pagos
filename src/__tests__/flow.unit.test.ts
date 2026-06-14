import Flow from '../clients/flow';
import FlowMerchants from '../clients/flow.merchants';
import FlowPayments from '../clients/flow.payments';
import FlowWebhooks from '../clients/flow.webhooks';
import {
  FlowAPIError,
  FlowAuthenticationError,
  createFlowAPIError,
} from '../errors';
import { FlowPaymentStatusResponse } from '../types/flow.payments';
import {
  generateFormData,
  generateSignature,
  isValidPaymentReceivedByDate,
} from '../utils/flow.utils';
import { flowIntegrationConfig } from '../test-utils/flowIntegration';

describe('Flow SDK (unit)', () => {
  const paidPayment: FlowPaymentStatusResponse = {
    flowOrder: 123,
    commerceOrder: 'order-123',
    requestDate: '2026-06-14 10:00:00',
    status: 2,
    statusStr: 'Pagada',
    subject: 'Orden de prueba',
    currency: 'CLP',
    amount: 1000,
    payer: 'cliente@example.com',
  };

  it('lanza FlowAuthenticationError sin apiKey o secretKey', () => {
    expect(
      () => new Flow('', flowIntegrationConfig.secretKey, 'sandbox'),
    ).toThrow(FlowAuthenticationError);
    expect(() => new Flow(flowIntegrationConfig.apiKey, '', 'sandbox')).toThrow(
      FlowAuthenticationError,
    );
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
        new FlowPayments(
          flowIntegrationConfig.apiKey,
          '',
          flowIntegrationConfig.baseUrl,
        ),
    ).toThrow(FlowAuthenticationError);
  });

  it('genera firma HMAC determinística para los mismos parámetros', () => {
    const params = { amount: '1000', apiKey: 'test-key' };
    const signatureA = generateSignature(params, 'secret');
    const signatureB = generateSignature(params, 'secret');

    expect(signatureA).toBe(signatureB);
    expect(signatureA).toMatch(/^[a-f0-9]{64}$/);
  });

  it('agrega la firma al formulario enviado a Flow', () => {
    const formData = generateFormData(
      { commerceOrder: '1', apiKey: 'key' },
      'secret',
    );

    expect(formData.s).toBeDefined();
    expect(formData.commerceOrder).toBe('1');
    expect(formData.apiKey).toBe('key');
    expect(formData.timestamp).toMatch(/^\d+$/);
    expect(formData.nonce).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it('genera nonce distinto en cada firma para mitigar replay', () => {
    const formDataA = generateFormData(
      { commerceOrder: '1', apiKey: 'key' },
      'secret',
    );
    const formDataB = generateFormData(
      { commerceOrder: '1', apiKey: 'key' },
      'secret',
    );

    expect(formDataA.nonce).not.toBe(formDataB.nonce);
    expect(formDataA.s).not.toBe(formDataB.s);
  });

  it('serializa optional como JSON string para la firma', () => {
    const formData = generateFormData(
      {
        commerceOrder: '1',
        optional: { orderId: 'abc' },
        amount: 1000,
        apiKey: 'key',
      },
      'secret',
    );

    expect(formData.optional).toBe('{"orderId":"abc"}');
    expect(formData.amount).toBe('1000');
  });

  it('valida y normaliza fechas para consultas por día', () => {
    expect(isValidPaymentReceivedByDate('2026-06-02')).toBe('2026-06-02');
    expect(isValidPaymentReceivedByDate('invalid')).toBeNull();
  });

  it('emite logs sanitizados sin payload crudo de Flow', () => {
    const logger = { error: jest.fn() };

    const error = createFlowAPIError({
      statusCode: 400,
      message: 'Request failed with status code 400',
      endpoint: '/create',
      method: 'post',
      body: {
        code: 101,
        message: 'Solicitud inválida',
        token: 'secret-token',
        rut: '11111111-1',
        amount: 1000,
      },
      options: { logging: true, logger },
    });

    expect(error.flowCode).toBe(101);
    expect(error.flowMessage).toBe('Solicitud inválida');
    expect(logger.error).toHaveBeenCalledWith({
      type: 'flow_api_error',
      endpoint: '/create',
      method: 'post',
      statusCode: 400,
      message: 'Request failed with status code 400',
      flowCode: 101,
    });
    expect(logger.error).not.toHaveBeenCalledWith(
      expect.objectContaining({
        token: expect.any(String),
        rut: expect.any(String),
        amount: expect.any(Number),
      }),
    );
  });

  it('no emite logs cuando logging es false', () => {
    const logger = { error: jest.fn() };

    createFlowAPIError({
      statusCode: 400,
      message: 'Request failed with status code 400',
      endpoint: '/create',
      method: 'post',
      body: { code: 101, message: 'Solicitud inválida' },
      options: { logging: false, logger },
    });

    expect(logger.error).not.toHaveBeenCalled();
  });

  it('mantiene FlowAPIError aunque el logger falle', () => {
    const logger = {
      error: jest.fn(() => {
        throw new Error('logger unavailable');
      }),
    };

    const error = createFlowAPIError({
      statusCode: 400,
      message: 'Request failed with status code 400',
      endpoint: '/create',
      method: 'post',
      body: { code: 101, message: 'Solicitud inválida' },
      options: { logger },
    });

    expect(error.flowCode).toBe(101);
    expect(error.flowMessage).toBe('Solicitud inválida');
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('emite console.error sanitizado cuando logging es true', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    createFlowAPIError({
      statusCode: 400,
      message: 'Request failed with status code 400',
      endpoint: '/create',
      method: 'post',
      body: {
        code: 101,
        message: 'Solicitud inválida',
        token: 'secret-token',
        rut: '11111111-1',
        amount: 1000,
      },
      options: { logging: true },
    });

    expect(consoleError).toHaveBeenCalledWith('[flowcl-pagos]', {
      type: 'flow_api_error',
      endpoint: '/create',
      method: 'post',
      statusCode: 400,
      message: 'Request failed with status code 400',
      flowCode: 101,
    });
    expect(consoleError).not.toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        token: expect.any(String),
        rut: expect.any(String),
        amount: expect.any(Number),
      }),
    );

    consoleError.mockRestore();
  });

  it('verifica callbacks de pago consultando el token contra Flow', async () => {
    const byToken = jest.fn().mockResolvedValue(paidPayment);
    const webhooks = new FlowWebhooks({
      status: { byToken },
    } as unknown as FlowPayments);

    const result = await webhooks.verifyPaymentConfirmation(
      { token: 'callback-token' },
      {
        expectedCommerceOrder: 'order-123',
        expectedAmount: 1000,
        expectedCurrency: 'CLP',
      },
    );

    expect(result.valid).toBe(true);
    expect(byToken).toHaveBeenCalledWith('callback-token');
    if (result.valid) {
      expect(result.payment).toBe(paidPayment);
    }
  });

  it('rechaza callbacks sin token', async () => {
    const byToken = jest.fn();
    const webhooks = new FlowWebhooks({
      status: { byToken },
    } as unknown as FlowPayments);

    await expect(webhooks.verifyPaymentConfirmation({})).resolves.toEqual({
      valid: false,
      reason: 'missing_token',
    });
    expect(byToken).not.toHaveBeenCalled();
  });

  it('rechaza tokens que Flow no reconoce', async () => {
    const flowError = new FlowAPIError(400, 'invalid token');
    const webhooks = new FlowWebhooks({
      status: {
        byToken: jest.fn().mockRejectedValue(flowError),
      },
    } as unknown as FlowPayments);

    await expect(
      webhooks.verifyPaymentConfirmation({ token: 'fake-token' }),
    ).resolves.toEqual({
      valid: false,
      reason: 'flow_api_error',
      error: flowError,
    });
  });

  it('rechaza tokens validos que no coinciden con la orden esperada', async () => {
    const webhooks = new FlowWebhooks({
      status: { byToken: jest.fn().mockResolvedValue(paidPayment) },
    } as unknown as FlowPayments);

    await expect(
      webhooks.verifyPaymentConfirmation('callback-token', {
        expectedCommerceOrder: 'otra-orden',
      }),
    ).resolves.toEqual({
      valid: false,
      reason: 'commerce_order_mismatch',
      payment: paidPayment,
    });
  });
});
