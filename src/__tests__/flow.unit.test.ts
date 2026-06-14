import Flow from '../clients/flow';
import FlowMerchants from '../clients/flow.merchants';
import FlowPayments from '../clients/flow.payments';
import { FlowAuthenticationError } from '../errors';
import {
  generateFormData,
  generateSignature,
  isValidPaymentReceivedByDate,
} from '../utils/flow.utils';
import { flowIntegrationConfig } from '../test-utils/flowIntegration';

describe('Flow SDK (unit)', () => {
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
});
