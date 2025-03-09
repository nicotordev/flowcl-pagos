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

type FlowSearchRequest = {
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
   * Filtro por nombre
   */
  filter?: string;

  /**
   * Filtro por estado
   */
  status?: number;
};

type FlowPaginatedData = {
  /**
   * El número total de registros encontrados
   */
  total: number;
  /**
   * boolean
   * 1 Si existen más páginas
   * 0 Si es la última página
   */
  hasMore: 0 | 1;
  /**
   * Array of object
   * arreglo de registros de la página
   * [{x list 1}{x list 2}{x list n..}
   */
  data: string;
};

export type {
  FlowPaymentMethods,
  FlowPaymentStatus,
  FlowConstants,
  FlowSearchRequest,
  FlowPaginatedData,
};
