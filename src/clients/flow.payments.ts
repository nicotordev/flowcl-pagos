import axios, { AxiosInstance } from 'axios';
import {
  FlowCreatePaymentByEmailRequest,
  FlowCreatePaymentByEmailResponse,
  FlowCreatePaymentRequest,
  FlowCreatePaymentResponse,
  FlowPaymentsReceivedByDateRequest,
  FlowPaymentsReceivedByDateResponse,
  FlowPaymentsStatusExtendedResponse,
  FlowPaymentStatusResponse,
  FlowTransactionsReceivedByDateRequest,
  FlowTransactionsReceivedByDateResponse,
} from '../types/flow';

import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreatePaymentByEmailError,
  FlowCreatePaymentError,
  FlowPaymentStatusError,
  FlowPaymentsReceivedByDateError,
  FlowStatusExtendedError,
  FlowTransactionsReceivedByDateError,
} from '../errors';
import {
  generateFormData,
  getPaymentMethod,
  getPaymentStatus,
  isValidPaymentReceivedByDate,
} from '../utils/flow.utils';

/**
 * Cliente para interactuar con la API de pagos de Flow.
 * Permite crear órdenes de pago y consultar su estado.
 * Implementa un sistema de errores personalizados para un mejor manejo de fallos.
 */
export default class FlowPayments {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;

  /**
   * Objeto que proporciona métodos para interactuar con los pagos en Flow.
   */
  public payments: {
    /**
     * Métodos para consultar el estado de pagos en Flow mediante diferentes identificadores.
     */
    status: {
      /**
       * Obtiene el estado de un pago en Flow.
       * @param {string} token Token del pago a consultar.
       * @returns {Promise<FlowPaymentStatusResponse>} Respuesta de Flow con el estado del pago.
       * @throws {FlowPaymentStatusError} Si ocurre un error al obtener el estado del pago.
       * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
       */
      byToken: (token: string) => Promise<FlowPaymentStatusResponse>;

      /**
       * Obtiene el estado de un pago utilizando el identificador de comercio.
       * @param {string} commerceId Identificador único del comercio asignado al pago.
       * @returns {Promise<FlowPaymentStatusResponse>} Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
       * @throws {FlowPaymentStatusError} Si ocurre un error al obtener el estado del pago.
       * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
       */
      byCommerceId: (commerceId: string) => Promise<FlowPaymentStatusResponse>;

      /**
       * Obtiene el estado de un pago utilizando el número de orden de Flow.
       * @param {number} flowOrder Número de orden de Flow asignado al pago.
       * @returns {Promise<FlowPaymentStatusResponse>} Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
       * @throws {FlowPaymentStatusError} Si ocurre un error al obtener el estado del pago.
       * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
       */
      byFlowOrderNumber: (
        flowOrder: number,
      ) => Promise<FlowPaymentStatusResponse>;
    };
    /**
     * Obtiene la lista de pagos recibidos en una fecha específica.
     * @param {FlowPaymentsReceivedByDateRequest} data con la fecha en formato YYYY-MM-DD
     * @returns {Promise<FlowPaymentsReceivedByDateResponse>} con la lista de pagos recibidos en la fecha indicada.
     * @throws {PaymentsReceivedByDateError} Si ocurre un error al obtener la lista de pagos recibidos.
     * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
     */
    listPaymentsByDate: (
      data: FlowPaymentsReceivedByDateRequest,
    ) => Promise<FlowPaymentsReceivedByDateResponse>;
    /**
     * Obtiene la lista de transacciones recibidas en una fecha específica.
     * @param {FlowTransactionsReceivedByDateRequest} data con la fecha en formato YYYY-MM-DD
     * @returns {Promise<FlowTransactionsReceivedByDateResponse>} con la lista de transacciones recibidas en la fecha indicada.
     * @throws {TransactionsReceivedByDateError} Si ocurre un error al obtener la lista de transacciones recibidas.
     * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
     */
    listTransactionsByDate: (
      data: FlowTransactionsReceivedByDateRequest,
    ) => Promise<FlowTransactionsReceivedByDateResponse>;
    statusExtended: {
      /**
       * Obtiene el estado extendido de un pago en base al token
       * @param {string} token Token único del pago a consultar.
       * @returns {Promise<FlowPaymentsStatusExtendedResponse>} con la lista de pagos recibidos en la fecha indicada.
       * @throws {PaymentsReceivedByDateError} Si ocurre un error al obtener la lista de pagos recibidos.
       * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
       */
      byToken: (token: string) => Promise<FlowPaymentsStatusExtendedResponse>;
      /**
       * Obtiene el estado extendido de un pago en base al flowOrder
       * @param {number} flowOrder numero de orden de Flow asignado al pago por ejemplo 68977654
       * @returns {Promise<FlowPaymentsStatusExtendedResponse>} con la lista de pagos recibidos en la fecha indicada.
       * @throws {PaymentsReceivedByDateError} Si ocurre un error al obtener la lista de pagos recibidos.
       * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
       *
       * */
      byFlowOrder: (
        flowOrder: number,
      ) => Promise<FlowPaymentsStatusExtendedResponse>;
    };
    /**
     * Este método permite crear una orden de pago a Flow y recibe como respuesta la URL para redirigir el browser del pagador y el token que identifica la transacción. La url de redirección se debe formar concatenando los valores recibidos en la respuesta de la siguiente forma: url + "?token=" +token Una vez que el pagador efectúe el pago, Flow notificará el resultado a la página del comercio que se envió en el parámetro urlConfirmation.
     * @param {FlowCreatePaymentRequest} data con los datos necesarios para crear un pago.
     * @returns {Promise<FlowCreatePaymentResponse>} con la respuesta de Flow al crear un pago.
     * @throws {FlowCreatePaymentError} Si ocurre un error al crear el pago.
     * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
     */
    createPayment: (
      data: FlowCreatePaymentRequest,
    ) => Promise<FlowCreatePaymentResponse>;
    /**
     * Permite generar un cobro por email. Flow emite un email al pagador que contiene la información de la Orden de pago y el link de pago correspondiente. Una vez que el pagador efectúe el pago, Flow notificará el resultado a la página del comercio que se envió en el parámetro urlConfirmation.
     * @param {FlowCreatePaymentByEmailRequest} data con los datos necesarios para crear un pago.
     * @returns {Promise<FlowCreatePaymentByEmailResponse>} con la respuesta de Flow al crear un pago.
     * @throws {FlowCreatePaymentByEmailError} Si ocurre un error al crear el pago.
     * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
     */
    createPaymentByEmail: (
      data: FlowCreatePaymentByEmailRequest,
    ) => Promise<FlowCreatePaymentByEmailResponse>;
  };

