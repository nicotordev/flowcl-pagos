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
  hasMore: 0 | 1;

  /**
   * Arreglo de registros de la página actual.
   */
  data: string;
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
  hasMore: 0 | 1;

  /**
   * Arreglo de registros de la página actual.
   */
  data: string;
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

/**
 * Representa la información de un cliente en Flow.
 */
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
/**
 * Representa la información de un cliente en Flow.
 */
type FlowEditCustomerRequest = {
  /**
   * Identificador único del cliente en Flow.
   */
  customerId: string;

  /**
   * Nombre del cliente que se desea actualizar.
   * Debe incluir nombre y apellido.
   * Opcional.
   */
  name?: string;

  /**
   * Dirección de correo electrónico del cliente.
   * Opcional.
   */
  email?: string;

  /**
   * Identificador externo del cliente en el negocio del comercio.
   * Opcional.
   */
  externalId?: string;
};

/**
 * Representa la respuesta de la API de Flow en formato application/json.
 */
type FlowEditCustomerResponse = {
  /**
   * Identificador único del cliente.
   */
  customerId: string;

  /**
   * Fecha de creación del cliente en formato yyyy-mm-dd hh:mm:ss.
   */
  created: string;

  /**
   * Correo electrónico del cliente.
   */
  email: string;

  /**
   * Nombre completo del cliente.
   */
  name: string;

  /**
   * Modo de pago del cliente.
   * Puede ser:
   * - 'auto' (cargo automático)
   * - 'manual' (cobro manual)
   */
  pay_mode: 'auto' | 'manual';

  /**
   * Marca de la tarjeta de crédito registrada.
   */
  creditCardType: string;

  /**
   * Últimos 4 dígitos de la tarjeta de crédito registrada.
   */
  last4CardDigits: string;

  /**
   * Identificador del cliente en su negocio.
   */
  externalId: string;

  /**
   * Estado del cliente.
   * Puede ser:
   * - '0' (Eliminado)
   * - '1' (Activo)
   */
  status: '0' | '1';

  /**
   * Fecha en la que el cliente registró su tarjeta de crédito.
   * Formato yyyy-mm-dd hh:mm:ss.
   */
  registerDate: string;
};
/**
 * Representa la respuesta de la API de Flow en formato application/json.
 */
type FlowDeleteCustomerResponse = {
  /**
   * Identificador único del cliente.
   */
  customerId: string;

  /**
   * Fecha de creación del cliente en formato yyyy-mm-dd hh:mm:ss.
   */
  created: string;

  /**
   * Correo electrónico del cliente.
   */
  email: string;

  /**
   * Nombre completo del cliente.
   */
  name: string;

  /**
   * Modo de pago del cliente.
   * Puede ser:
   * - 'auto' (cargo automático)
   * - 'manual' (cobro manual)
   */
  pay_mode: 'auto' | 'manual';

  /**
   * Marca de la tarjeta de crédito registrada.
   */
  creditCardType: string;

  /**
   * Últimos 4 dígitos de la tarjeta de crédito registrada.
   */
  last4CardDigits: string;

  /**
   * Identificador del cliente en su negocio.
   */
  externalId: string;

  /**
   * Estado del cliente.
   * Puede ser:
   * - '0' (Eliminado)
   * - '1' (Activo)
   */
  status: '0' | '1';

  /**
   * Fecha en la que el cliente registró su tarjeta de crédito.
   * Formato yyyy-mm-dd hh:mm:ss.
   */
  registerDate: string;
};
/**
 * Representa la respuesta de un cliente en el sistema de pagos.
 */
type FlowGetCustomerResponse = {
  /**
   * Identificador único del cliente.
   */
  customerId: string;

  /**
   * Fecha de creación del cliente en formato 'yyyy-mm-dd hh:mm:ss'.
   */
  created: string;

  /**
   * Correo electrónico del cliente.
   */
  email: string;

  /**
   * Nombre completo del cliente.
   */
  name: string;

  /**
   * Modo de pago del cliente.
   * Puede ser:
   * - 'auto' (cargo automático)
   * - 'manual' (cobro manual)
   */
  pay_mode: 'auto' | 'manual';

  /**
   * Tipo de tarjeta de crédito registrada (por ejemplo, Visa, Mastercard, etc.).
   */
  creditCardType: string;

  /**
   * Últimos 4 dígitos de la tarjeta de crédito registrada.
   */
  last4CardDigits: string;

  /**
   * Identificador externo del cliente en su negocio.
   */
  externalId: string;

  /**
   * Estado del cliente:
   * - '0' (Eliminado)
   * - '1' (Activo)
   */
  status: '0' | '1';

  /**
   * Fecha en que el cliente registró su tarjeta de crédito en formato 'yyyy-mm-dd hh:mm:ss'.
   */
  registerDate: string;
};

type FlowGetCustomerListRequest = {
  /**
   * Número de registro de inicio de la página.
   * Si se omite, el valor por defecto es 0.
   */
  start?: number;

  /**
   * Número de registros por página.
   * Si se omite, el valor por defecto es 10.
   * El valor máximo permitido es 100.
   */
  limit?: number;

  /**
   * Filtro por nombre del cliente.
   */
  filter?: string;

  /**
   * Filtro por estado del cliente.
   */
  status?: number;
};

type FlowGetCustomerListResponse = {
  /**
   *  El número total de registros encontrados.
   */
  total: number;

  /**
   * Indica si existen más páginas de resultados.
   * `true` si hay más páginas disponibles, `false` si es la última página.
   */
  hasMore: 0 | 1;

  /**
   * Arreglo de registros de la página actual.
   */
  data: string;
};
/**
 * Representa la información de una tarjeta de crédito registrada en Flow.
 */
type FlowRegisterCardRequest = {
  /**
   * Identificador único del cliente en Flow.
   */
  customerId: string;
  /**
   * URL de retorno del comercio para redirigir al pagador (requerido).
   */
  url_return: string;
};

/**
 * Representa la respuesta de la API de Flow del registro de una tarjeta de crédito.
 */

type FlowRegisterCardResponse = {
  /**
   * URL para redirigir al usuario y completar el pago.
   */
  url: string;
  /**
   * Token de la transacción generado por Flow.
   */
  token: string;
  /**
   * URL completa de redirección para completar el pago.
   */
  redirectUrl: string;
};
/**
 * Representa la respuesta de la API de Flow del estado de la tarjeta de crédito registrada.
 */
type FlowRegisterCardStatusResponse = {
  /**
   * Estado de la tarjeta de crédito registrada.
   * - `0` - Tarjeta registrada
   * - `1` - Tarjeta no registrada
   */
  status: '0' | '1';
  /**
   * Identificador del cliente
   */
  customerId: string;
  /**
   * Tipo de tarjeta de crédito registrada. Ejemplo: Visa, Mastercard, etc.
   */
  creditCardType: string;
  /**
   * Últimos 4 dígitos de la tarjeta de crédito registrada.
   */
  last4CardDigits: string;
};

type FlowDeleteCardResponse = {
  /**
   * Identificador del cliente
   */
  customerId: string;

  /**
   * La fecha de creación (Formato: yyyy-mm-dd hh:mm:ss)
   */
  created: string;

  /**
   * Email del cliente
   */
  email: string;

  /**
   * Nombre del cliente
   */
  name: string;

  /**
   * Modo de pago del cliente:
   * - "auto": Cargo automático
   * - "manual": Cobro manual
   */
  pay_mode: 'auto' | 'manual';

  /**
   * La marca de la tarjeta de crédito registrada
   */
  creditCardType: string;

  /**
   * Los últimos 4 dígitos de la tarjeta de crédito registrada
   */
  last4CardDigits: string;

  /**
   * El identificador del cliente en su negocio
   */
  externalId: string;

  /**
   * El estado del cliente:
   * - "0": Eliminado
   * - "1": Activo
   */
  status: '0' | '1';

  /**
   * La fecha en que el cliente registró su tarjeta de crédito (Formato: yyyy-mm-dd hh:mm:ss)
   */
  registerDate: string;
};
/**
 * Representa la información de cuando cobramos a una tarjeta de crédito.
 */
type FlowChargeCardRequest = {
  /**
   * Identificador único del cliente en Flow.
   */
  customerId: string;
  /**
   * El monto del cargo
   */
  amount: number;
  /**
   * Descripción del cargo
   */
  subject: string;
  /**
   * Identificador de la orden del comercio
   */
  commerceOrder: string;
  /**
   * Moneda del cargo (CLP, UF)
   * Por defecto es CLP
   */
  currency?: string;
  /**
   * Datos opcionales en formato JSON clave=valor (opcional).
   */
  optionals?: string;
};
/**
 * Representa la respuesta de la API de Flow del cargo a la tarjeta de crédito registrada.
 */
type FlowChargeCardResponse = {
  /**
   * El número de la orden de Flow
   */
  flowOrder: number;

  /**
   * El número de la orden del comercio
   */
  commerceOrder: string;

  /**
   * La fecha de creación de la orden (formato: yyyy-mm-dd hh:mm:ss)
   */
  requestDate: string;

  /**
   * El estado de la orden:
   * 1 - Pendiente de pago
   * 2 - Pagada
   * 3 - Rechazada
   * 4 - Anulada
   */
  status: 1 | 2 | 3 | 4;

  /**
   * El concepto de la orden
   */
  subject: string;

  /**
   * La moneda
   */
  currency: string;

  /**
   * El monto de la orden
   */
  amount: number;

  /**
   * El email del pagador
   */
  payer: string;

  /**
   * Datos opcionales enviados por el comercio en formato JSON (puede ser nulo)
   */
  optional?: string | null;

  /**
   * Información para un pago pendiente cuando se generó un cupón de pago.
   * Si no existen datos, es que no se generó un cupón de pago.
   */
  pending_info?: Record<string, unknown>;

  /**
   * Los datos del pago
   */
  paymentData?: Record<string, unknown>;

  /**
   * ID de comercio asociado (solo aplica si el usuario es un comercio integrador, puede ser nulo)
   */
  merchantId?: string | null;
};
/**
 * Representa la información de cuando cobramos a una tarjeta de crédito.
 */
