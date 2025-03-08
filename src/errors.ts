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
export class PaymentsReceivedByDateError extends FlowError {
  constructor(message: string) {
    super(`Error al obtener los pagos recibidos por fecha: ${message}`);
    this.name = 'PaymentsReceivedByDateError';
  }
}
