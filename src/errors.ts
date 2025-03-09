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
/**
 * Error cuando hay problemas al tratar de obtener una suscripción
 */
export class FlowGetPlanError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener el plan: ${message}`);
    this.name = 'FlowGetPlanError';
  }
}
/**
 * Error cuando hay problemas al tratar de editar una suscripción
 */
export class FlowEditPlanError extends FlowError {
  constructor(message: string) {
    super(`Error al editar el plan: ${message}`);
    this.name = 'FlowEditPlanError';
  }
}
/**
 * Error cuando hay problemas al tratar de eliminar una suscripción
 */
export class FlowListPlansError extends FlowError {
  constructor(message: string) {
    super(`Error al listar los planes: ${message}`);
    this.name = 'FlowListPlansError';
  }
}
/**
 * Error cuando hay problemas al tratar de obtener una suscripción
 */
export class FlowCreateSubscriptionToPlanError extends FlowError {
  constructor(message: string) {
    super(`Error al crear la suscripción al plan: ${message}`);
    this.name = 'FlowCreateSubscriptionToPlanError';
  }
}
/**
 * Error cuando hay problemas al tratar de obtener una subscripción por ID
 *
 */
export class FlowGetSubscriptionBySubscriptionIdError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener la suscripción por ID: ${message}`);
    this.name = 'FlowGetSubscriptionBySubscriptionIdError';
  }
}

/**
 * Error cuando hay problemas al tratar de obtener las subscripciones de un plan
 */
export class FlowGetPlanSubscriptionsError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener las suscripciones del plan: ${message}`);
    this.name = 'FlowGetPlanSubscriptionsError';
  }
}
/**
 * Error cuando hay problemas al tratar de obtener las subscripciones de un cliente
 */
export class FlowUpdateSubscriptionTrialDaysError extends FlowError {
  constructor(message: string) {
    super(
      `Error al actualizar los días de prueba de la suscripción: ${message}`,
    );
    this.name = 'FlowUpdateSubscriptionTrialDaysError';
  }
}

/**
 * Error cuando hay problemas al tratar de cancelar una suscripción
 */
export class FlowCancelSubscriptionError extends FlowError {
  constructor(message: string) {
    super(`Error al cancelar la suscripción: ${message}`);
    this.name = 'FlowCancelSubscriptionError';
  }
}

export class FlowAddDiscountToSubscriptionError extends FlowError {
  constructor(message: string) {
    super(`Error al agregar descuento a la suscripción: ${message}`);
    this.name = 'FlowAddDiscountToSubscription';
  }
}

export class FlowRemoveDiscountFromSubscriptionError extends FlowError {
  constructor(message: string) {
    super(`Error al remover descuento de la suscripción: ${message}`);
    this.name = 'FlowRemoveDiscountFromSubscription';
  }
}

export class FlowAddItemToSubscriptionError extends FlowError {
  constructor(message: string) {
    super(`Error al agregar item a la suscripción: ${message}`);
    this.name = 'FlowAddItemToSubscription';
  }
}

export class FlowRemoveItemFromSubscriptionError extends FlowError {
  constructor(message: string) {
    super(`Error al remover item de la suscripción: ${message}`);
    this.name = 'FlowRemoveItemFromSubscription';
  }
}

export class FlowChangeAssociatedPlanToSubscriptionError extends FlowError {
  constructor(message: string) {
    super(`Error al cambiar plan asociado a la suscripción: ${message}`);
    this.name = 'FlowChangeAssociatedPlanToSubscription';
  }
}

export class FlowPreviewSubscriptionPlanChangeError extends FlowError {
  constructor(message: string) {
    super(
      `Error al previsualizar cambio de plan de la suscripción: ${message}`,
    );
    this.name = 'FlowPreviewSubscriptionPlanChange';
  }
}

export class FlowCancelScheduledPlanChangeError extends FlowError {
  constructor(message: string) {
    super(`Error al cancelar cambio plan programado: ${message}`);
    this.name = 'FlowCancelScheduledPlanChange';
  }
}

export class FlowCreateAdditionalSubscriptionItemError extends FlowError {
  constructor(message: string) {
    super(`Error al crear item adicional de suscripción: ${message}`);
    this.name = 'FlowCreateAdditionalSubscriptionItemError';
  }
}

export class FlowGetAdditionalSubscriptionItemError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener item adicional de suscripción: ${message}`);
    this.name = 'FlowGetAdditionalSubscriptionItemError';
  }
}

export class FlowEditAdditionalSubscriptionItemError extends FlowError {
  constructor(message: string) {
    super(`Error al editar item adicional de suscripción: ${message}`);
    this.name = 'FlowEditAdditionalSubscriptionItemError';
  }
}

export class FlowDeleteAdditionalSubscriptionItemError extends FlowError {
  constructor(message: string) {
    super(`Error al eliminar item adicional de suscripción: ${message}`);
    this.name = 'FlowDeleteAdditionalSubscriptionItem';
  }
}

export class FlowListAdditionalSubscriptionItemError extends FlowError {
  constructor(message: string) {
    super(`Error al listar items adicionales de suscripción: ${message}`);
    this.name = 'FlowListAdditionalSubscriptionItemError';
  }
}

export class FlowCreateDiscountCouponError extends FlowError {
  constructor(message: string) {
    super(`Error al crear cupón de descuento: ${message}`);
    this.name = 'FlowCreateDiscountCouponError';
  }
}

export class FlowEditDiscountCouponError extends FlowError {
  constructor(message: string) {
    super(`Error al editar cupón de descuento: ${message}`);
    this.name = 'FlowEditDiscountCouponError';
  }
}

export class FlowDeleteDiscountCouponError extends FlowError {
  constructor(message: string) {
    super(`Error al eliminar cupón de descuento: ${message}`);
    this.name = 'FlowDeleteDiscountCouponError';
  }
}

export class FlowGetDiscountCouponError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener cupón de descuento: ${message}`);
    this.name = 'FlowGetDiscountCouponError';
  }
}

export class FlowListDiscountCouponsError extends FlowError {
  constructor(message: string) {
    super(`Error al listar cupones de descuento: ${message}`);
    this.name = 'FlowListDiscountCouponsError';
  }
}

export class FlowGetInvoiceDataError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener datos de la factura: ${message}`);
    this.name = 'FlowGetInvoiceDataError';
  }
}

export class FlowCancelInvoicePendingPaymentError extends FlowError {
  constructor(message: string) {
    super(`Error al cancelar factura pendiente de pago: ${message}`);
    this.name = 'FlowCancelInvoicePendingPaymentError';
  }
}

export class FlowRecordExternalPaymentAndMarkInvoicePaidError extends FlowError {
  constructor(message: string) {
    super(
      `Error al registrar pago externo y marcar factura pagada: ${message}`,
    );
    this.name = 'FlowRecordExternalPaymentAndMarkInvoicePaidError';
  }
}

export class FlowGetOverdueInvoicesError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener facturas vencidas: ${message}`);
    this.name = 'FlowGetOverdueInvoicesError';
  }
}

export class FlowRetryOverdueInvoicePaymentError extends FlowError {
  constructor(message: string) {
    super(`Error al reintentar pago de factura vencida: ${message}`);
    this.name = 'FlowRetryOverdueInvoicePaymentError';
  }
}