type FlowSendChargeRequest = {
  /**
   * Identificador único del cliente en Flow.
   */
  customerId: string;
  /**
   * El número de la orden del comercio
   */
  commerceOrder: string;
  /**
   * El motivo del cobro
   */
  subject: string;
  /**
   * El monto del cobro
   */
  amount: number;
  /**
   * url callbak del comercio donde Flow confirmará el pago
   */
  urlConfirmation: string;
  /**
   * url de retorno al comercio donde Flow redirigirá al pagador tras el pago
   */
  urlReturn: string;
  /**
   * Moneda del cobro (CLP, UF)
   * Por defecto es CLP
   * */
  currency?: string;
  /**
   * Metodo de pago
   */
  paymentMethod?: FlowPaymentMethods;
  /**
   * Si se desea que Flow envíe cobros por email, este parámetro debe enviarse con valor 1
   */
  byEmail?: 1;
  /**
   * Número de días posteriores al envío del cobro para enviar una nueva notificación de persistencia si la orden no está pagada.
   */
  forward_days_after?: number;
  /**
   * Número de veces de envío de mail de persistencia.
   */
  forward_times?: number;
  /**
   * Si se envía este parámetro con valor 1 entonces ignora el método de cargo automático aunque el cliente tenga registrada una tarjeta de crédito
   */
  ignore_auto_charging?: 1;
  /**
   * Datos opcionales en formato JSON clave=valor (opcional).
   */
  optionals?: string;
  /**
   * Tiempo en segundos para que una orden expire después de ser creada (opcional)
   * Si no se envía este parámetro, la orden no expirará y estará vigente indefinidamente.
   *  */
  timeout?: number;
};
/**
 * Representa la respuesta de la API de Flow del cargo a la tarjeta de crédito registrada.
 */
type FlowSendChargeResponse = {
  /**
   * Tipo de cobro:
   * 1 Cobro automático
   * 2 Cobro normal (link de pago)
   * 3 Cobro por email
   */
  type: 1 | 2 | 3;
  /**
   * El número de la orden del comercio
   */
  commerceOrder: string;
  /**
   * El número de la orden de Flow
   */
  flowOrder: number;
  /**
   * URL ha redireccionar. Los cargos automaticos no tienen url por ser síncronos. Para formar el link de pago a esta URL se debe concatenar el token de la siguiente manera: url + "?token=" + token
   */
  url: string;
  /**
   * token de la transacción
   */
  token: string;
  /**
   * Estado de emisión del cobro, es decir si se emitió el cobro, no indica si hubo pago:
   * 0 Cobro no emitido (uncollected
   * 1 Cobro emitido (collected)
   */
  status: 0 | 1;
  /**
   * Objeto que representa un cobro y si está pagado su correspondiente pago
   */
  paymentResult: {
    /**
     * El número de la orden de Flow
     */
    flowOrder: number;
    /**
     * El número de la orden del comercio
     */
    commerceOrder: string;
    /**
     * La fecha de creación de la orden (<yyyy-mm-dd hh:mm:ss>)
     */
    requestDate: string;
    /**
     * El estado de la order
     * 1 pendiente de pago
     * 2 pagada
     * 3 rechazada
     * 4 anulada
     */
    status: 1 | 2 | 3 | 4;
    /**
     * El concepto de la orden
     */
    subject: string;
    /**
     * La moneda de la orden (CLP, UF)
     */
    currency: string;
    /**
     * El monto de la orden
     */
    amount: number;
    /**
     * El email del pagador
     */
    payer: string;
    /**
     * Datos opcionales enviados por el comercio en formato JSON (puede ser nulo)
     */
    optional?: string;
    /**
     * Información para un pago pendiente cuando se generó un cupón de pago. Si no existen datos es que no se generó un cupón de pago.
     */
    pending_info: {
      /**
       * El medio de pago utilizado para emitir el cupón de pago
       */
      media: string | null;
      /**
       * La fecha de emisión del cupón de pago
       */
      date: string | null;
    };
    paymentData: {
      /**
       * La fecha de pago
       */
      date: string | null;
      /**
       * El medio de pago utilizado
       */
      media: string | null;
      /**
       * La fecha de conversión de la moneda
       */
      conversionDate: string | null;
      /**
       * La tasa de conversión.
       */
      conversionRate: number | null;
      /**
       * El monto pagado
       */
      amount: number | null;
      /**
       * La moneda con que se pagó
       */
      currency: string | null;
      /**
       * El costo del servicio
       */
      fee: number | null;
      /**
       * El saldo a depositar
       */
      balance: number | null;
      /**
       * La fecha de transferencia de los fondos a su cuenta bancaria.

       */
      transferDate: string | null;
    };
    merchantId: string;
  } | null;
};

/**
 * Representa el cobro masivo de tarjetas de crédito.
 */
type FlowSendMassiveChargeCardRequest = {
  /**
   * url callback del comercio donde Flow avisará cuando el lote ha sido procesado.
   */
  urlCallBack: string;
  /**
   * url callbak del comercio donde Flow confirmará el pago
   */
  urlConfirmation: string;
  /**
   * url de retorno del comercio donde Flow redirigirá al pagador
   */
  urlReturn: string;
  /**
   * Arreglo en formato JSON del lote de cargos CollectObject
   */
  batchRows: Array<{
    /**
     * Identificador del cliente en Flow
     */
    customerId: string;
    /**
     * Identificador de la orden del comercio
     */
    commerceOrder: string;
    /**
     * descripción de la orden de cobro
     */
    subject: string;
    /**
     * monto del cobro
     */
    amount: number;
    /**
     * moneda del cobro, por omisón CLP
     */
    currency?: string;
    /**
     * medio de pago en el caso de cobros tipo 2, por omisión 9 todos los medios de pago disponibles por el comercio
     */
    paymentMethod?: FlowPaymentMethods;
    /**
     * Valores opcionales en formato JSON
     */
    optional?: string;
  }>;
  /**
   * Si se desea que Flow envíe cobros por email, este parámetro debe enviarse con valor 1
   */
  byEmail?: 1;
  /**
   * Número de días posteriores al envío del cobro para enviar una nueva notificación de persistencia si la orden no está pagada.
   */
  forward_days_after?: number;
  /**
   * Número de veces de envío de mail de persistencia.
   */
  forward_times?: number;
  /**
   * tiempo en segundos para que una orden expire después de haber sido creada. Si no se envía este parámetro la orden no expirará y estará vigente para pago por tiempo indefinido. Si envía un valor en segundos, la orden expirará x segundos después de haber sido creada y no podrá pagarse.
   */
  timeout?: number;
};
/**
 * Representa la API response de Flow del cobro masivo de tarjetas de crédito.
 */

type FlowSendMassiveChargeCardResponse = {
  /**
   * Token del lote de cobros
   */
  token: string;
  /**
   * Número de filas de collects recibidas
   */
  receivedRows: number;
  /**
   * Número de filas aceptadas
   */
  acceptedRows: number;
  /**
   * Número de filas rechazadas
   */
  rejectedRows: Array<{
    /**
     * Identificador del cliente en Flow
     */
    customerId: string;
    /**
     *  Identificador de la orden del comercio
     */
    commerceOrder: string;
    /**
     * Número de fila
     */
    rowNumber: number;
    /**
     * nombre del parametros con error
     */
    parameter: string;
    /**
     *  código del error:
     * 100 Mandatory field not sent
     * 101 Value is empty or cero
     * 102 Invalid field
     * 103 customer not exist or deleted
     * 104 CommerceOrder already sent
     * 105 CommerceOrder has been previously paid
     * 106 Currency is not soported
     * 107 Amount is not numeric
     * 108 Amount can not contain decimals for this currency
     * 109 The minimum amount is $value CLP
     * 110 Optional values are not in JSON format
     */
    errorCode: 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110;
    /**
     * Mensaje de error
     */
    errorMsg: string;
  }>;
};
/**
 * Representa la API response de Flow del estado del cobro masivo de tarjetas de crédito.
 */
type FlowMassiveChargeCardStatusResponse = {
  /**
   * hash token identificador del lote recibido
   */
  token: string;
  /**
   * Fecha de creación del lote (<yyyy-mm-dd hh:mm:ss>)
   */
  createdDate: string;
  /**
   * Fecha en que se procesó el lote (<yyyy-mm-dd hh:mm:ss>)
   */
  processedDate: string;
  /**
   * Estado del lote de collect:
   * created (lote creado)
   * processing (lote en procesamiento)
   * processed (lote procesado)
   */
  status: 'created' | 'processing' | 'processed';
  /**
   * arreglo de resultados de los cargos (collect) generados
   */
  collectRows: Array<{
    /**
     * El número de la orden del comercio
     */
    commerceOrder: string;
    /**
     * Tipo de cobro:
     * 1 Cobro automático
     * 2 Cobro normal (link de pago)
     * 3 Cobro por email
     */
    type: 1 | 2 | 3;
    /**
     * El número de la orden de Flow
     */
    flowOrder: number;
    /**
     * URL ha redireccionar. Los cargos automaticos no tienen url por ser síncronos. Para formar el link de pago a esta URL se debe concatenar el token de la siguiente manera: url + "?token=" + token
     */
    url: string;
    /**
     * token de la transacción
     */
    token: string;
    /**
     * Estado del registro de collect:
     * unprocessed (Fila no procesada)
     * collected (Cobro generado)
     * uncollected (Cobro no generado)
     */
    status: 'unprocessed' | 'collected' | 'uncollected';
    /**
     * Código de error de la fila
     */
    erroorCode: number;
    /**
     * Mensaje de error de la fila
     */
    errorMsg: string;
  }>;
};
/**
 * Representa la información de la reversa de un cargo a la tarjeta de crédito.
 */
type FlowReverseChargeCardRequest = {
  /**
   * Identificador de la orden del comercio
   */
  commerceOrder?: string;
  /**
   * Identificador de la orden de Flow
   */
  flowOrder?: number;
};
/**
 * Representa la respuesta de la API de Flow de la reversa de un cargo a la tarjeta de crédito.
 */
type FlowReverseChargeCardResponse = {
  /**
   * Estado de la reversa:
   * 0 Reversa no efectuada
   * 1 Reversa efectuada
   */
  status: 0 | 1;
  /**
   * Mensaje resultado de la reversa
   */
  message: string;
};
/**
 * Representa la información de los cobros en Flow.
 */
