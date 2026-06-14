import { FlowAPIError } from '../errors';
import { FlowPaymentStatusResponse } from './flow.payments';

type FlowPaymentConfirmationPayload = {
  token?: string | number | null;
};

type FlowWebhookVerificationFailureReason =
  | 'missing_token'
  | 'flow_api_error'
  | 'status_mismatch'
  | 'commerce_order_mismatch'
  | 'amount_mismatch'
  | 'currency_mismatch';

type FlowVerifyPaymentConfirmationOptions = {
  /**
   * Estado requerido para considerar válido el callback. Por defecto exige pago exitoso: 2 (Pagada).
   */
  expectedStatus?: FlowPaymentStatusResponse['status'];
  /**
   * Orden local esperada. Evita aceptar tokens válidos de otra orden.
   */
  expectedCommerceOrder?: string;
  /**
   * Monto local esperado. Evita aceptar tokens válidos con otro monto.
   */
  expectedAmount?: number;
  /**
   * Moneda local esperada. Evita aceptar tokens válidos con otra moneda.
   */
  expectedCurrency?: string;
};

type FlowVerifyPaymentConfirmationResult =
  | {
      valid: true;
      payment: FlowPaymentStatusResponse;
    }
  | {
      valid: false;
      reason: FlowWebhookVerificationFailureReason;
      payment?: FlowPaymentStatusResponse;
      error?: FlowAPIError;
    };

export type {
  FlowPaymentConfirmationPayload,
  FlowVerifyPaymentConfirmationOptions,
  FlowVerifyPaymentConfirmationResult,
  FlowWebhookVerificationFailureReason,
};
