// src/errors.ts

/**
 * Error base para todos los errores personalizados de FlowClient.
 */
export class FlowError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FlowError';
  }
}

/**
 * Error cuando las credenciales de API son inválidas o faltan.
 */
export class FlowAuthenticationError extends FlowError {
  constructor() {
    super('API Key y Secret Key son requeridos.');
    this.name = 'FlowAuthenticationError';
  }
}

/**
 * Error cuando una orden de pago no se puede crear.
 */
export class FlowOrderCreationError extends FlowError {
  constructor(message: string) {
    super(`Error al crear la orden de pago: ${message}`);
    this.name = 'FlowOrderCreationError';
  }
}

/**
 * Error cuando hay problemas al obtener el estado de un pago.
 */
export class FlowPaymentStatusError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener el estado del pago: ${message}`);
    this.name = 'FlowPaymentStatusError';
  }
}

/**
 * Error genérico para errores HTTP.
 */
export class FlowAPIError extends FlowError {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(`Error de API (${statusCode}): ${message}`);
    this.name = 'FlowAPIError';
    this.statusCode = statusCode;
  }
}

/**
 * Error cuando hay problemas al obtener los pagos recibidos por fecha.
 */
export class FlowPaymentsReceivedByDateError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener los pagos recibidos por fecha: ${message}`);
    this.name = 'PaymentsReceivedByDateError';
  }
}

/**
 * Error cuando hay problemas al obtener las transacciones recibidas por fecha.
 */
export class FlowTransactionsReceivedByDateError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener las transacciones recibidas por fecha: ${message}`);
    this.name = 'TransactionsReceivedByDateError';
  }
}

/**
 * Error cuando hay problemas al crear un pago.
 */
export class FlowCreatePaymentError extends FlowError {
  constructor(message: string) {
    super(`Error al crear el pago: ${message}`);
    this.name = 'FlowCreatePaymentError';
  }
}

/**
 * Error cuando hay problemas al obtener el estado extendido de un pago.
 */
export class FlowStatusExtendedError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener el estado extendido del pago: ${message}`);
    this.name = 'FlowStatusExtendedError';
  }
}
/**
 * Error cuando hay problemas al obtener el estado de un pago por email.
 */
export class FlowCreatePaymentByEmailError extends FlowError {
  constructor(message: string) {
    super(`Error al crear el pago por email: ${message}`);
    this.name = 'FlowCreatePaymentByEmailError';
  }
}
/**
 * Error cuando hay problemas al obtener el estado de un reembolso.
 */
export class FlowCreateRefundError extends FlowError {
  constructor(message: string) {
    super(`Error al crear el reembolso: ${message}`);
    this.name = 'FlowCreateRefundError';
  }
}
/**
 * Error cuando hay problemas al cancelar un reembolso.
 */
export class FlowCancelRefundError extends FlowError {
  constructor(message: string) {
    super(`Error al cancelar el reembolso: ${message}`);
    this.name = 'FlowCancelRefundError';
  }
}
/**
 * Error cuando hay problemas al obtener el estado de un reembolso.
 */
export class FlowRefundStatusError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener el estado del reembolso: ${message}`);
    this.name = 'FlowRefundStatusError';
  }
}
/**
 * Error cuando hay problemas al obtener el estado de un reembolso por email.
 */
export class FlowCreateCustomerError extends FlowError {
  constructor(message: string) {
    super(`Error al crear el cliente: ${message}`);
    this.name = 'FlowCreateCustomerError';
  }
}
/**
 * Error cuando hay problemas al editar un cliente.
 */
export class FlowEditCustomerError extends FlowError {
  constructor(message: string) {
    super(`Error al editar el cliente: ${message}`);
    this.name = 'FlowEditCustomerError';
  }
}

/**
 * Error cuando hay problemas al eliminar un cliente.
 */
export class FlowDeleteCustomerError extends FlowError {
  constructor(message: string) {
    super(`Error al eliminar el cliente: ${message}`);
    this.name = 'FlowDeleteCustomerError';
  }
}

/**
 * Error cuando hay problemas al obtener un cliente.
 */
export class FlowGetCustomerError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener el cliente: ${message}`);
    this.name = 'FlowGetCustomerError';
  }
}