type FlowListChargesRequest = {
  /**
   * Identificador del cliente
   */
  customerId: string;
  /**
   * Número de registro de inicio de la página. Si se omite el valor por omisión es 0.
   */
  start?: number;
  /**
   * Número de registros por página. Si se omite el valor por omisón es 10. El valor máximo es de 100 registros por página.
   */
  limit?: number;
  /**
   * Filtro por descripción del cargo
   */
  filter?: string;
  /**
   * Filtro por fecha de inicio (<yyyy-mm-dd>)
   */
  fromDate?: string;
  /**
   * Filtro por estado del cargo
   */
  status?: number;
};
/**
 * Representa la respuesta de la API de Flow de la lista de cobros.
 */
type FlowListChargesResponse = {
  /**
   * El número total de registros encontrados
   */
  total: number;
  /**
   * El número total de registros encontrados
   * 1 Si existen más páginas
   * 0 Si es la última página
   */
  hasMore: 0 | 1;
  /**
   * arreglo de registros de la página
   * ej: [{item list 1}{item list 2}{item list n..}
   */
  data: string;
};
/**
 * Representa la información de los cobros fallidos en Flow.
 */
type FlowListFailedChargesRequest = {
  /**
   * Identificador del cliente
   */
  customerId: string;
  /**
   * Número de registro de inicio de la página. Si se omite el valor por omisión es 0.
   */
  start?: number;
  /**
   * Número de registros por página. Si se omite el valor por omisón es 10. El valor máximo es de 100 registros por página.
   */
  limit?: number;
  /**
   * Filtro por descripción del error
   */
  filter?: string;
  /**
   * Filtro por fecha de inicio (<yyyy-mm-dd>)
   */
  fromDate?: string;
  /**
   * Filtro por el número de la orden del comercio
   */
  commerceOrder?: number;
};
/**
 * Representa la respuesta de la API de Flow de la lista de cobros fallidos.
 */
type FlowListFailedChargesResponse = {
  /**
   * El número total de registros encontrados
   */
  total: number;
  /**
   * El número total de registros encontrados
   * 1 Si existen más páginas
   * 0 Si es la última página
   */
  hasMore: 0 | 1;
  /**
   * arreglo de registros de la página
   * ej: [{item list 1}{item list 2}{item list n..}
   */
  data: string;
};
/**
 * Lista paginada de suscripciones de un cliente
 */
type FlowListPaginatedSubscriptionsRequest = {
  /**
   * Identificador del cliente
   */
  customerId: string;
  /**
   * Número de registro de inicio de la página. Si se omite el valor por omisión es 0.
   */
  start?: number;
  /**
   * Número de registros por página. Si se omite el valor por omisón es 10. El valor máximo es de 100 registros por página.
   */
  limit?: number;
  /**
   * filtro por el identificador de la suscripción
   */
  filter?: string;
};

type FlowListPaginatedSubscriptionsResponse = {
  /**
   * El número total de registros encontrados
   */
  total: number;
  /**
   * El número total de registros encontrados
   * 1 Si existen más páginas
   * 0 Si es la última página
   */
  hasMore: 0 | 1;
  /**
   * arreglo de registros de la página
   * ej: [{item list 1}{item list 2}{item list n..}
   */
  data: string;
};
/**
 * Representa la información de la creación de un plan.
 */
type FlowCreatePlanRequest = {
  /**
   * Identificador del Plan. Un texto sin espacios, ejemplo: "PlanMensual" (obligatorio)
   */
  planId: string;

  /**
   * Nombre del Plan (obligatorio)
   */
  name: string;

  /**
   * Moneda del Plan, por omisión "CLP"
   */
  currency?: string;

  /**
   * Monto del Plan (obligatorio)
   */
  amount: number;

  /**
   * Especifica la frecuencia de cobros (obligatorio)
   * 1 = diario
   * 2 = semanal
   * 3 = mensual
   * 4 = anual
   */
  interval: 1 | 2 | 3 | 4;

  /**
   * Número de intervalos de frecuencia de cobros. Por omisión es 1.
   * Ejemplo: interval = 2 y interval_count = 2 → frecuencia quincenal.
   */
  interval_count?: number;

  /**
   * Número de días de prueba (trial). Por omisión es 0.
   */
  trial_period_days?: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido. Por omisión es 3.
   */
  days_until_due?: number;

  /**
   * Número de períodos de duración del plan. Si el plan tiene vencimiento, especificarlo aquí.
   */
  periods_number?: number;

  /**
   * URL donde Flow notificará al comercio los pagos efectuados por este plan.
   */
  urlCallback?: string;

  /**
   * Número de reintentos de cargo. Por omisión es 3.
   */
  charges_retries_number?: number;

  /**
   * Opción de conversión de moneda:
   * 1 = al pago (default)
   * 2 = al importe (invoice)
   */
  currency_convert_option?: 1 | 2;
};
/**
 * Representa la respuesta de la API de Flow de la creación de un plan.
 */
type FlowCreatePlanResponse = {
  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  name: string;

  /**
   * Moneda del plan
   */
  currency: string;

  /**
   * Monto del plan
   */
  amount: number;

  /**
   * Define la frecuencia de cobro del plan:
   * 1 = diaria
   * 2 = semanal
   * 3 = mensual
   * 4 = anual
   */
  interval: number;

  /**
   * Número de intervalos de la frecuencia de cobro del plan. Ejemplo:
   * interval = 2 y interval_count = 2 → plan quincenal.
   */
  interval_count: number;

  /**
   * Fecha de creación del plan en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Número de días de prueba (trial)
   */
  trial_period_days: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Número de períodos de duración del plan.
   * Si el plan es indefinido, el valor será 0.
   */
  periods_number: number;

  /**
   * URL donde Flow notificará al comercio los pagos efectuados por este plan.
   */
  urlCallback: string;

  /**
   * Número de reintentos de cargo. Por omisión es 3.
   */
  charges_retries_number: number;

  /**
   * Si hay conversión de moneda, en qué momento se hará:
   * 1 = al pago
   * 2 = al importe (invoice)
   */
  currency_convert_option: number;

  /**
   * Estado del plan:
   * 1 = activo
   * 0 = eliminado
   */
  status: number;

  /**
   * Visibilidad del plan:
   * 0 = privado
   * 1 = público
   */
  public: number;
};

type FlowGetPlanResponse = {
  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  name: string;

  /**
   * Moneda del plan
   */
  currency: string;

  /**
   * Monto del plan
   */
  amount: number;

  /**
   * Define la frecuencia de cobro del plan:
   * 1 = diaria
   * 2 = semanal
   * 3 = mensual
   * 4 = anual
   */
  interval: number;

  /**
   * Número de intervalos de la frecuencia de cobro del plan. Ejemplo:
   * interval = 2 y interval_count = 2 → plan quincenal.
   */
  interval_count: number;

  /**
   * Fecha de creación del plan en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Número de días de prueba (trial)
   */
  trial_period_days: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Número de períodos de duración del plan.
   * Si el plan es indefinido, el valor será 0.
   */
  periods_number: number;

  /**
   * URL donde Flow notificará al comercio los pagos efectuados por este plan.
   */
  urlCallback: string;

  /**
   * Número de reintentos de cargo. Por omisión es 3.
   */
  charges_retries_number: number;

  /**
   * Si hay conversión de moneda, en qué momento se hará:
   * 1 = al pago
   * 2 = al importe (invoice)
   */
  currency_convert_option: number;

  /**
   * Estado del plan:
   * 1 = activo
   * 0 = eliminado
   */
  status: 0 | 1;

  /**
   * Visibilidad del plan:
   * 0 = privado
   * 1 = público
   */
  public: number;
};

type FlowEditPlanRequest = {
  /**
   * Identificador del Plan (requerido)
   */
  planId: string;

  /**
   * Nombre del Plan (opcional)
   */
  name?: string;

  /**
   * Moneda del Plan (opcional)
   */
  currency?: string;

  /**
   * Monto del Plan (opcional)
   */
  amount?: number;

  /**
   * Especifica la frecuencia de cobros (opcional)
   * 1 = diario
   * 2 = semanal
   * 3 = mensual
   * 4 = anual
   */
  interval?: 1 | 2 | 3 | 4;

  /**
   * Número de intervalos de frecuencia de cobros (opcional)
   * Ejemplo: interval = 2 y interval_count = 2 → frecuencia quincenal.
   * El valor por omisión es 1.
   */
  interval_count?: number;

  /**
   * Número de días de prueba (trial) (opcional)
   * El valor por omisión es 0.
   */
  trial_period_days?: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido (opcional)
   */
  days_until_due?: number;

  /**
   * Número de períodos de duración del plan (opcional)
   * Si el plan tiene vencimiento, especificarlo aquí.
   */
  periods_number?: number;

  /**
   * URL donde Flow notificará al comercio los pagos efectuados por este plan (opcional)
   */
  urlCallback?: string;

  /**
   * Número de reintentos de cargo (opcional)
   * Por omisión es 3.
   */
  charges_retries_number?: number;

  /**
   * Opción de conversión de moneda (opcional)
   * 1 = al pago (default)
   * 2 = al importe (invoice)
   */
  currency_convert_option?: 0 | 1;
};

type FlowEditPlanResponse = {
  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  name: string;

  /**
   * Moneda del plan
   */
  currency: string;

  /**
   * Monto del plan
   */
  amount: number;

  /**
   * Define la frecuencia de cobro del plan:
   * 1 = diaria
   * 2 = semanal
   * 3 = mensual
   * 4 = anual
   */
  interval: 1 | 2 | 3 | 4;

  /**
   * Número de intervalos de la frecuencia de cobro del plan. Ejemplo:
   * interval = 2 y interval_count = 2 → plan quincenal.
   */
  interval_count: number;

  /**
   * Fecha de creación del plan en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Número de días de prueba (trial)
   */
  trial_period_days: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Número de períodos de duración del plan.
   * Si el plan es indefinido, el valor será 0.
   */
  periods_number: number;

  /**
   * URL donde Flow notificará al comercio los pagos efectuados por este plan.
   */
  urlCallback: string;

  /**
   * Número de reintentos de cargo. Por omisión es 3.
   */
  charges_retries_number: number;

  /**
   * Si hay conversión de moneda, en qué momento se hará:
   * 1 = al pago
   * 2 = al importe (invoice)
   */
  currency_convert_option: 1 | 2;

  /**
   * Estado del plan:
   * 1 = activo
   * 0 = eliminado
   */
  status: 0 | 1;

  /**
   * Visibilidad del plan:
   * 0 = privado
   * 1 = público
   */
  public: 0 | 1;
};

