// FlowCreatePaymentByEmailRequest,
// FlowCreatePaymentByEmailResponse,
// FlowCreatePaymentRequest,
// FlowCreatePaymentResponse,
// FlowPaymentsReceivedByDateRequest,
// FlowPaymentsReceivedByDateResponse,
// FlowPaymentsStatusExtendedResponse,
// FlowPaymentStatusResponse,
// FlowTransactionsReceivedByDateRequest,
// FlowTransactionsReceivedByDateResponse,

import {
  FlowPaginatedData,
  FlowPaymentMethods,
  FlowPaymentStatus,
  FlowSearchRequest,
} from './flow.common';

/**
 * Tipo para representar una solicitud de pago por email en Flow.
 */
type FlowCreatePaymentByEmailRequest = {
  /**
   * Orden del comercio (obligatorio)
   */
  commerceOrder: string;

  /**
   * Descripción de la orden (obligatorio)
   */
  subject: string;

  /**
   * Moneda de la orden (opcional)
   */
  currency?: string;

  /**
   * Monto de la orden (obligatorio)
   */
  amount: number;

  /**
   * Email del pagador (obligatorio)
   */
  email: string;

  /**
   * Identificador del medio de pago (opcional)
   * Si se envía este identificador, el pagador será redirigido directamente al medio de pago.
   * Si no se especifica, Flow presentará una página para seleccionar el medio de pago.
   * Para indicar todos los medios de pago, utilice el identificador: 9.
   */
  paymentMethod?: FlowPaymentMethods;

  /**
   * URL de confirmación de pago donde Flow confirmará la transacción (obligatorio)
   */
  urlConfirmation: string;

  /**
   * URL de retorno al comercio donde Flow redirigirá al pagador tras el pago (obligatorio)
   */
  urlReturn: string;

  /**
   * Datos opcionales en formato JSON clave=valor (opcional)
   * Ejemplo: {"rut":"9999999-9","nombre":"cliente 1"}
   */
  optional?: string;

  /**
   * Tiempo en segundos para que una orden expire después de ser creada (opcional)
   * Si no se envía este parámetro, la orden no expirará y estará vigente indefinidamente.
   */
  timeout?: number;

  /**
   * ID de comercio asociado (opcional)
   * Solo aplica si el comercio es integrador.
   */
  merchantId?: string;

  /**
   * Moneda en la que se espera que se pague la orden (opcional)
   */
  payment_currency?: string;
};

/**
 * Respuesta al crear una orden de pago en Flow.cl por email.
 */
type FlowCreatePaymentByEmailResponse = {
  /**
   * Token de la transacción generado por Flow.
   */
  token: string;
  /**
   * URL para redirigir al usuario y completar el pago.
   * Se debe concatenar con el token: `url + "?token=" + token`
   */
  url: string;
  /**
   * Número de orden generado por Flow.
   */
  flowOrder: number;
  /**
   * URL completa de redirección para completar el pago.
   */
  redirectUrl: string;
};

/**
 * Respuesta al consultar el estado de una orden en Flow.
 */
type FlowPaymentStatusResponse = {
  /**
   * Número de la orden en Flow.
   */
  flowOrder: number;
  /**
   * Número de orden del comercio.
   */
  commerceOrder: string;
  /**
   * Fecha de creación de la orden en formato YYYY-MM-DD HH:mm:ss.
   */
  requestDate: string;
  /**
   * Estado de la orden:
   * - `1` - Pendiente
   * - `2` - Pagada
   * - `3` - Rechazada
   * - `4` - Anulada
   */
  status: 1 | 2 | 3 | 4;
  /**
   * Estado de la orden en formato de texto:
   * - Pendiente
   * - Pagada
   * - Rechazada
   * - Anulada
   */
  statusStr: FlowPaymentStatus;
  /**
   * Descripción de la orden.
   */
  subject: string;
  /**
   * Moneda utilizada en la transacción.
   */
  currency: string;
  /**
   * Monto total de la transacción.
   */
  amount: number;
  /**
   * Correo electrónico del pagador.
   */
  payer: string;
  /**
   * Datos adicionales enviados en la transacción (puede ser `null`).
   */
  optional?: string | null;
  /**
   * Información adicional en caso de pago pendiente (opcional).
   */
  pendingInfo?: {
    /**
     * Fecha de emisión del cupón de pago.
     */
    media?: string | null;
    /**
     * Medio de pago utilizado para emitir el cupón de pago.
     */
    date?: string | null;
  } | null;
  /**
   * Datos específicos del pago realizado (opcional).
   */
  paymentData?: {
    /**
     * La fecha de pago
     */
    date?: string | null;

    /**
     * El medio de pago utilizado
     */
    media?: string | null;

    /**
     * La fecha de conversión de la moneda
     */
    conversionDate?: string | null;

    /**
     * La tasa de conversión
     */
    conversionRate?: number | null;

    /**
     * El monto pagado
     */
    amount?: number | null;

    /**
     * La moneda con que se pagó
     */
    currency?: string | null;

    /**
     * El costo del servicio
     */
    fee?: number | null;

    /**
     * El saldo a depositar
     */
    balance?: number | null;

    /**
     * La fecha de transferencia de los fondos a su cuenta bancaria
     */
    transferDate?: string | null;
  };
  /**
   * ID del comercio asociado (puede ser `null`).
   */
  merchantId?: string | null;
};

