import flowConstants from '../constants/flow.constants';
import { FlowPaymentStatus, FlowPaymentMethods } from '../types/flow';
import { parse, isValid, format } from 'date-fns';
import CryptoJS from 'crypto-js';

/**
 * Obtiene el código de metodo de pago en Flow.
 * @param paymentMethod El metodo de pago "webpay-plus" | "mach" | "khipu" | "redpay" | "onepay" | "flow"
 * @returns El codigo de metodo de pago en Flow.
 */

function getPaymentMethod(paymentMethod: FlowPaymentMethods) {
  return flowConstants.FLOW_PAYMENT_METHOD_CODES[paymentMethod];
}

/**
 * Obtiene el estado de un pago en Flow.
 * @param status numero de estado
 * @returns El estado del pago en Flow en formato string.
 */

function getPaymentStatus(status: number): FlowPaymentStatus {
  return flowConstants.FLOW_PAYMENT_STATUS_CODES[status];
}

/**
 * Verifica si una fecha está en el formato YYYY-MM-DD o intenta convertirla.
 * @param dateString La fecha en formato string o Date.
 * @returns La fecha en formato YYYY-MM-DD si es válida, o null si no puede convertirse.
 */
function isValidPaymentReceivedByDate(
  dateString: string | Date,
): string | null {
  if (
    typeof dateString === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(dateString)
  ) {
    return dateString;
  }

  const parsedDate = parse(dateString.toString(), 'yyyy-MM-dd', new Date());
  if (isValid(parsedDate)) {
    return format(parsedDate, 'yyyy-MM-dd');
  }

  return null;
}

/**
 * Genera una firma HMAC-SHA256 para asegurar la autenticidad de los datos enviados a Flow.
 * @param params Parámetros a firmar.
 * @returns Firma generada.
 */
function generateSignature(
  params: Record<string, string>,
  secretKey: string,
): string {
  const sortedKeys = Object.keys(params).sort(); // Ordenar las claves alfabéticamente
  let toSign = '';
  sortedKeys.forEach((key) => {
    toSign += key + params[key]; // Concatenar clave y valor
  });
  return CryptoJS.HmacSHA256(toSign, secretKey).toString(); // Generar firma
}

/**
 * Genera un objeto con los datos a enviar y la firma HMAC-SHA256.
 * @param data Recibe un objeto con los datos a enviar
 * @param secretKey Recibe la clave secreta para firmar los datos
 * @returns Retorna un objeto con los datos y la firma
 */
function generateFormData<T extends Record<string, string>>(
  data: T,
  secretKey: string,
) {
  const signature = generateSignature(data, secretKey); // Generar firma

  return {
    ...data,
    s: signature, // Agregar firma a los datos enviados
  };
}

export {
  getPaymentMethod,
  getPaymentStatus,
  isValidPaymentReceivedByDate,
  generateSignature,
  generateFormData,
};
