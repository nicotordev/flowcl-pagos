import flowConstants from '../constants/flow.constants';
import { FlowPaymentStatus, PaymentMethods } from '../types/flow';

function getPaymentMethod(paymentMethod: PaymentMethods) {
  return flowConstants.FLOW_PAYMENT_METHOD_CODES[paymentMethod];
}

function getPaymentStatus(status: number): FlowPaymentStatus {
  return flowConstants.FLOW_PAYMENT_STATUS_CODES[status];
}

export { getPaymentMethod, getPaymentStatus };
