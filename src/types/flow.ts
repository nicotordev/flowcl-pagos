/**
 * Métodos de pago admitidos en Flow.
 */
type FlowPaymentMethods =
  | 'webpay-plus'
  | 'mach'
  | 'khipu'
  | 'redpay'
  | 'onepay'
  | 'flow';

/**
 * Estados de pago posibles en Flow.
 */
type FlowPaymentStatus = 'Pendiente' | 'Pagada' | 'Rechazada' | 'Anulada';

/**
 * Constantes relacionadas con Flow.
 */
type FlowConstants = {
  /**
   * Mapeo de métodos de pago a sus respectivos códigos numéricos.
   */
  FLOW_PAYMENT_METHOD_CODES: Record<FlowPaymentMethods, number>;
  /**
   * Mapeo de códigos de estado de pago a su representación en texto.
   */
  FLOW_PAYMENT_STATUS_CODES: Record<number, FlowPaymentStatus>;
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
  paymentMethod?: number;

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
  pendingInfo?: Record<string, string> | null;
  /**
   * Datos específicos del pago realizado (opcional).
   */
  paymentData?: Record<string, string> | null;
  /**
   * ID del comercio asociado (puede ser `null`).
   */
  merchantId?: string | null;
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
  /**
   * Número de página de inicio.
   */
  start?: number;
  /**
   * Límite de resultados por página.
   */
  limit?: number;
};

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
  /**
   * Número de página de inicio.
   */
  start?: number;
  /**
   * Límite de resultados por página.
   */
  limit?: number;
};

/**
 * Tipo que representa la respuesta de la API al obtener el listado de transacciones recibidas en un día.
 */
type FlowTransactionsReceivedByDateResponse = {
  /**
   * El número total de registros encontrados.
   */
  total: number;

  /**
   * Indica si existen más páginas de resultados.
   * `true` si hay más páginas disponibles, `false` si es la última página.
   */
  hasMore: boolean;

  /**
   * Arreglo de registros de la página actual.
   */
  data: Array<Record<string, unknown>>;
};

/**
 * Tipo que representa la respuesta de la API al obtener el listado de pagos recibidos en un día.
 */
type FlowPaymentsReceivedByDateResponse = {
  /**
   * El número total de registros encontrados.
   */
  total: number;

  /**
   * Indica si existen más páginas de resultados.
   * `true` si hay más páginas disponibles, `false` si es la última página.
   */
  hasMore: boolean;

  /**
   * Arreglo de registros de la página actual.
   */
  data: Array<Record<string, unknown>>;
};

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

/**
 * Tipo que representa una solicitud de reembolso en Flow.
 */
type FlowCreateRefundRequest = {
  /**
   * La orden de reembolso del comercio. Identifica de manera única el reembolso dentro del sistema del comercio.
   */
  refundCommerceOrder: string;

  /**
   * Email del receptor del reembolso. La persona que recibirá el reembolso.
   */
  receiverEmail: string;

  /**
   * Monto del reembolso en la moneda definida por el comercio.
   */
  amount: number;

  /**
   * La URL callback del comercio donde Flow comunica el estado del reembolso.
   */
  urlCallBack: string;

  /**
   * Identificador del comercio de la transacción original que se va a reembolsar (opcional).
   */
  commerceTrxId?: string;

  /**
   * Identificador de Flow de la transacción original que se va a reembolsar (opcional).
   */
  flowTrxId?: string;
};

/**
 * Representa el estado de un reembolso en Flow.
 */
type FlowRefundStatus =
  | 'created'
  | 'accepted'
  | 'rejected'
  | 'refunded'
  | 'canceled';

/**
 * Tipo que representa la respuesta de una solicitud de reembolso en Flow.
 */
type FlowCreateRefundResponse = {
  /**
   * Token del reembolso.
   */
  token: string;

  /**
   * Número de orden de reembolso.
   */
  flowRefundOrder: string;

  /**
   * Fecha de solicitud de reembolso en formato yyyy-mm-dd hh:mm:ss.
   */
  date: string;

  /**
   * Estado del reembolso. Los estados posibles son:
   * - created: Solicitud creada
   * - accepted: Reembolso aceptado
   * - rejected: Reembolso rechazado
   * - refunded: Reembolso reembolsado
   * - canceled: Reembolso cancelado
   */
  status: FlowRefundStatus;

  /**
   * Monto del reembolso.
   */
  amount: number;

  /**
   * Costo del servicio de reembolso.
   */
  fee: number;
};
/**
 * Tipo que representa la respuesta de una solicitud de cancelación de reembolso en Flow.
 */
