import { FlowConstants } from '../types/flow';

const flowConstants: FlowConstants = {
  FLOW_PAYMENT_METHOD_CODES: {
    'webpay-plus': 1,
    onepay: 5,
    mach: 15,
    khipu: 22,
    redpay: 150,
    flow: 9,
  },
  FLOW_PAYMENT_STATUS_CODES: {
    1: 'Pendiente',
    2: 'Pagada',
    3: 'Rechazada',
    4: 'Anulada',
  },
};

export default flowConstants;