/**
 * Error cuando hay problemas al obtener los clientes.
 */
export class FlowGetCustomerListError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener los clientes: ${message}`);
    this.name = 'FlowGetCustomersError';
  }
}

/**
 * Error cuando hay problemas al tratar de registrar la tarjeta de un cliente.
 */
export class FlowRegisterCardError extends FlowError {
  constructor(message: string) {
    super(`Error al registrar la tarjeta: ${message}`);
    this.name = 'FlowRegisterCardError';
  }
}

/**
 * Error cuando hay problemas al tratar de ver el estado de la tarjeta de un cliente.
 */
export class FlowRegisterCardStatusError extends FlowError {
  constructor(message: string) {
    super(`Error al ver el estado de la tarjeta: ${message}`);
    this.name = 'FlowRegisterCardStatusError';
  }
}
/**
 * Error cuando hay problemas al tratar de eliminar la tarjeta de un cliente.
 */
export class FlowDeleteCardError extends FlowError {
  constructor(message: string) {
    super(`Error al eliminar la tarjeta: ${message}`);
    this.name = 'FlowDeleteCardError';
  }
}
/**
 * Error cuando hay problemas al tratar de obtener la tarjeta de un cliente.
 */

export class FlowChargeCardError extends FlowError {
  constructor(message: string) {
    super(`Error al cargar la tarjeta: ${message}`);
    this.name = 'FlowChargeCardError';
  }
}

/**
 * Error cuando hay problemas al tratar de enviar cobro a un cliente.
 */

export class FlowSendChargeCardError extends FlowError {
  constructor(message: string) {
    super(`Error al enviar cobro a la tarjeta: ${message}`);
    this.name = 'FlowSendChargeCardError';
  }
}

/**
 * Error cuando hay problemas al tratar de enviar varios cobros a varios clientes.
 */
export class FlowSendMassiveChargeCardError extends FlowError {
  constructor(message: string) {
    super(`Error al enviar cobros masivos a tarjetas: ${message}`);
    this.name = 'FlowSendMassiveChargeCardError';
  }
}
/**
 * Error cuando hay problemas al tratar de ver el estado de varios cobros a varios
 */
export class FlowMassiveChargeCardStatusError extends FlowError {
  constructor(message: string) {
    super(`Error al ver el estado de cobros masivos a tarjetas: ${message}`);
    this.name = 'FlowMassiveChargeCardStatusError';
  }
}

/**
 *  Error cuando hay problemas al tratar de hacer reversa en un cargo efectuado en la tarjeta de un cliente
 */
export class FlowReverseChargeCardError extends FlowError {
  constructor(message: string) {
    super(`Error al hacer reversa de un cargo en la tarjeta: ${message}`);
    this.name = 'FlowReverseChargeCardError';
  }
}

/**
 * Error cuando hay problemas al listar paginadamente los cargos efectuados a un cliente
 */
export class FlowListChargesCardError extends FlowError {
  constructor(message: string) {
    super(`Error al listar cargos efectuados en la tarjeta: ${message}`);
    this.name = 'FlowListChargesCardError';
  }
}
/**
 * Error cuando hay problemas al listar paginadamente los cargos fallidos a un cliente
 */
export class FlowListFailedChargesCardError extends FlowError {
  constructor(message: string) {
    super(`Error al listar cargos fallidos en la tarjeta: ${message}`);
    this.name = 'FlowListFailedChargesCardError';
  }
}
/**
 * Error cuando hay problemas al listar paginadamente los cobros efectuados a un cliente
 */
export class FlowListPaginatedSubscriptionsError extends FlowError {
  constructor(message: string) {
    super(`Error al listar suscripciones paginadas: ${message}`);
    this.name = 'FlowListPaginatedSubscriptionsError';
  }
}

/**
 *  Error cuando hay problemas al tratar de crear una suscripción
 */
export class FlowCreatePlanError extends FlowError {
  constructor(message: string) {
    super(`Error al crear el plan: ${message}`);
    this.name = 'FlowCreatePlanError';
  }
}