/**
 * Datos requeridos para crear una orden de pago en Flow.
 * Basado en la documentación oficial de Flow.cl.
 */
type FlowCreatePaymentRequest = {
  /**
   * Número único de orden del comercio (requerido).
   */
  commerceOrder: string;
  /**
   * Descripción de la orden (requerido).
   */
  subject: string;
  /**
   * Moneda de la orden (opcional, por defecto CLP).
   */
  currency?: string;
  /**
   * Monto de la orden en formato entero (requerido).
   */
  amount: number;
  /**
   * Email del pagador en formato válido (requerido).
   */
  email: string;
  /**
   * Identificador del medio de pago (opcional). "webpay-plus" | "mach" | "khipu" | "redpay" | "onepay" | "flow"
   * - `webpay-plus` - Webpay
   * - `mach` - Mach
   * - `khipu` - Khipu
   * - `redpay` - RedPay
   * - `onepay` - Onepay
   * - `flow` - Flow
   */
  paymentMethod?: FlowPaymentMethods;
  /**
   * URL de retorno del comercio para redirigir al pagador (requerido).
   */
  urlReturn: string;
  /**
   * URL callback del comercio para confirmar el pago (requerido).
   */
  urlConfirmation: string;
  /**
   * Datos opcionales en formato JSON clave=valor (opcional).
   */
  optional?: Record<string, string>;
  /**
   * Tiempo en segundos para que una orden expire (opcional).
   */
  timeout?: number;
  /**
   * ID del comercio asociado (opcional).
   */
  merchantId?: string;
  /**
   * Moneda en la que se espera que se pague la orden (opcional).
   */
  paymentCurrency?: string;
};

/**
 * Respuesta al crear una orden de pago en Flow.
 */
type FlowCreatePaymentResponse = {
  /**
   * Token de la transacción generado por Flow.
   */
  token: string;
  /**
   * URL para redirigir al usuario y completar el pago.
   * Se debe concatenar con el token: `url + "?token=" + token`
   */
  url: string;
  /**
   * Número de orden generado por Flow.
   */
  flowOrder: number;
  /**
   * URL completa de redirección para completar el pago.
   */
  redirectUrl: string;
};

/**
 * Datos requeridos para consultar los pagos recibidos por una fecha específica.
 *
 */
type FlowPaymentsReceivedByDateRequest = {
  /**
   * Fecha de los pagos a consultar.
   * Formato: YYYY-MM-DD
   */
  date: string | Date;
} & Omit<FlowSearchRequest, 'status' | 'filter'>;

/**
 * Datos requeridos para consultar los pagos recibidos por una fecha específica.
 *
 */
type FlowTransactionsReceivedByDateRequest = {
  /**
   * Fecha de los pagos a consultar.
   * Formato: YYYY-MM-DD
   */
  date: string | Date;
} & Omit<FlowSearchRequest, 'status' | 'filter'>;

/**
 * Tipo que representa la respuesta de la API al obtener el listado de pagos recibidos en un día.
 */
type FlowPaymentsReceivedByDateResponse = FlowPaginatedData;

/**
 * Represents the response schema for a Flow payment status request.
 */
type FlowPaymentsStatusExtendedResponse = {
  /**
   * The Flow order number.
   */
  flowOrder: number;

  /**
   * The commerce order number.
   */
  commerceOrder: string;

  /**
   * The order creation date in format yyyy-mm-dd hh:mm:ss.
   */
  requestDate: string;

  /**
   * The order status:
   * 1 - Pending payment
   * 2 - Paid
   * 3 - Rejected
   * 4 - Canceled
   */
  status: 1 | 2 | 3 | 4;

  /**
   * The order status in text format.
   */
  statusStr: FlowPaymentStatus;

  /**
   * The order concept.
   */
  subject: string;

  /**
   * The currency used for the transaction.
   */
  currency: string;

  /**
   * The total amount of the order.
   */
  amount: number;

  /**
   * The email of the payer.
   */
  payer: string;

  /**
   * Optional data sent by the merchant in JSON format.
   */
  optional?: Record<string, unknown> | null;

  /**
   * Information for pending payments when a payment coupon was generated.
   */
  pending_info?: {
    media: string;
    date: string;
  } | null;

  /**
   * Payment data details.
   */
  paymentData?: {
    date: string;
    media: string;
    conversionDate: string;
    conversionRate: number;
    amount: number;
    currency: string;
    fee: number;
    balance: number;
    transferDate: string;
    mediaType: string;
    cardLast4Numbers: string;
    taxes: number;
    installments: number;
    autorizationCode: string;
  } | null;

  /**
   * Associated merchant ID, applies only for integrator merchants.
   */
  merchantId?: string | null;

  /**
   * Last error information in case of a failed attempt.
   */
  lastError?: {
    code: string;
    message: string;
    medioCode: string;
  } | null;
};

type FlowTransactionsReceivedByDateResponse = FlowPaginatedData;

export type {
  FlowCreatePaymentByEmailRequest,
  FlowCreatePaymentByEmailResponse,
  FlowCreatePaymentRequest,
  FlowCreatePaymentResponse,
  FlowPaymentsReceivedByDateRequest,
  FlowPaymentsReceivedByDateResponse,
  FlowPaymentsStatusExtendedResponse,
  FlowPaymentStatusResponse,
  FlowTransactionsReceivedByDateRequest,
  FlowTransactionsReceivedByDateResponse,
};
