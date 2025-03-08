import { FlowAuthenticationError } from '../errors';
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

    this.payments = new FlowPayments(apiKey, secretKey, enviroment);
    this.refunds = new FlowRefunds(apiKey, secretKey, enviroment);
  }
}

export default Flow;
