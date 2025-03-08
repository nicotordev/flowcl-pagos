import { FlowAuthenticationError } from '../errors';
import FlowCustomers from './flow.customers';
import FlowPayments from './flow.payments';
import FlowRefunds from './flow.refunds';
/**
 * Cliente para interactuar con la API de Flow.
 */
class Flow {
  /**
   * Objeto que proporciona métodos para interactuar con los pagos en Flow.
   */
  public payments: FlowPayments;
  /**
   * Objeto que proporciona métodos para interactuar con los reembolsos en Flow.
   */
  public refunds: FlowRefunds;

  /**
   * Objecto que proporciona métodos para interactuar con los clientes en Flow.
   */
  public customers: FlowCustomers;

  /**
   * Constructor de la clase FlowClient.
   * @param apiKey Clave de API proporcionada por Flow.
   * @param secretKey Clave secreta proporcionada por Flow.
   * @param enviroment Entorno de Flow ('sandbox' o 'production').
   * @throws FlowAuthenticationError Si no se proporciona apiKey o secretKey.
   */
  constructor(
    apiKey: string,
    secretKey: string,
    enviroment: 'sandbox' | 'production' = 'sandbox',
  ) {
    if (!apiKey || !secretKey) {
      throw new FlowAuthenticationError();
    }

    const baseURL =
      enviroment === 'sandbox'
        ? 'https://sandbox.flow.cl/api'
        : 'https://www.flow.cl/api';

    this.payments = new FlowPayments(apiKey, secretKey, baseURL);
    this.refunds = new FlowRefunds(apiKey, secretKey, baseURL);
    this.customers = new FlowCustomers(apiKey, secretKey, baseURL);
  }
}

export default Flow;