  /**
   * Constructor de la clase FlowClient.
   * @param {string} apiKey Clave de API proporcionada por Flow.
   * @param {string} secretKey Clave secreta proporcionada por Flow.
   * @param  {string}baseURL URL base de la API de Flow.
   * @throws {FlowAuthenticationError} Si no se proporciona apiKey o secretKey.
   */
  constructor(apiKey: string, secretKey: string, baseURL: string) {
    if (!apiKey || !secretKey) {
      throw new FlowAuthenticationError();
    }

    this.apiKey = apiKey;
    this.secretKey = secretKey;

    // Crear una instancia de Axios con la configuración base
    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/payment`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.payments = {
      status: {
        byToken: this.getPaymentStatusByToken.bind(this),
        byCommerceId: this.getPaymentStatusByCommerceId.bind(this),
        byFlowOrderNumber: this.getPaymentStatusByFlowOrderNumber.bind(this),
      },
      listPaymentsByDate: this.getPaymentsReceivedByDate.bind(this),
      listTransactionsByDate: this.getTransactionsReceivedByDate.bind(this),
      statusExtended: {
        byToken: this.getStatusExtendedByToken.bind(this),
        byFlowOrder: this.getStatusExtendedByFlowOrder.bind(this),
      },
      createPayment: this.createPayment.bind(this),
      createPaymentByEmail: this.createPaymentByEmail.bind(this),
    };
  }
  /**
   * Realiza una petición a la API de Flow.
   * @param {string} endpoint URL del endpoint de la API.
   * @param {string} data Datos a enviar en la petición.
   * @param {'post' | 'get'} method Método de la petición (POST o GET).
   * @param {(e: unknown) => never} error Error a lanzar en caso de error.
   * @param {(data: P) => P} [modifyResponse] Función para modificar la respuesta de la API.
   * @returns {Promise<T>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {Error} Si hay problemas al realizar la petición.
   */
  private async request<T, P>(
    endpoint: string,
    data: Record<string, unknown>,
    method: 'post' | 'get' = 'post',
    error: (e: unknown) => never,
    modifyResponse?: (data: P) => P,
  ): Promise<T | P> {
    try {
      const allData = {
        ...data,
        apiKey: this.apiKey,
      } as Record<string, string>;
      const formData = generateFormData(allData, this.secretKey);

      const response =
        method === 'post'
          ? await this.axiosInstance.post<T>(
              `${endpoint}?${formData.toString()}`,
            )
          : await this.axiosInstance.get<T>(
              `${endpoint}?${formData.toString()}`,
            );

      if (modifyResponse) {
        return modifyResponse(data as P);
      }

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new FlowAPIError(err.response?.status || 500, err.message);
      }
      error(err);
    }
  }

  /**
   * Obtiene el estado de un pago en Flow.
   * @param {string} token Token del pago a consultar.
   * @returns {Promise<FlowPaymentStatusResponse>} Respuesta de Flow con el estado del pago.
   * @throws {FlowPaymentStatusError} Si ocurre un error al obtener el estado del pago.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   */
  private async getPaymentStatusByToken(
    token: string,
  ): Promise<FlowPaymentStatusResponse> {
    return this.request(
      '/getStatus',
      { token },
      'get',
      (e) => {
        throw new FlowPaymentStatusError((e as Error).message);
      },
      (data) => {
        return {
          ...data,
          statusStr: getPaymentStatus(data.status),
        };
      },
    );
  }

  /**
   * Obtiene el estado de un pago utilizando el identificador de comercio.
   * @param {string} commerceId Identificador único del comercio asignado al pago.
   * @returns {Promise<FlowPaymentStatusResponse>} Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
   * @throws {FlowPaymentStatusError} Si ocurre un error al obtener el estado del pago.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   */
  private async getPaymentStatusByCommerceId(
    commerceId: string,
  ): Promise<FlowPaymentStatusResponse> {
    return this.request(
      '/getPaymentStatusByCommerceId',
      { commerceId },
      'get',
      (e) => {
        throw new FlowPaymentStatusError((e as Error).message);
      },
      (data) => {
        return {
          ...data,
          statusStr: getPaymentStatus(data.status),
        };
      },
    );
  }

  /**
   * Obtiene el estado de un pago utilizando el número de orden de Flow.
   * @param {number} flowOrder Número de orden de Flow asignado al pago.
   * @returns {Promise<FlowPaymentStatusResponse>} Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
   * @throws {FlowPaymentStatusError} Si ocurre un error al obtener el estado del pago.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   */
  private async getPaymentStatusByFlowOrderNumber(
    flowOrder: number,
  ): Promise<FlowPaymentStatusResponse> {
    return this.request<
      Omit<FlowPaymentStatusResponse, 'statusStr'>,
      FlowPaymentStatusResponse
    >(
      '/getStatusByFlowOrder',
      { flowOrder },
      'get',
      (e) => {
        throw new FlowPaymentStatusError((e as Error).message);
      },
      (data) => {
        return {
          ...data,
          statusStr: getPaymentStatus(data.status),
        };
      },
    ) as Promise<FlowPaymentStatusResponse>;
  }
  /**
   * Obtiene la lista de pagos recibidos en una fecha específica.
   * @param {FlowPaymentsReceivedByDateRequest} data con la fecha en formato YYYY-MM-DD
   * @returns {Promise<FlowPaymentsReceivedByDateResponse>} con la lista de pagos recibidos en la fecha indicada.
   * @throws {PaymentsReceivedByDateError} Si ocurre un error al obtener la lista de pagos recibidos.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   */
  private async getPaymentsReceivedByDate(
    data: FlowPaymentsReceivedByDateRequest,
  ): Promise<FlowPaymentsReceivedByDateResponse> {
    if (!isValidPaymentReceivedByDate(data.date)) {
      throw new FlowPaymentsReceivedByDateError('Fecha no válida');
    }
    return this.request('/getPayments', data, 'get', (e) => {
      throw new FlowPaymentsReceivedByDateError((e as Error).message);
    });
  }
  /**
   * Obtiene el estado extendido de un pago en base al token
   * @param {string} token Token único del pago a consultar.
   * @returns {Promise<FlowPaymentsStatusExtendedResponse>} con la lista de pagos recibidos en la fecha indicada.
   * @throws {PaymentsReceivedByDateError} Si ocurre un error al obtener la lista de pagos recibidos.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   */
  private async getStatusExtendedByToken(
    token: string,
  ): Promise<FlowPaymentsStatusExtendedResponse> {
    return this.request(
      '/getStatusExtended',
      { token },
      'get',
      (e) => {
        throw new FlowStatusExtendedError((e as Error).message);
      },
      (data) => {
        return {
          ...data,
          statusStr: getPaymentStatus(data.status),
        };
      },
    );
  }
  /**
   * Obtiene el estado extendido de un pago en base al flowOrder
   * @param {number} flowOrder numero de orden de Flow asignado al pago por ejemplo 68977654
   * @returns {Promise<FlowPaymentsStatusExtendedResponse>} con la lista de pagos recibidos en la fecha indicada.
   * @throws {PaymentsReceivedByDateError} Si ocurre un error al obtener la lista de pagos recibidos.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   *
   * */
  private async getStatusExtendedByFlowOrder(
    flowOrder: number,
  ): Promise<FlowPaymentsStatusExtendedResponse> {
    return this.request(
      '/getStatusByFlowOrderExtended',
      { flowOrder },
      'get',
      (e) => {
        throw new FlowStatusExtendedError((e as Error).message);
      },
      (data) => {
        return {
          ...data,
          statusStr: getPaymentStatus(data.status),
        };
      },
    );
  }
  /**
   * Obtiene la lista de transacciones recibidas en una fecha específica.
   * @param {FlowTransactionsReceivedByDateRequest} data con la fecha en formato YYYY-MM-DD
   * @returns {Promise<FlowTransactionsReceivedByDateResponse>} con la lista de transacciones recibidas en la fecha indicada.
   * @throws {TransactionsReceivedByDateError} Si ocurre un error al obtener la lista de transacciones recibidas.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   */
  private async getTransactionsReceivedByDate(
    data: FlowTransactionsReceivedByDateRequest,
  ): Promise<FlowTransactionsReceivedByDateResponse> {
    if (!isValidPaymentReceivedByDate(data.date)) {
      throw new FlowTransactionsReceivedByDateError('Fecha no válida');
    }
    return this.request('/getTransactions', data, 'get', (e) => {
      throw new FlowTransactionsReceivedByDateError((e as Error).message);
    });
  }
  /**
   * Este método permite crear una orden de pago a Flow y recibe como respuesta la URL para redirigir el browser del pagador y el token que identifica la transacción. La url de redirección se debe formar concatenando los valores recibidos en la respuesta de la siguiente forma: url + "?token=" +token Una vez que el pagador efectúe el pago, Flow notificará el resultado a la página del comercio que se envió en el parámetro urlConfirmation.
   * @param {FlowCreatePaymentRequest} data con los datos necesarios para crear un pago.
   * @returns {Promise<FlowCreatePaymentResponse>} con la respuesta de Flow al crear un pago.
   * @throws {FlowCreatePaymentError} Si ocurre un error al crear el pago.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   */
  private async createPayment(
    data: FlowCreatePaymentRequest,
  ): Promise<FlowCreatePaymentResponse> {
    const response = await this.request<
      Omit<FlowCreatePaymentResponse, 'redirectUrl'>,
      FlowCreatePaymentResponse
    >(
      '/create',
      {
        ...data,
        paymentMethod: getPaymentMethod(data.paymentMethod || 'flow'),
      },
      'post',
      (e) => {
        throw new FlowCreatePaymentError((e as Error).message);
      },
      (data) => {
        return {
          ...data,
          redirectUrl: data.url + '?token=' + data.token,
        };
      },
    );
    return {
      ...response,
      redirectUrl: response.url + '?token=' + response.token,
    };
  }

  /**
   * Permite generar un cobro por email. Flow emite un email al pagador que contiene la información de la Orden de pago y el link de pago correspondiente. Una vez que el pagador efectúe el pago, Flow notificará el resultado a la página del comercio que se envió en el parámetro urlConfirmation.
   * @param {FlowCreatePaymentByEmailRequest} data con los datos necesarios para crear un pago.
   * @returns {Promise<FlowCreatePaymentByEmailResponse>} con la respuesta de Flow al crear un pago.
   * @throws {FlowCreatePaymentByEmailError} Si ocurre un error al crear el pago.
   * @throws {FlowAPIError} Si la API de Flow responde con un error HTTP.
   */
  private async createPaymentByEmail(
    data: FlowCreatePaymentByEmailRequest,
  ): Promise<FlowCreatePaymentByEmailResponse> {
    const response = await this.request<
      Omit<FlowCreatePaymentByEmailResponse, 'redirectUrl'>,
      FlowCreatePaymentByEmailResponse
    >(
      '/createEmail',
      {
        ...data,
        paymentMethod: getPaymentMethod(data.paymentMethod || 'flow'),
      },
      'post',
      (e) => {
        throw new FlowCreatePaymentByEmailError((e as Error).message);
      },
      (data) => {
        return {
          ...data,
          redirectUrl: data.url + '?token=' + data.token,
        };
      },
    );
    return {
      ...response,
      redirectUrl: response.url + '?token=' + response.token,
    };
  }
}
