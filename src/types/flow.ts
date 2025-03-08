/**
 * Datos requeridos para crear una orden de pago en Flow.
 * Basado en la documentación oficial de Flow.cl.
 */
export interface FlowCreatePaymentRequest {
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
   * Identificador del medio de pago (opcional).
   * - `1` - Webpay
   * - `2` - Servipag
   * - `3` - Multicaja
   * - `4` - Otros
   */
  paymentMethod?: number;
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
}

/**
 * Respuesta al crear una orden de pago en Flow.
 */
export interface FlowCreatePaymentResponse {
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
}

/**
 * Respuesta al consultar el estado de una orden en Flow.
 */
export interface FlowPaymentStatusResponse {
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
  pendingInfo?: Record<string, string> | null;
  /**
   * Datos específicos del pago realizado (opcional).
   */
  paymentData?: Record<string, string> | null;
  /**
   * ID del comercio asociado (puede ser `null`).
   */
  merchantId?: string | null;
}