type FlowCancelRefundResponse = {
  /**
   * Token único del reembolso.
   */
  token: string;

  /**
   * Número de orden asociado al reembolso.
   */
  flowRefundOrder: string;

  /**
   * Fecha de solicitud de reembolso en formato yyyy-mm-dd hh:mm.ss.
   */
  date: string;

  /**
   * Estado del reembolso. Puede ser uno de los siguientes valores:
   * - `created`: Solicitud creada.
   * - `accepted`: Reembolso aceptado.
   * - `rejected`: Reembolso rechazado.
   * - `refunded`: Reembolso completado.
   * - `canceled`: Reembolso cancelado.
   */
  status: FlowRefundStatus;

  /**
   * Monto total del reembolso.
   */
  amount: number;

  /**
   * Costo del servicio de reembolso.
   */
  fee: number;
};
/**
 * Representa la información de un reembolso en la plataforma Flow.cl.
 */
type FlowRefundStatusResponse = {
  /**
   * Token único del reembolso.
   */
  token: string;

  /**
   * Número de orden de reembolso asignado por Flow.
   */
  flowRefundOrder: string;

  /**
   * Fecha de solicitud del reembolso en formato "yyyy-mm-dd hh:mm:ss".
   */
  date: string;

  /**
   * Estado actual del reembolso.
   *
   * - `created`: Solicitud creada.
   * - `accepted`: Reembolso aceptado.
   * - `rejected`: Reembolso rechazado.
   * - `refunded`: Reembolso completado.
   * - `canceled`: Reembolso cancelado.
   */
  status: FlowRefundStatus;

  /**
   * Monto del reembolso en unidades monetarias (por ejemplo, CLP).
   */
  amount: number;

  /**
   * Costo del servicio de reembolso cobrado por Flow.
   */
  fee: number;
};

type FlowCreateCustomerRequest = {
  /**
   * Nombre del cliente que realiza la transacción.
   * Debe incluir nombre y apellido.
   */
  name: string;

  /**
   * Dirección de correo electrónico del cliente.
   * Se utilizará para notificaciones y validaciones.
   */
  email: string;

  /**
   * Identificador externo del cliente.
   * Corresponde al ID con el que el sistema del comercio reconoce al cliente.
   */
  externalId: string;
};

/**
 * Representa la respuesta de la API de Flow en formato application/json.
 */
type FlowCreateCustomerResponse = {
  /**
   * Identificador del cliente.
   */
  customerId: string;

  /**
   * La fecha de creación del cliente en formato yyyy-mm-dd hh:mm:ss.
   */
  created: string;

  /**
   * Dirección de correo electrónico del cliente.
   */
  email: string;

  /**
   * Nombre completo del cliente.
   */
  name: string;

  /**
   * Modo de pago del cliente:
   * - "auto": Cargo automático
   * - "manual": Cobro manual
   */
  pay_mode: 'auto' | 'manual';

  /**
   * La marca de la tarjeta de crédito registrada.
   */
  creditCardType: string;

  /**
   * Los últimos 4 dígitos de la tarjeta de crédito registrada.
   */
  last4CardDigits: string;

  /**
   * Identificador externo del cliente en el negocio del comercio.
   */
  externalId: string;

  /**
   * Estado del cliente:
   * - "0": Eliminado
   * - "1": Activo
   */
  status: '0' | '1';

  /**
   * La fecha en que el cliente registró su tarjeta de crédito en formato yyyy-mm-dd hh:mm:ss.
   */
  registerDate: string;
};

export type {
  FlowCreatePaymentRequest,
  FlowCreatePaymentResponse,
  FlowCreatePaymentByEmailRequest,
  FlowCreatePaymentByEmailResponse,
  FlowPaymentStatusResponse,
  FlowPaymentsReceivedByDateRequest,
  FlowPaymentsReceivedByDateResponse,
  FlowTransactionsReceivedByDateRequest,
  FlowTransactionsReceivedByDateResponse,
  FlowPaymentsStatusExtendedResponse,
  FlowPaymentMethods,
  FlowPaymentStatus,
  FlowConstants,
  FlowCreateRefundRequest,
  FlowCreateRefundResponse,
  FlowCancelRefundResponse,
  FlowRefundStatusResponse,
  FlowRefundStatus,
  FlowCreateCustomerRequest,
  FlowCreateCustomerResponse,
};