type FlowDeletePlanResponse = {
  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  name: string;

  /**
   * Moneda del plan
   */
  currency: string;

  /**
   * Monto del plan
   */
  amount: number;

  /**
   * Define la frecuencia de cobro del plan:
   * 1 = diaria
   * 2 = semanal
   * 3 = mensual
   * 4 = anual
   */
  interval: 1 | 2 | 3 | 4;

  /**
   * Número de intervalos de la frecuencia de cobro del plan. Ejemplo:
   * interval = 2 y interval_count = 2 → plan quincenal.
   */
  interval_count: number;

  /**
   * Fecha de creación del plan en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Número de días de prueba (trial)
   */
  trial_period_days: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Número de períodos de duración del plan.
   * Si el plan es indefinido, el valor será 0.
   */
  periods_number: number;

  /**
   * URL donde Flow notificará al comercio los pagos efectuados por este plan.
   */
  urlCallback: string;

  /**
   * Número de reintentos de cargo. Por omisión es 3.
   */
  charges_retries_number: number;

  /**
   * Si hay conversión de moneda, en qué momento se hará:
   * 1 = al pago
   * 2 = al importe (invoice)
   */
  currency_convert_option: number;

  /**
   * Estado del plan:
   * 1 = activo
   * 0 = eliminado
   */
  status: 0 | 1;

  /**
   * Visibilidad del plan:
   * 0 = privado
   * 1 = público
   */
  public: 0 | 1;
};

type FlowListPlansRequest = {
  /**
   * Número de registro de inicio de la página. Si se omite el valor por omisión es 0.
   */
  start?: number;

  /**
   * Número de registros por página. Si se omite el valor por omisión es 10. El valor máximo es de 100 registros por página.
   */
  limit?: number;

  /**
   * Filtro por el nombre del Plan (opcional)
   */
  filter?: string;

  /**
   * Filtro por el estado del Plan: 1 = Activo, 0 = Eliminado (opcional)
   */
  status?: number;
};

type FlowListPlansResponse = {
  /**
   * El número total de registros encontrados
   */
  total: number;

  /**
   * Indica si existen más páginas de resultados.
   * 1 si hay más páginas disponibles, 0 si es la última página.
   */
  hasMore: 0 | 1;

  /**
   * Arreglo de registros de la página actual.
   * Ejemplo: [{item list 1}{item list 2}{item list n..}]
   */
  data: string;
};

type FlowCreateSubscriptionToPlanRequest = {
  /**
   * Identificador del Plan (requerido)
   */
  planId: string;

  /**
   * Identificador del cliente (requerido)
   */
  customerId: string;

  /**
   * La fecha de inicio de la suscripción en formato yyyy-mm-dd
   */
  subscription_start?: string;

  /**
   * Identificador del cupón de descuento (opcional)
   */
  couponId?: number;

  /**
   * Número de días de Trial. Si el parámetro viene presente, se utilizará lo enviado como la cantidad de días de Trial. En caso de no venir presente se utilizará el trial_periods_number configurado en el Plan asociado.
   */
  trial_period_days?: number;

  /**
   * Número de períodos de duración de la subscripción. Si null, entonces tomará el periods_number del plan.
   */
  periods_number?: number;
};

type FlowCreateSubscriptionToPlanResponse = {
  /**
   * Identificador de la suscripción
   */
  subscriptionId: string;

  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  plan_name: string;

  /**
   * Identificador del cliente
   */
  customerId: string;

  /**
   * Fecha de creación de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Fecha de inicio de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  subscription_start: string;

  /**
   * Fecha de término de la suscripción en formato yyyy-mm-dd hh:mm:ss, si la suscripción no tiene término mostrará valor null.
   */
  subscription_end: string | null;

  /**
   * Fecha de inicio del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_start: string;

  /**
   * Fecha de término del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_end: string;

  /**
   * Fecha del siguiente cobro en formato yyyy-mm-dd hh:mm:ss
   */
  next_invoice_date: string;

  /**
   * Número de días de Trial
   */
  trial_period_days: number;

  /**
   * Fecha de inicio del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_start: string;

  /**
   * Fecha de término del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_end: string;

  /**
   * Si la suscripción será cancelada automáticamente al finalizar el período actual:
   * 0 No
   * 1 Si
   */
  cancel_at_period_end: number;

  /**
   * Fecha de cancelación de la suscripción
   */
  cancel_at: string;

  /**
   * Número de períodos de vigencia de la suscripción
   */
  periods_number: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Estado de la suscripción:
   * 0 Inactivo (no iniciada)
   * 1 Activa
   * 2 En período de trial
   * 4 Cancelada
   */
  status: number;

  /**
   * Monto de balance a favor en la suscripción
   */
  discount_balance: string;

  /**
   * Id del nuevo plan programado a cambiarse
   */
  newPlanId: number;

  /**
   * Fecha de cambio de plan programado
   */
  new_plan_scheduled_change_date: string;

  /**
   * Fecha de próximo intento de cambio de plan
   */
  in_new_plan_next_attempt_date: string;

  /**
   * Si la suscripción está morosa:
   * 0 si todos los invoices están pagados.
   * 1 si uno o más invoices están vencidos.
   * 2 si uno o más invoices están pendientes de pago, pero no vencidos.
   */
  morose: number;

  /**
   * Descuento aplicado a una Suscripción
   */
  discount: {
    /**
     * Identificador del descuento
     */
    id: number;

    /**
     * Tipo de descuento puede ser de 2 tipos:
     * Subscription discount
     * Customer discount
     */
    type: string;

    /**
     * Fecha de creación del descuento
     */
    created: string;

    /**
     * Fecha de inicio del descuento
     */
    start: string;

    /**
     * Fecha de término del descuento
     */
    end: string;

    /**
     * Fecha en que se eliminó el descuento o null si está vigente
     */
    deleted: string | null;

    /**
     * Estado del descuento:
     * 1 Activo
     * 0 Inactivo
     */
    status: number;

    /**
     * Cupón asociado al descuento
     */
    coupon: {
      /**
       * El identificador del cupón
       */
      id: number;

      /**
       * El nombre del cupón
       */
      name: string;

      /**
       * Si el cupón es del tipo porcentaje, en este campo indica el porcentaje de descuento, sino, muestra vacío.
       */
      percent_off: number | null;

      /**
       * Si el cupón es del tipo monto, aquí va la moneda, sino, muestra vacío
       */
      currency: string | null;

      /**
       * Si el cupón es del tipo monto, aquí va el monto de descuento, sino, muestra vacío
       */
      amount: number | null;

      /**
       * La fecha de creación del cupón
       */
      created: string;

      /**
       * Si el cupón es de duración indefinida = 0, o es de duración definida = 1
       */
      duration: number;

      /**
       * Si el cupón es de duración definida, en este campo va el número de veces de duración. Si el cupón es aplicado a un cliente, el número de duración equivale a meses, si el cupón es aplicado a una suscripción, el número de duración será los períodos del plan de suscripción
       */
      times: number;

      /**
       * Es el número de veces que puede ser aplicado este cupón, ya sea a clientes o a suscripciones. Una vez que se completa el número de veces, ya no queda disponible para ser aplicado.
       */
      max_redemptions: number;

      /**
       * Si el cupón se creó con fecha de expiración aquí va la fecha en formato yyyy-mm-dd hh:mm:ss
       */
      expires: string;

      /**
       * El estado del cupón, Activo = 1, Inactivo = 0
       */
      status: number;

      /**
       * El número de veces que se ha aplicado este cupón
       */
      redemptions: number;
    };
  };

  /**
   * Lista de los importes efectuados a la suscripción
   */
  invoices: Array<{
    /**
     * Identificador del importe
     */
    id: number;

    /**
     * Identificador de la suscripción
     */
    subscriptionId: string;

    /**
     * Identificador del cliente
     */
    customerId: string;

    /**
     * Fecha de creación del importe en formato yyyy-mm-dd hh:mm:ss
     */
    created: string;

    /**
     * Descripción del importe
     */
    subject: string;

    /**
     * Moneda del importe
     */
    currency: string;

    /**
     * Monto del importe
     */
    amount: number;

    /**
     * Fecha de inicio del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_start: string;

    /**
     * Fecha de término del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_end: string;

    /**
     * Número de intentos de cobro del importe
     */
    attemp_count: number;

    /**
     * Si este importe se cobrará:
     * 1 Se cobrará
     * 0 No se cobrará
     */
    attemped: number;

    /**
     * Fecha del siguiente intento de cobro en formato yyyy-mm-dd hh:mm:ss
     */
    next_attemp_date: string;

    /**
     * Fecha en que este importe será considerado moroso en formato yyyy-mm-dd hh:mm:ss
     */
    due_date: string;

    /**
     * Estado del importe:
     * 0 impago
     * 1 pagado
     * 2 anulado
     */
    status: number;

    /**
     * Si se produjo un error al intentar cobrar el invoice:
     * 0 Sin error
     * 1 Con error
     */
    error: number;

    /**
     * Fecha en que se produjo el error o null si no hay error en formato yyyy-mm-dd hh:mm:ss
     */
    errorDate: string | null;

    /**
     * Descripción de error o null si no hay error
     */
    errorDescription: string | null;

    /**
     * Items del invoice
     */
    items: Array<{
      /**
       * Identificador del InvoiceItem
       */
      id: number;
      /**
       * Descripción del InvoiceItem
       */
      subject: string;
      /**
       * 	Tipo de item
       * 1 Cargo por plan
       * 2 Descuento
       * 3 Item pendiente
       * 9 Otros
       */
      type: 1 | 2 | 3 | 9;
    }>;

    /**
     * Objeto que representa un cobro y si está pagado su correspondiente pago
     */
    payment: {
      /**
       * El número de la orden de Flow
       */
      flowOrder: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La fecha de creación de la orden en formato yyyy-mm-dd hh:mm:ss
       */
      requestDate: string;

      /**
       * El estado de la orden:
       * 1 pendiente de pago
       * 2 pagada
       * 3 rechazada
       * 4 anulada
       */
      status: 1 | 2 | 3 | 4;

      /**
       * El concepto de la orden
       */
      subject: string;

      /**
       * La moneda
       */
      currency: string;

      /**
       * El monto de la orden
       */
      amount: number;

      /**
       * El email del pagador
       */
      payer: string;

      /**
       * Datos opcionales enviados por el comercio en el request de creación de pago en el parámetro optional en formato JSON
       */
      optional?: string | null;

      /**
       * Información para un pago pendiente cuando se generó un cupón de pago. Si no existen datos es que no se generó un cupón de pago.
       */
      pending_info?: {
        /**
         * El medio de pago utilizado para emitir el cupón de pago
         */
        media?: string | null;

        /**
         * La fecha de emisión del cupón de pago
         */
        date?: string | null;
      };

      /**
       * Los datos del pago
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
       * Id de comercio asociado. Solo aplica si usted es comercio integrador.
       */
      merchantId?: string | null;
    } | null;

    /**
     * Objeto que muestra los datos de un pago por fuera
     */
    outsidePayment: {
      /**
       * Fecha del pago por fuera
       */
      date: string;
      /**
       * descripción del pago por fuera
       */
      comment: string;
    } | null;
    /**
     * Link de pago. Cuando el invoice no está pagado
     */
    paymentLink: string;

    /**
     * Intentos de cargo fallidos
     */
    /**
     * Intentos de cargo fallidos
     */
    chargeAttemps: Array<{
      /**
       * Identificador del intento
       */
      id: number;

      /**
       * Fecha del intento en formato yyyy-mm-dd hh:mm:ss
       */
      date: string;

      /**
       * Identificador del Customer
       */
      customerId: string;

      /**
       * Identificador del Invoice, si el intento no corresponde a un Invoice este vendrá vacío.
       */
      invoiceId: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La moneda del intento de cargo
       */
      currency: string;

      /**
       * El monto a cobrar especificado con 4 decimales
       */
      amount: number;

      /**
       * El código del error que se produjo en el intento de cargo
       */
      errorCode: number;

      /**
       * La descripción del error producido en el intento de cargo
       */
      errorDescription: string;
    }>;
  }>;
};

