import { FlowAuthenticationError } from '../errors';
import FlowCoupons from './flow.coupons';
import FlowCustomers from './flow.customers';
import FlowPayments from './flow.payments';
import FlowPlans from './flow.plans';
import FlowRefunds from './flow.refunds';
import FlowSubscriptions from './flow.subscriptions';
import FlowSubscriptionsItems from './flow.subscriptionsItems';
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
   * Objecto que proporciona métodos para interactuar con los planes en Flow.
   */
  public plans: FlowPlans;

  /**
   * Objeto que proporciona metodos para interactuar con las suscripciones en Flow.
   */
  public subscriptions: FlowSubscriptions;
  /**
   * Objecto que proporciona metodos para interactuar con los items de suscripciones en Flow.
   */
  public subscriptionsItems: FlowSubscriptionsItems;
  /**
   * Objecto que proporciona metodos para interactuar con los cupones en Flow.
   */
  public coupons: FlowCoupons;

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
    this.plans = new FlowPlans(apiKey, secretKey, baseURL);
    this.subscriptions = new FlowSubscriptions(apiKey, secretKey, baseURL);
    this.subscriptionsItems = new FlowSubscriptionsItems(
      apiKey,
      secretKey,
      baseURL,
    );
    this.coupons = new FlowCoupons(apiKey, secretKey, baseURL);
  }
}

export default Flow;
