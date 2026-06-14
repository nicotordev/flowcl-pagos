import { FlowAPIError } from '../errors';
import { FlowPaymentStatusResponse } from '../types/flow.payments';
import {
  FlowPaymentConfirmationPayload,
  FlowVerifyPaymentConfirmationOptions,
  FlowVerifyPaymentConfirmationResult,
} from '../types/flow.webhooks';
import FlowPayments from './flow.payments';

type FlowPaymentStatusClient = Pick<FlowPayments, 'status'>;

/**
 * Helpers para verificar callbacks entrantes de Flow.
 */
export default class FlowWebhooks {
  /**
   * Verifica un callback de confirmacion de pago consultando el token contra Flow.
   */
  public paymentConfirmation = this.verifyPaymentConfirmation.bind(this);
  public verifyCallback = this.verifyPaymentConfirmation.bind(this);
  public verifyWebhook = this.verifyPaymentConfirmation.bind(this);

  constructor(private payments: FlowPaymentStatusClient) {}

  /**
   * Flow envia a urlConfirmation solo un token por POST. Este helper no confia
   * en el callback: consulta payment/getStatus con las credenciales del SDK y
   * valida el estado y, opcionalmente, los datos esperados de la orden local.
   */
  public async verifyPaymentConfirmation(
    payload: string | FlowPaymentConfirmationPayload,
    options: FlowVerifyPaymentConfirmationOptions = {},
  ): Promise<FlowVerifyPaymentConfirmationResult> {
    const token = this.getToken(payload);

    if (!token) {
      return { valid: false, reason: 'missing_token' };
    }

    let payment: FlowPaymentStatusResponse;

    try {
      payment = await this.payments.status.byToken(token);
    } catch (error) {
      if (error instanceof FlowAPIError) {
        return { valid: false, reason: 'flow_api_error', error };
      }

      throw error;
    }

    const expectedStatus = options.expectedStatus ?? 2;

    if (payment.status !== expectedStatus) {
      return { valid: false, reason: 'status_mismatch', payment };
    }

    if (
      options.expectedCommerceOrder !== undefined &&
      payment.commerceOrder !== options.expectedCommerceOrder
    ) {
      return { valid: false, reason: 'commerce_order_mismatch', payment };
    }

    if (
      options.expectedAmount !== undefined &&
      payment.amount !== options.expectedAmount
    ) {
      return { valid: false, reason: 'amount_mismatch', payment };
    }

    if (
      options.expectedCurrency !== undefined &&
      payment.currency !== options.expectedCurrency
    ) {
      return { valid: false, reason: 'currency_mismatch', payment };
    }

    return { valid: true, payment };
  }

  private getToken(payload: string | FlowPaymentConfirmationPayload): string {
    if (typeof payload === 'string') {
      return payload.trim();
    }

    if (payload.token === undefined || payload.token === null) {
      return '';
    }

    return String(payload.token).trim();
  }
}