type FlowGetSubscriptionBySubscriptionIdResponse = {
  /**
   * Identificador de la suscripción
   */
  subscriptionId: string;

  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  plan_name: string;

  /**
   * Identificador del cliente
   */
  customerId: string;

  /**
   * Fecha de creación de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Fecha de inicio de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  subscription_start: string;

  /**
   * Fecha de término de la suscripción en formato yyyy-mm-dd hh:mm:ss, si la suscripción no tiene término mostrará valor null.
   */
  subscription_end: string | null;

  /**
   * Fecha de inicio del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_start: string;

  /**
   * Fecha de término del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_end: string;

  /**
   * Fecha del siguiente cobro en formato yyyy-mm-dd hh:mm:ss
   */
  next_invoice_date: string;

  /**
   * Número de días de Trial
   */
  trial_period_days: number;

  /**
   * Fecha de inicio del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_start: string;

  /**
   * Fecha de término del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_end: string;

  /**
   * Si la suscripción será cancelada automáticamente al finalizar el período actual:
   * 0 No
   * 1 Si
   */
  cancel_at_period_end: number;

  /**
   * Fecha de cancelación de la suscripción
   */
  cancel_at: string;

  /**
   * Número de períodos de vigencia de la suscripción
   */
  periods_number: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Estado de la suscripción:
   * 0 Inactivo (no iniciada)
   * 1 Activa
   * 2 En período de trial
   * 4 Cancelada
   */
  status: number;

  /**
   * Monto de balance a favor en la suscripción
   */
  discount_balance: string;

  /**
   * Id del nuevo plan programado a cambiarse
   */
  newPlanId: number;

  /**
   * Fecha de cambio de plan programado
   */
  new_plan_scheduled_change_date: string;

  /**
   * Fecha de próximo intento de cambio de plan
   */
  in_new_plan_next_attempt_date: string;

  /**
   * Si la suscripción está morosa:
   * 0 si todos los invoices están pagados.
   * 1 si uno o más invoices están vencidos.
   * 2 si uno o más invoices están pendientes de pago, pero no vencidos.
   */
  morose: number;

  /**
   * Descuento aplicado a una Suscripción
   */
  discount: {
    /**
     * Identificador del descuento
     */
    id: number;

    /**
     * Tipo de descuento puede ser de 2 tipos:
     * Subscription discount
     * Customer discount
     */
    type: string;

    /**
     * Fecha de creación del descuento
     */
    created: string;

    /**
     * Fecha de inicio del descuento
     */
    start: string;

    /**
     * Fecha de término del descuento
     */
    end: string;

    /**
     * Fecha en que se eliminó el descuento o null si está vigente
     */
    deleted: string | null;

    /**
     * Estado del descuento:
     * 1 Activo
     * 0 Inactivo
     */
    status: number;

    /**
     * Cupón asociado al descuento
     */
    coupon: {
      /**
       * El identificador del cupón
       */
      id: number;

      /**
       * El nombre del cupón
       */
      name: string;

      /**
       * Si el cupón es del tipo porcentaje, en este campo indica el porcentaje de descuento, sino, muestra vacío.
       */
      percent_off: number | null;

      /**
       * Si el cupón es del tipo monto, aquí va la moneda, sino, muestra vacío
       */
      currency: string | null;

      /**
       * Si el cupón es del tipo monto, aquí va el monto de descuento, sino, muestra vacío
       */
      amount: number | null;

      /**
       * La fecha de creación del cupón
       */
      created: string;

      /**
       * Si el cupón es de duración indefinida = 0, o es de duración definida = 1
       */
      duration: number;

      /**
       * Si el cupón es de duración definida, en este campo va el número de veces de duración. Si el cupón es aplicado a un cliente, el número de duración equivale a meses, si el cupón es aplicado a una suscripción, el número de duración será los períodos del plan de suscripción
       */
      times: number;

      /**
       * Es el número de veces que puede ser aplicado este cupón, ya sea a clientes o a suscripciones. Una vez que se completa el número de veces, ya no queda disponible para ser aplicado.
       */
      max_redemptions: number;

      /**
       * Si el cupón se creó con fecha de expiración aquí va la fecha en formato yyyy-mm-dd hh:mm:ss
       */
      expires: string;

      /**
       * El estado del cupón, Activo = 1, Inactivo = 0
       */
      status: number;

      /**
       * El número de veces que se ha aplicado este cupón
       */
      redemptions: number;
    };
  };

  /**
   * Lista de los importes efectuados a la suscripción
   */
  invoices: Array<{
    /**
     * Identificador del importe
     */
    id: number;

    /**
     * Identificador de la suscripción
     */
    subscriptionId: string;

    /**
     * Identificador del cliente
     */
    customerId: string;

    /**
     * Fecha de creación del importe en formato yyyy-mm-dd hh:mm:ss
     */
    created: string;

    /**
     * Descripción del importe
     */
    subject: string;

    /**
     * Moneda del importe
     */
    currency: string;

    /**
     * Monto del importe
     */
    amount: number;

    /**
     * Fecha de inicio del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_start: string;

    /**
     * Fecha de término del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_end: string;

    /**
     * Número de intentos de cobro del importe
     */
    attemp_count: number;

    /**
     * Si este importe se cobrará:
     * 1 Se cobrará
     * 0 No se cobrará
     */
    attemped: number;

    /**
     * Fecha del siguiente intento de cobro en formato yyyy-mm-dd hh:mm:ss
     */
    next_attemp_date: string;

    /**
     * Fecha en que este importe será considerado moroso en formato yyyy-mm-dd hh:mm:ss
     */
    due_date: string;

    /**
     * Estado del importe:
     * 0 impago
     * 1 pagado
     * 2 anulado
     */
    status: number;

    /**
     * Si se produjo un error al intentar cobrar el invoice:
     * 0 Sin error
     * 1 Con error
     */
    error: number;

    /**
     * Fecha en que se produjo el error o null si no hay error en formato yyyy-mm-dd hh:mm:ss
     */
    errorDate: string | null;

    /**
     * Descripción de error o null si no hay error
     */
    errorDescription: string | null;

    /**
     * Items del invoice
     */
    items: Array<{
      /**
       * Identificador del InvoiceItem
       */
      id: number;
      /**
       * Descripción del InvoiceItem
       */
      subject: string;
      /**
       * 	Tipo de item
       * 1 Cargo por plan
       * 2 Descuento
       * 3 Item pendiente
       * 9 Otros
       */
      type: 1 | 2 | 3 | 9;
    }>;

    /**
     * Objeto que representa un cobro y si está pagado su correspondiente pago
     */
    payment: {
      /**
       * El número de la orden de Flow
       */
      flowOrder: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La fecha de creación de la orden en formato yyyy-mm-dd hh:mm:ss
       */
      requestDate: string;

      /**
       * El estado de la orden:
       * 1 pendiente de pago
       * 2 pagada
       * 3 rechazada
       * 4 anulada
       */
      status: 1 | 2 | 3 | 4;

      /**
       * El concepto de la orden
       */
      subject: string;

      /**
       * La moneda
       */
      currency: string;

      /**
       * El monto de la orden
       */
      amount: number;

      /**
       * El email del pagador
       */
      payer: string;

      /**
       * Datos opcionales enviados por el comercio en el request de creación de pago en el parámetro optional en formato JSON
       */
      optional?: string | null;

      /**
       * Información para un pago pendiente cuando se generó un cupón de pago. Si no existen datos es que no se generó un cupón de pago.
       */
      pending_info?: {
        /**
         * El medio de pago utilizado para emitir el cupón de pago
         */
        media?: string | null;

        /**
         * La fecha de emisión del cupón de pago
         */
        date?: string | null;
      };

      /**
       * Los datos del pago
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
       * Id de comercio asociado. Solo aplica si usted es comercio integrador.
       */
      merchantId?: string | null;
    } | null;

    /**
     * Objeto que muestra los datos de un pago por fuera
     */
    outsidePayment: {
      /**
       * Fecha del pago por fuera
       */
      date: string;
      /**
       * descripción del pago por fuera
       */
      comment: string;
    } | null;

    /**
     * Link de pago. Cuando el invoice no está pagado
     */
    paymentLink: string;

    /**
     * Intentos de cargo fallidos
     */
    chargeAttemps: Array<{
      /**
       * Identificador del intento
       */
      id: number;

      /**
       * Fecha del intento en formato yyyy-mm-dd hh:mm:ss
       */
      date: string;

      /**
       * Identificador del Customer
       */
      customerId: string;

      /**
       * Identificador del Invoice, si el intento no corresponde a un Invoice este vendrá vacío.
       */
      invoiceId: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La moneda del intento de cargo
       */
      currency: string;

      /**
       * El monto a cobrar especificado con 4 decimales
       */
      amount: number;

      /**
       * El código del error que se produjo en el intento de cargo
       */
      errorCode: number;

      /**
       * La descripción del error producido en el intento de cargo
       */
      errorDescription: string;
    }>;
  }>;
};

