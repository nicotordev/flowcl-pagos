import flowConstants from '../constants/flow.constants';
import { FlowPaymentStatus, PaymentMethods } from '../types/flow';
import { parse, isValid, format } from 'date-fns';

function getPaymentMethod(paymentMethod: PaymentMethods) {
  return flowConstants.FLOW_PAYMENT_METHOD_CODES[paymentMethod];
}

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

export { getPaymentMethod, getPaymentStatus, isValidPaymentReceivedByDate };