type FlowGetPlanSubscriptionsRequest = {
  planId: string;
  /**
   *   número de registro de inicio de la página. Si se omite el valor por omisión es 0.
   */
  start?: number;
  /**
   * Número de registros por página. Si se omite el valor por omisón es 10. El valor máximo es de 100 registros por página.
   */
  limit?: number;
  /**
   * filtro por el nombre del cliente
   */
  filter: string;
  /**
   * Filtro por el estado de la suscripción
   */
  status: number;
};
type FlowGetPlanSubscriptionsResponse = {
  /**
   * El número total de registros encontrados.
   */
  total: number;

  /**
   * Indica si existen más páginas de resultados.
   * `true` si hay más páginas disponibles, `false` si es la última página.
   */
  hasMore: 0 | 1;

  /**
   * Arreglo de registros de la página actual.
   */
  data: string;
};
/**
 *
 */
type FlowUpdateSubscriptionTrialDays = {
  /**
   * Identificador de la suscripción
   */
  subscriptionId: string;

  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  plan_name: string;

  /**
   * Identificador del cliente
   */
  customerId: string;

  /**
   * Fecha de creación de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Fecha de inicio de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  subscription_start: string;

  /**
   * Fecha de término de la suscripción en formato yyyy-mm-dd hh:mm:ss, si la suscripción no tiene término mostrará valor null.
   */
  subscription_end: string | null;

  /**
   * Fecha de inicio del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_start: string;

  /**
   * Fecha de término del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_end: string;

  /**
   * Fecha del siguiente cobro en formato yyyy-mm-dd hh:mm:ss
   */
  next_invoice_date: string;

  /**
   * Número de días de Trial
   */
  trial_period_days: number;

  /**
   * Fecha de inicio del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_start: string;

  /**
   * Fecha de término del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_end: string;

  /**
   * Si la suscripción será cancelada automáticamente al finalizar el período actual:
   * 0 No
   * 1 Si
   */
  cancel_at_period_end: number;

  /**
   * Fecha de cancelación de la suscripción
   */
  cancel_at: string;

  /**
   * Número de períodos de vigencia de la suscripción
   */
  periods_number: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Estado de la suscripción:
   * 0 Inactivo (no iniciada)
   * 1 Activa
   * 2 En período de trial
   * 4 Cancelada
   */
  status: number;

  /**
   * Monto de balance a favor en la suscripción
   */
  discount_balance: string;

  /**
   * Id del nuevo plan programado a cambiarse
   */
  newPlanId: number;

  /**
   * Fecha de cambio de plan programado
   */
  new_plan_scheduled_change_date: string;

  /**
   * Fecha de próximo intento de cambio de plan
   */
  in_new_plan_next_attempt_date: string;

  /**
   * Si la suscripción está morosa:
   * 0 si todos los invoices están pagados.
   * 1 si uno o más invoices están vencidos.
   * 2 si uno o más invoices están pendientes de pago, pero no vencidos.
   */
  morose: number;

  /**
   * Descuento aplicado a una Suscripción
   */
  discount: {
    /**
     * Identificador del descuento
     */
    id: number;

    /**
     * Tipo de descuento puede ser de 2 tipos:
     * Subscription discount
     * Customer discount
     */
    type: string;

    /**
     * Fecha de creación del descuento
     */
    created: string;

    /**
     * Fecha de inicio del descuento
     */
    start: string;

    /**
     * Fecha de término del descuento
     */
    end: string;

    /**
     * Fecha en que se eliminó el descuento o null si está vigente
     */
    deleted: string | null;

    /**
     * Estado del descuento:
     * 1 Activo
     * 0 Inactivo
     */
    status: number;

    /**
     * Cupón asociado al descuento
     */
    coupon: {
      /**
       * El identificador del cupón
       */
      id: number;

      /**
       * El nombre del cupón
       */
      name: string;

      /**
       * Si el cupón es del tipo porcentaje, en este campo indica el porcentaje de descuento, sino, muestra vacío.
       */
      percent_off: number | null;

      /**
       * Si el cupón es del tipo monto, aquí va la moneda, sino, muestra vacío
       */
      currency: string | null;

      /**
       * Si el cupón es del tipo monto, aquí va el monto de descuento, sino, muestra vacío
       */
      amount: number | null;

      /**
       * La fecha de creación del cupón
       */
      created: string;

      /**
       * Si el cupón es de duración indefinida = 0, o es de duración definida = 1
       */
      duration: number;

      /**
       * Si el cupón es de duración definida, en este campo va el número de veces de duración. Si el cupón es aplicado a un cliente, el número de duración equivale a meses, si el cupón es aplicado a una suscripción, el número de duración será los períodos del plan de suscripción
       */
      times: number;

      /**
       * Es el número de veces que puede ser aplicado este cupón, ya sea a clientes o a suscripciones. Una vez que se completa el número de veces, ya no queda disponible para ser aplicado.
       */
      max_redemptions: number;

      /**
       * Si el cupón se creó con fecha de expiración aquí va la fecha en formato yyyy-mm-dd hh:mm:ss
       */
      expires: string;

      /**
       * El estado del cupón, Activo = 1, Inactivo = 0
       */
      status: number;

      /**
       * El número de veces que se ha aplicado este cupón
       */
      redemptions: number;
    };
  };

  /**
   * Lista de los importes efectuados a la suscripción
   */
  invoices: Array<{
    /**
     * Identificador del importe
     */
    id: number;

    /**
     * Identificador de la suscripción
     */
    subscriptionId: string;

    /**
     * Identificador del cliente
     */
    customerId: string;

    /**
     * Fecha de creación del importe en formato yyyy-mm-dd hh:mm:ss
     */
    created: string;

    /**
     * Descripción del importe
     */
    subject: string;

    /**
     * Moneda del importe
     */
    currency: string;

    /**
     * Monto del importe
     */
    amount: number;

    /**
     * Fecha de inicio del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_start: string;

    /**
     * Fecha de término del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_end: string;

    /**
     * Número de intentos de cobro del importe
     */
    attemp_count: number;

    /**
     * Si este importe se cobrará:
     * 1 Se cobrará
     * 0 No se cobrará
     */
    attemped: number;

    /**
     * Fecha del siguiente intento de cobro en formato yyyy-mm-dd hh:mm:ss
     */
    next_attemp_date: string;

    /**
     * Fecha en que este importe será considerado moroso en formato yyyy-mm-dd hh:mm:ss
     */
    due_date: string;

    /**
     * Estado del importe:
     * 0 impago
     * 1 pagado
     * 2 anulado
     */
    status: number;

    /**
     * Si se produjo un error al intentar cobrar el invoice:
     * 0 Sin error
     * 1 Con error
     */
    error: number;

    /**
     * Fecha en que se produjo el error o null si no hay error en formato yyyy-mm-dd hh:mm:ss
     */
    errorDate: string | null;

    /**
     * Descripción de error o null si no hay error
     */
    errorDescription: string | null;

    /**
     * Items del invoice
     */
    items: Array<{
      /**
       * Identificador del InvoiceItem
       */
      id: number;

      /**
       * Descripción del InvoiceItem
       */
      subject: string;

      /**
       * Tipo de item:
       * 1 Cargo por plan
       * 2 Descuento
       * 3 Item pendiente
       * 9 Otros
       */
      type: 1 | 2 | 3 | 9;

      /**
       * Moneda del item
       */
      currency: string;

      /**
       * Monto del item
       */
      amount: number;
    }>;

    /**
     * Objeto que representa un cobro y si está pagado su correspondiente pago
     */
    payment: {
      /**
       * El número de la orden de Flow
       */
      flowOrder: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La fecha de creación de la orden en formato yyyy-mm-dd hh:mm:ss
       */
      requestDate: string;

      /**
       * El estado de la orden:
       * 1 pendiente de pago
       * 2 pagada
       * 3 rechazada
       * 4 anulada
       */
      status: 1 | 2 | 3 | 4;

      /**
       * El concepto de la orden
       */
      subject: string;

      /**
       * La moneda
       */
      currency: string;

      /**
       * El monto de la orden
       */
      amount: number;

      /**
       * El email del pagador
       */
      payer: string;

      /**
       * Datos opcionales enviados por el comercio en el request de creación de pago en el parámetro optional en formato JSON
       */
      optional?: string | null;

      /**
       * Información para un pago pendiente cuando se generó un cupón de pago. Si no existen datos es que no se generó un cupón de pago.
       */
      pending_info?: {
        /**
         * El medio de pago utilizado para emitir el cupón de pago
         */
        media?: string | null;

        /**
         * La fecha de emisión del cupón de pago
         */
        date?: string | null;
      };

      /**
       * Los datos del pago
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
       * Id de comercio asociado. Solo aplica si usted es comercio integrador.
       */
      merchantId?: string | null;
    } | null;

    /**
     * Objeto que muestra los datos de un pago por fuera
     */
    outsidePayment: {
      /**
       * Fecha del pago por fuera
       */
      date: string;

      /**
       * Descripción del pago por fuera
       */
      comment: string;
    } | null;

    /**
     * Link de pago. Cuando el invoice no está pagado
     */
    paymentLink: string;

    /**
     * Intentos de cargo fallidos
     */
    chargeAttemps: Array<{
      /**
       * Identificador del intento
       */
      id: number;

      /**
       * Fecha del intento en formato yyyy-mm-dd hh:mm:ss
       */
      date: string;

      /**
       * Identificador del Customer
       */
      customerId: string;

      /**
       * Identificador del Invoice, si el intento no corresponde a un Invoice este vendrá vacío.
       */
      invoiceId: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La moneda del intento de cargo
       */
      currency: string;

      /**
       * El monto a cobrar especificado con 4 decimales
       */
      amount: number;

      /**
       * El código del error que se produjo en el intento de cargo
       */
      errorCode: number;

      /**
       * La descripción del error producido en el intento de cargo
       */
      errorDescription: string;
    }>;
  }>;
};

type FlowCancelSubscriptionResponse = {
  /**
   * Identificador de la suscripción
   */
  subscriptionId: string;

  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  plan_name: string;

  /**
   * Identificador del cliente
   */
  customerId: string;

  /**
   * Fecha de creación de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Fecha de inicio de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  subscription_start: string;

  /**
   * Fecha de término de la suscripción en formato yyyy-mm-dd hh:mm:ss, si la suscripción no tiene término mostrará valor null.
   */
  subscription_end: string | null;

  /**
   * Fecha de inicio del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_start: string;

  /**
   * Fecha de término del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_end: string;

  /**
   * Fecha del siguiente cobro en formato yyyy-mm-dd hh:mm:ss
   */
  next_invoice_date: string;

  /**
   * Número de días de Trial
   */
  trial_period_days: number;

  /**
   * Fecha de inicio del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_start: string;

  /**
   * Fecha de término del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_end: string;

  /**
   * Si la suscripción será cancelada automáticamente al finalizar el período actual:
   * 0 No
   * 1 Si
   */
  cancel_at_period_end: number;

  /**
   * Fecha de cancelación de la suscripción
   */
  cancel_at: string;

  /**
   * Número de períodos de vigencia de la suscripción
   */
  periods_number: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Estado de la suscripción:
   * 0 Inactivo (no iniciada)
   * 1 Activa
   * 2 En período de trial
   * 4 Cancelada
   */
  status: number;

  /**
   * Monto de balance a favor en la suscripción
   */
  discount_balance: string;

  /**
   * Id del nuevo plan programado a cambiarse
   */
  newPlanId: number;

  /**
   * Fecha de cambio de plan programado
   */
  new_plan_scheduled_change_date: string;

  /**
   * Fecha de próximo intento de cambio de plan
   */
  in_new_plan_next_attempt_date: string;

  /**
   * Si la suscripción está morosa:
   * 0 si todos los invoices están pagados.
   * 1 si uno o más invoices están vencidos.
   * 2 si uno o más invoices están pendientes de pago, pero no vencidos.
   */
  morose: number;

  /**
   * Descuento aplicado a una Suscripción
   */
  discount: {
    /**
     * Identificador del descuento
     */
    id: number;

    /**
     * Tipo de descuento puede ser de 2 tipos:
     * Subscription discount
     * Customer discount
     */
    type: string;

    /**
     * Fecha de creación del descuento
     */
    created: string;

    /**
     * Fecha de inicio del descuento
     */
    start: string;

    /**
     * Fecha de término del descuento
     */
    end: string;

    /**
     * Fecha en que se eliminó el descuento o null si está vigente
     */
    deleted: string | null;

    /**
     * Estado del descuento:
     * 1 Activo
     * 0 Inactivo
     */
    status: number;

    /**
     * Cupón asociado al descuento
     */
    coupon: {
      /**
       * El identificador del cupón
       */
      id: number;

      /**
       * El nombre del cupón
       */
      name: string;

      /**
       * Si el cupón es del tipo porcentaje, en este campo indica el porcentaje de descuento, sino, muestra vacío.
       */
      percent_off: number | null;

      /**
       * Si el cupón es del tipo monto, aquí va la moneda, sino, muestra vacío
       */
      currency: string | null;

      /**
       * Si el cupón es del tipo monto, aquí va el monto de descuento, sino, muestra vacío
       */
      amount: number | null;

      /**
       * La fecha de creación del cupón
       */
      created: string;

      /**
       * Si el cupón es de duración indefinida = 0, o es de duración definida = 1
       */
      duration: number;

      /**
       * Si el cupón es de duración definida, en este campo va el número de veces de duración. Si el cupón es aplicado a un cliente, el número de duración equivale a meses, si el cupón es aplicado a una suscripción, el número de duración será los períodos del plan de suscripción
       */
      times: number;

      /**
       * Es el número de veces que puede ser aplicado este cupón, ya sea a clientes o a suscripciones. Una vez que se completa el número de veces, ya no queda disponible para ser aplicado.
       */
      max_redemptions: number;

      /**
       * Si el cupón se creó con fecha de expiración aquí va la fecha en formato yyyy-mm-dd hh:mm:ss
       */
      expires: string;

      /**
       * El estado del cupón, Activo = 1, Inactivo = 0
       */
      status: number;

      /**
       * El número de veces que se ha aplicado este cupón
       */
      redemptions: number;
    };
  };

  /**
   * Lista de los importes efectuados a la suscripción
   */
  invoices: Array<{
    /**
     * Identificador del importe
     */
    id: number;

    /**
     * Identificador de la suscripción
     */
    subscriptionId: string;

    /**
     * Identificador del cliente
     */
    customerId: string;

    /**
     * Fecha de creación del importe en formato yyyy-mm-dd hh:mm:ss
     */
    created: string;

    /**
     * Descripción del importe
     */
    subject: string;

    /**
     * Moneda del importe
     */
    currency: string;

    /**
     * Monto del importe
     */
    amount: number;

    /**
     * Fecha de inicio del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_start: string;

    /**
     * Fecha de término del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_end: string;

    /**
     * Número de intentos de cobro del importe
     */
    attemp_count: number;

    /**
     * Si este importe se cobrará:
     * 1 Se cobrará
     * 0 No se cobrará
     */
    attemped: number;

    /**
     * Fecha del siguiente intento de cobro en formato yyyy-mm-dd hh:mm:ss
     */
    next_attemp_date: string;

    /**
     * Fecha en que este importe será considerado moroso en formato yyyy-mm-dd hh:mm:ss
     */
    due_date: string;

    /**
     * Estado del importe:
     * 0 impago
     * 1 pagado
     * 2 anulado
     */
    status: number;

    /**
     * Si se produjo un error al intentar cobrar el invoice:
     * 0 Sin error
     * 1 Con error
     */
    error: number;

    /**
     * Fecha en que se produjo el error o null si no hay error en formato yyyy-mm-dd hh:mm:ss
     */
    errorDate: string | null;

    /**
     * Descripción de error o null si no hay error
     */
    errorDescription: string | null;

    /**
     * Items del invoice
     */
    items: Array<{
      /**
       * Identificador del InvoiceItem
       */
      id: number;

      /**
       * Descripción del InvoiceItem
       */
      subject: string;

      /**
       * Tipo de item:
       * 1 Cargo por plan
       * 2 Descuento
       * 3 Item pendiente
       * 9 Otros
       */
      type: 1 | 2 | 3 | 9;

      /**
       * Moneda del item
       */
      currency: string;

      /**
       * Monto del item
       */
      amount: number;
    }>;

    /**
     * Objeto que representa un cobro y si está pagado su correspondiente pago
     */
    payment: {
      /**
       * El número de la orden de Flow
       */
      flowOrder: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La fecha de creación de la orden en formato yyyy-mm-dd hh:mm:ss
       */
      requestDate: string;

      /**
       * El estado de la orden:
       * 1 pendiente de pago
       * 2 pagada
       * 3 rechazada
       * 4 anulada
       */
      status: 1 | 2 | 3 | 4;

      /**
       * El concepto de la orden
       */
      subject: string;

      /**
       * La moneda
       */
      currency: string;

      /**
       * El monto de la orden
       */
      amount: number;

      /**
       * El email del pagador
       */
      payer: string;

      /**
       * Datos opcionales enviados por el comercio en el request de creación de pago en el parámetro optional en formato JSON
       */
      optional?: string | null;

      /**
       * Información para un pago pendiente cuando se generó un cupón de pago. Si no existen datos es que no se generó un cupón de pago.
       */
      pending_info?: {
        /**
         * El medio de pago utilizado para emitir el cupón de pago
         */
        media?: string | null;

        /**
         * La fecha de emisión del cupón de pago
         */
        date?: string | null;
      };

      /**
       * Los datos del pago
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
       * Id de comercio asociado. Solo aplica si usted es comercio integrador.
       */
      merchantId?: string | null;
    } | null;

    /**
     * Objeto que muestra los datos de un pago por fuera
     */
    outsidePayment: {
      /**
       * Fecha del pago por fuera
       */
      date: string;

      /**
       * Descripción del pago por fuera
       */
      comment: string;
    } | null;

    /**
     * Link de pago. Cuando el invoice no está pagado
     */
    paymentLink: string;

    /**
     * Intentos de cargo fallidos
     */
    chargeAttemps: Array<{
      /**
       * Identificador del intento
       */
      id: number;

      /**
       * Fecha del intento en formato yyyy-mm-dd hh:mm:ss
       */
      date: string;

      /**
       * Identificador del Customer
       */
      customerId: string;

      /**
       * Identificador del Invoice, si el intento no corresponde a un Invoice este vendrá vacío.
       */
      invoiceId: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La moneda del intento de cargo
       */
      currency: string;

      /**
       * El monto a cobrar especificado con 4 decimales
       */
      amount: number;

      /**
       * El código del error que se produjo en el intento de cargo
       */
      errorCode: number;

      /**
       * La descripción del error producido en el intento de cargo
       */
      errorDescription: string;
    }>;
  }>;
};

type FlowAddDiscountToSubscriptionResponse = {
  /**
   * Identificador de la suscripción
   */
  subscriptionId: string;

  /**
   * Identificador del plan
   */
  planId: string;

  /**
   * Nombre del plan
   */
  plan_name: string;

  /**
   * Identificador del cliente
   */
  customerId: string;

  /**
   * Fecha de creación de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  created: string;

  /**
   * Fecha de inicio de la suscripción en formato yyyy-mm-dd hh:mm:ss
   */
  subscription_start: string;

  /**
   * Fecha de término de la suscripción en formato yyyy-mm-dd hh:mm:ss, si la suscripción no tiene término mostrará valor null.
   */
  subscription_end: string | null;

  /**
   * Fecha de inicio del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_start: string;

  /**
   * Fecha de término del período actual en formato yyyy-mm-dd hh:mm:ss
   */
  period_end: string;

  /**
   * Fecha del siguiente cobro en formato yyyy-mm-dd hh:mm:ss
   */
  next_invoice_date: string;

  /**
   * Número de días de Trial
   */
  trial_period_days: number;

  /**
   * Fecha de inicio del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_start: string;

  /**
   * Fecha de término del trial en formato yyyy-mm-dd hh:mm:ss
   */
  trial_end: string;

  /**
   * Si la suscripción será cancelada automáticamente al finalizar el período actual:
   * 0 No
   * 1 Si
   */
  cancel_at_period_end: number;

  /**
   * Fecha de cancelación de la suscripción
   */
  cancel_at: string;

  /**
   * Número de períodos de vigencia de la suscripción
   */
  periods_number: number;

  /**
   * Número de días pasados, después de generar un importe, para considerarlo vencido.
   */
  days_until_due: number;

  /**
   * Estado de la suscripción:
   * 0 Inactivo (no iniciada)
   * 1 Activa
   * 2 En período de trial
   * 4 Cancelada
   */
  status: number;

  /**
   * Monto de balance a favor en la suscripción
   */
  discount_balance: string;

  /**
   * Id del nuevo plan programado a cambiarse
   */
  newPlanId: number;

  /**
   * Fecha de cambio de plan programado
   */
  new_plan_scheduled_change_date: string;

  /**
   * Fecha de próximo intento de cambio de plan
   */
  in_new_plan_next_attempt_date: string;

  /**
   * Si la suscripción está morosa:
   * 0 si todos los invoices están pagados.
   * 1 si uno o más invoices están vencidos.
   * 2 si uno o más invoices están pendientes de pago, pero no vencidos.
   */
  morose: number;

  /**
   * Descuento aplicado a una Suscripción
   */
  discount: {
    /**
     * Identificador del descuento
     */
    id: number;

    /**
     * Tipo de descuento puede ser de 2 tipos:
     * Subscription discount
     * Customer discount
     */
    type: string;

    /**
     * Fecha de creación del descuento
     */
    created: string;

    /**
     * Fecha de inicio del descuento
     */
    start: string;

    /**
     * Fecha de término del descuento
     */
    end: string;

    /**
     * Fecha en que se eliminó el descuento o null si está vigente
     */
    deleted: string | null;

    /**
     * Estado del descuento:
     * 1 Activo
     * 0 Inactivo
     */
    status: number;

    /**
     * Cupón asociado al descuento
     */
    coupon: {
      /**
       * El identificador del cupón
       */
      id: number;

      /**
       * El nombre del cupón
       */
      name: string;

      /**
       * Si el cupón es del tipo porcentaje, en este campo indica el porcentaje de descuento, sino, muestra vacío.
       */
      percent_off: number | null;

      /**
       * Si el cupón es del tipo monto, aquí va la moneda, sino, muestra vacío
       */
      currency: string | null;

      /**
       * Si el cupón es del tipo monto, aquí va el monto de descuento, sino, muestra vacío
       */
      amount: number | null;

      /**
       * La fecha de creación del cupón
       */
      created: string;

      /**
       * Si el cupón es de duración indefinida = 0, o es de duración definida = 1
       */
      duration: number;

      /**
       * Si el cupón es de duración definida, en este campo va el número de veces de duración. Si el cupón es aplicado a un cliente, el número de duración equivale a meses, si el cupón es aplicado a una suscripción, el número de duración será los períodos del plan de suscripción
       */
      times: number;

      /**
       * Es el número de veces que puede ser aplicado este cupón, ya sea a clientes o a suscripciones. Una vez que se completa el número de veces, ya no queda disponible para ser aplicado.
       */
      max_redemptions: number;

      /**
       * Si el cupón se creó con fecha de expiración aquí va la fecha en formato yyyy-mm-dd hh:mm:ss
       */
      expires: string;

      /**
       * El estado del cupón, Activo = 1, Inactivo = 0
       */
      status: number;

      /**
       * El número de veces que se ha aplicado este cupón
       */
      redemptions: number;
    };
  };

  /**
   * Lista de los importes efectuados a la suscripción
   */
  invoices: Array<{
    /**
     * Identificador del importe
     */
    id: number;

    /**
     * Identificador de la suscripción
     */
    subscriptionId: string;

    /**
     * Identificador del cliente
     */
    customerId: string;

    /**
     * Fecha de creación del importe en formato yyyy-mm-dd hh:mm:ss
     */
    created: string;

    /**
     * Descripción del importe
     */
    subject: string;

    /**
     * Moneda del importe
     */
    currency: string;

    /**
     * Monto del importe
     */
    amount: number;

    /**
     * Fecha de inicio del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_start: string;

    /**
     * Fecha de término del período del importe en formato yyyy-mm-dd hh:mm:ss
     */
    period_end: string;

    /**
     * Número de intentos de cobro del importe
     */
    attemp_count: number;

    /**
     * Si este importe se cobrará:
     * 1 Se cobrará
     * 0 No se cobrará
     */
    attemped: number;

    /**
     * Fecha del siguiente intento de cobro en formato yyyy-mm-dd hh:mm:ss
     */
    next_attemp_date: string;

    /**
     * Fecha en que este importe será considerado moroso en formato yyyy-mm-dd hh:mm:ss
     */
    due_date: string;

    /**
     * Estado del importe:
     * 0 impago
     * 1 pagado
     * 2 anulado
     */
    status: number;

    /**
     * Si se produjo un error al intentar cobrar el invoice:
     * 0 Sin error
     * 1 Con error
     */
    error: number;

    /**
     * Fecha en que se produjo el error o null si no hay error en formato yyyy-mm-dd hh:mm:ss
     */
    errorDate: string | null;

    /**
     * Descripción de error o null si no hay error
     */
    errorDescription: string | null;

    /**
     * Items del invoice
     */
    items: Array<{
      /**
       * Identificador del InvoiceItem
       */
      id: number;

      /**
       * Descripción del InvoiceItem
       */
      subject: string;

      /**
       * Tipo de item:
       * 1 Cargo por plan
       * 2 Descuento
       * 3 Item pendiente
       * 9 Otros
       */
      type: 1 | 2 | 3 | 9;

      /**
       * Moneda del item
       */
      currency: string;

      /**
       * Monto del item
       */
      amount: number;
    }>;

    /**
     * Objeto que representa un cobro y si está pagado su correspondiente pago
     */
    payment: {
      /**
       * El número de la orden de Flow
       */
      flowOrder: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La fecha de creación de la orden en formato yyyy-mm-dd hh:mm:ss
       */
      requestDate: string;

      /**
       * El estado de la orden:
       * 1 pendiente de pago
       * 2 pagada
       * 3 rechazada
       * 4 anulada
       */
      status: 1 | 2 | 3 | 4;

      /**
       * El concepto de la orden
       */
      subject: string;

      /**
       * La moneda
       */
      currency: string;

      /**
       * El monto de la orden
       */
      amount: number;

      /**
       * El email del pagador
       */
      payer: string;

      /**
       * Datos opcionales enviados por el comercio en el request de creación de pago en el parámetro optional en formato JSON
       */
      optional?: string | null;

      /**
       * Información para un pago pendiente cuando se generó un cupón de pago. Si no existen datos es que no se generó un cupón de pago.
       */
      pending_info?: {
        /**
         * El medio de pago utilizado para emitir el cupón de pago
         */
        media?: string | null;

        /**
         * La fecha de emisión del cupón de pago
         */
        date?: string | null;
      };

      /**
       * Los datos del pago
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
       * Id de comercio asociado. Solo aplica si usted es comercio integrador.
       */
      merchantId?: string | null;
    } | null;

    /**
     * Objeto que muestra los datos de un pago por fuera
     */
    outsidePayment: {
      /**
       * Fecha del pago por fuera
       */
      date: string;

      /**
       * Descripción del pago por fuera
       */
      comment: string;
    } | null;

    /**
     * Link de pago. Cuando el invoice no está pagado
     */
    paymentLink: string;

    /**
     * Intentos de cargo fallidos
     */
    chargeAttemps: Array<{
      /**
       * Identificador del intento
       */
      id: number;

      /**
       * Fecha del intento en formato yyyy-mm-dd hh:mm:ss
       */
      date: string;

      /**
       * Identificador del Customer
       */
      customerId: string;

      /**
       * Identificador del Invoice, si el intento no corresponde a un Invoice este vendrá vacío.
       */
      invoiceId: number;

      /**
       * El número de la orden del comercio
       */
      commerceOrder: string;

      /**
       * La moneda del intento de cargo
       */
      currency: string;

      /**
       * El monto a cobrar especificado con 4 decimales
       */
      amount: number;

      /**
       * El código del error que se produjo en el intento de cargo
       */
      errorCode: number;

      /**
       * La descripción del error producido en el intento de cargo
       */
      errorDescription: string;
    }>;
  }>;
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
  FlowEditCustomerRequest,
  FlowEditCustomerResponse,
  FlowDeleteCustomerResponse,
  FlowGetCustomerResponse,
  FlowGetCustomerListRequest,
  FlowGetCustomerListResponse,
  FlowRegisterCardRequest,
  FlowRegisterCardResponse,
  FlowRegisterCardStatusResponse,
  FlowDeleteCardResponse,
  FlowChargeCardRequest,
  FlowChargeCardResponse,
  FlowSendChargeRequest,
  FlowSendChargeResponse,
  FlowSendMassiveChargeCardRequest,
  FlowSendMassiveChargeCardResponse,
  FlowMassiveChargeCardStatusResponse,
  FlowReverseChargeCardRequest,
  FlowReverseChargeCardResponse,
  FlowListChargesRequest,
  FlowListChargesResponse,
  FlowListFailedChargesRequest,
  FlowListFailedChargesResponse,
  FlowListPaginatedSubscriptionsRequest,
  FlowListPaginatedSubscriptionsResponse,
  FlowCreatePlanRequest,
  FlowCreatePlanResponse,
  FlowGetPlanResponse,
  FlowEditPlanRequest,
  FlowEditPlanResponse,
  FlowDeletePlanResponse,
  FlowListPlansRequest,
  FlowListPlansResponse,
  FlowCreateSubscriptionToPlanRequest,
  FlowCreateSubscriptionToPlanResponse,
  FlowGetSubscriptionBySubscriptionIdResponse,
  FlowGetPlanSubscriptionsRequest,
  FlowGetPlanSubscriptionsResponse,
  FlowUpdateSubscriptionTrialDays,
  FlowCancelSubscriptionResponse,
  FlowAddDiscountToSubscriptionResponse,
};
