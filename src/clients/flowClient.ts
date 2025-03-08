/**
 * Cliente para interactuar con la API de Flow.
 * Permite crear órdenes de pago y consultar su estado.
 * Implementa un sistema de errores personalizados para un mejor manejo de fallos.
 */
import axios, { AxiosInstance } from 'axios';
import CryptoJS from 'crypto-js';

import {
  FlowPaymentsReceivedByDateRequest,
  FlowPaymentsReceivedByDateResponse,
  FlowPaymentsStatusExtendedResponse,
  FlowPaymentStatusResponse,
  FlowTransactionsReceivedByDateRequest,
  FlowTransactionsReceivedByDateResponse,
} from '../types/flow';
import {
  getPaymentStatus,
  isValidPaymentReceivedByDate,
} from '../utils/flow.utils';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowPaymentStatusError,
  PaymentsReceivedByDateError,
  TransactionsReceivedByDateError,
} from '../errors';

class FlowClient {
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
       * Este método se utiliza para obtener el estado de un pago. Se debe utilizar en la página callback del comercio para recibir notificaciones de pagos. Cada vez que el pagador efectúe un pago, Flow enviará vía POST una llamada a la página del comercio, pasando como parámetro un token que deberá utilizarse en este servicio.
       * @param token Token único del pago a consultar.
       * @returns Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
       * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
       * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
       */
      byToken: (token: string) => Promise<FlowPaymentStatusResponse>;

      /**
       * Este método permite obtener el estado de un pago en base al commerceId
       * @param commerceId Identificador único del comercio asignado al pago.
       * @returns Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
       * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
       * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
       */
      byCommerceId: (commerceId: string) => Promise<FlowPaymentStatusResponse>;

      /**
       * Este método permite obtener el estado de un pago en base al flowOrder.
       * @param flowOrder Número de orden de Flow asignado al pago.
       * @returns Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
       * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
       * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
       */
      byFlowOrderNumber: (
        flowOrder: number,
      ) => Promise<FlowPaymentStatusResponse>;
    };
    /**
     * Este método permite obtener la lista paginada de pagos recibidos en un día.Los objetos pagos de la lista tienen la misma estructura de los retornados en los servicios payment/getStatus
     * @param data FlowPaymentsReceivedByDateRequest con la fecha en formato YYYY-MM-DD
     * @returns FlowPaymentsReceivedByDateResponse con la lista de pagos recibidos en la fecha indicada.
     * @throws PaymentsReceivedByDateError Si ocurre un error al obtener la lista de pagos recibidos.
     * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
     */
    listPaymentsByDate: (
      data: FlowPaymentsReceivedByDateRequest,
    ) => Promise<FlowPaymentsReceivedByDateResponse>;

    listTransactionsByDate: (
      data: FlowTransactionsReceivedByDateRequest,
    ) => Promise<FlowTransactionsReceivedByDateResponse>;

    /**
     *
     * Este método se utiliza para obtener el estado de un pago. A diferencia del /payment/getStatus este servicio retorna el tipo de pago, los 4 últimos dígitos de la tarjeta (si el pago se hizo con tarjeta) y la información del último intento de pago. Se debe utilizar en la página callback del comercio para recibir notificaciones de pagos. Cada vez que el pagador efectúe un pago, Flow enviará vía POST una llamada a la página del comercio, pasando como parámetro un token que deberá utilizarse en este servicio.
     * @param token Token único del pago a consultar.
     * @returns FlowPaymentsStatusExtendedResponse con la lista de pagos recibidos en la fecha indicada.
     * @throws PaymentsReceivedByDateError Si ocurre un error al obtener la lista de pagos recibidos.
     * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
     *
     */
    statusExtended: {
      /**
       * Este método se utiliza para obtener el estado de un pago. A diferencia del /payment/getStatus este servicio retorna el tipo de pago, los 4 últimos dígitos de la tarjeta (si el pago se hizo con tarjeta) y la información del último intento de pago. Se debe utilizar en la página callback del comercio para recibir notificaciones de pagos. Cada vez que el pagador efectúe un pago, Flow enviará vía POST una llamada a la página del comercio, pasando como parámetro un token que deberá utilizarse en este servicio.
       * @param token Token único del pago a consultar.
       * @returns  FlowPaymentsStatusExtendedResponse con la lista de pagos recibidos en la fecha indicada.
       * @throws PaymentsReceivedByDateError Si ocurre un error al obtener la lista de pagos recibidos.
       * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
       * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
       */
      byToken: (token: string) => Promise<FlowPaymentsStatusExtendedResponse>;
      /**
       * Este método se utiliza para obtener el estado de un pago. A diferencia del /payment/getStatus este servicio retorna el tipo de pago, los 4 últimos dígitos de la tarjeta (si el pago se hizo con tarjeta) y la información del último intento de pago. Se debe utilizar en la página callback del comercio para recibir notificaciones de pagos. Cada vez que el pagador efectúe un pago, Flow enviará vía POST una llamada a la página del comercio, pasando como parámetro un token que deberá utilizarse en este servicio.
       * @param flowOrder Número de orden de Flow asignado al pago, por ejemplo 68977654.
       * @returns  FlowPaymentsStatusExtendedResponse con la lista de pagos recibidos en la fecha indicada.
       * @throws PaymentsReceivedByDateError Si ocurre un error al obtener la lista de pagos recibidos.
       * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
       * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
       */
      byFlowOrder: (
        flowOrder: number,
      ) => Promise<FlowPaymentsStatusExtendedResponse>;
    };
  };

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

    this.apiKey = apiKey;
    this.secretKey = secretKey;
    const baseURL =
      enviroment === 'sandbox'
        ? 'https://sandbox.flow.cl/api'
        : 'https://www.flow.cl/api';

    // Crear una instancia de Axios con la configuración base
    this.axiosInstance = axios.create({
      baseURL,
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
    };
  }

  /**
   * Genera una firma HMAC-SHA256 para asegurar la autenticidad de los datos enviados a Flow.
   * @param params Parámetros a firmar.
   * @returns Firma generada.
   */
  private generateSignature(params: Record<string, string>): string {
    const sortedKeys = Object.keys(params).sort(); // Ordenar las claves alfabéticamente
    let toSign = '';
    sortedKeys.forEach((key) => {
      toSign += key + params[key]; // Concatenar clave y valor
    });
    return CryptoJS.HmacSHA256(toSign, this.secretKey).toString(); // Generar firma
  }

  /**
   * Obtiene el estado de un pago en Flow.
   * @param token Token del pago a consultar.
   * @returns Respuesta de Flow con el estado del pago.
   * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   */
  private async getPaymentStatusByToken(
    token: string,
  ): Promise<FlowPaymentStatusResponse> {
    try {
      const allData = { token, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const signature = this.generateSignature(allData); // Generar firma
      const formData = new URLSearchParams({
        ...allData,
        s: signature, // Agregar firma a los datos enviados
      });

      // Enviar solicitud GET a la API de Flow para obtener el estado del pago
      const response = await this.axiosInstance.get<
        Omit<FlowPaymentStatusResponse, 'statusStr'>
      >('/payment/getStatus?' + formData.toString());

      return {
        ...response.data,
        statusStr: getPaymentStatus(response.data.status),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowPaymentStatusError((error as Error).message);
    }
  }

  /**
   * Obtiene el estado de un pago utilizando el identificador de comercio.
   * @param commerceId Identificador único del comercio asignado al pago.
   * @returns Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
   * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   */
  private async getPaymentStatusByCommerceId(
    commerceId: string,
  ): Promise<FlowPaymentStatusResponse> {
    try {
      const allData = { commerceId, apiKey: this.apiKey } as Record<
        string,
        string
      >;
      const signature = this.generateSignature(allData);
      const formData = new URLSearchParams({
        ...allData,
        s: signature,
      });

      const response = await this.axiosInstance.get<
        Omit<FlowPaymentStatusResponse, 'statusStr'>
      >('/payment/getPaymentStatusByCommerceId?' + formData.toString());
      return {
        ...response.data,
        statusStr: getPaymentStatus(response.data.status),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowPaymentStatusError((error as Error).message);
    }
  }

  /**
   * Obtiene el estado de un pago utilizando el número de orden de Flow.
   * @param flowOrder Número de orden de Flow asignado al pago.
   * @returns Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
   * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   */
  private async getPaymentStatusByFlowOrderNumber(
    flowOrder: number,
  ): Promise<FlowPaymentStatusResponse> {
    try {
      const allData = { flowOrder, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const signature = this.generateSignature(allData);
      const formData = new URLSearchParams({
        ...allData,
        s: signature,
      });

      const response = await this.axiosInstance.get<
        Omit<FlowPaymentStatusResponse, 'statusStr'>
      >('/payment/getStatusByFlowOrder?' + formData.toString());
      return {
        ...response.data,
        statusStr: getPaymentStatus(response.data.status),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowPaymentStatusError((error as Error).message);
    }
  }
  /**
   * Obtiene la lista de pagos recibidos en una fecha específica.
   * @param data FlowPaymentsReceivedByDateRequest con la fecha en formato YYYY-MM-DD
   * @returns FlowPaymentsReceivedByDateResponse con la lista de pagos recibidos en la fecha indicada.
   * @throws PaymentsReceivedByDateError Si ocurre un error al obtener la lista de pagos recibidos.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   */
  private async getPaymentsReceivedByDate(
    data: FlowPaymentsReceivedByDateRequest,
  ): Promise<FlowPaymentsReceivedByDateResponse> {
    try {
      // check that the data is in right format, if not, throw an error
      // date should be in format YYYY-MM-DD
      const validatedDate = isValidPaymentReceivedByDate(data.date);

      if (Boolean(validatedDate) === false) {
        throw new PaymentsReceivedByDateError('Fecha no válida');
      }

      const allData = {
        ...data,
        apiKey: this.apiKey,
        date: validatedDate,
      } as unknown as Record<string, string>;

      const signature = this.generateSignature(allData);
      const formData = new URLSearchParams({
        ...allData,
        s: signature,
      });

      const response =
        await this.axiosInstance.get<FlowPaymentsReceivedByDateResponse>(
          '/payment/getPayments?' + formData.toString(),
        );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new PaymentsReceivedByDateError((error as Error).message);
    }
  }
  /**
   * Obtiene el estado extendido de un pago en base al token
   * @param token Token único del pago a consultar.
   * @returns FlowPaymentsStatusExtendedResponse con la lista de pagos recibidos en la fecha indicada.
   * @throws PaymentsReceivedByDateError Si ocurre un error al obtener la lista de pagos recibidos.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   */
  private async getStatusExtendedByToken(
    token: string,
  ): Promise<FlowPaymentsStatusExtendedResponse> {
    try {
      const allData = { token, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;

      const signature = this.generateSignature(allData);
      const formData = new URLSearchParams({
        ...allData,
        s: signature,
      });

      const response = await this.axiosInstance.get<
        Omit<FlowPaymentsStatusExtendedResponse, 'statusStr'>
      >('/payment/getStatusExtended?' + formData.toString());

      return {
        ...response.data,
        statusStr: getPaymentStatus(response.data.status),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new PaymentsReceivedByDateError((error as Error).message);
    }
  }
  /**
   * Obtiene el estado extendido de un pago en base al flowOrder
   * @param flowOrder numero de orden de Flow asignado al pago por ejemplo 68977654
   * @returns FlowPaymentsStatusExtendedResponse con la lista de pagos recibidos en la fecha indicada.
   * @throws PaymentsReceivedByDateError Si ocurre un error al obtener la lista de pagos recibidos.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   *
   * */
  private async getStatusExtendedByFlowOrder(
    flowOrder: number,
  ): Promise<FlowPaymentsStatusExtendedResponse> {
    try {
      const allData = { flowOrder, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;

      const signature = this.generateSignature(allData);
      const formData = new URLSearchParams({
        ...allData,
        s: signature,
      });

      const response = await this.axiosInstance.get<
        Omit<FlowPaymentsStatusExtendedResponse, 'statusStr'>
      >('/payment/getStatusByFlowOrderExtended?' + formData.toString());

      return {
        ...response.data,
        statusStr: getPaymentStatus(response.data.status),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new PaymentsReceivedByDateError((error as Error).message);
    }
  }
  /**
   * Obtiene la lista de transacciones recibidas en una fecha específica.
   * @param data FlowTransactionsReceivedByDateRequest con la fecha en formato YYYY-MM-DD
   * @returns FlowTransactionsReceivedByDateResponse con la lista de transacciones recibidas en la fecha indicada.
   * @throws TransactionsReceivedByDateError Si ocurre un error al obtener la lista de transacciones recibidas.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   */
  private async getTransactionsReceivedByDate(
    data: FlowTransactionsReceivedByDateRequest,
  ): Promise<FlowTransactionsReceivedByDateResponse> {
    try {
      // check that the data is in right format, if not, throw an error
      // date should be in format YYYY-MM-DD
      const validatedDate = isValidPaymentReceivedByDate(data.date);

      if (Boolean(validatedDate) === false) {
        throw new TransactionsReceivedByDateError('Fecha no válida');
      }

      const allData = {
        ...data,
        apiKey: this.apiKey,
      } as unknown as Record<string, string>;

      const signature = this.generateSignature(allData);
      const formData = new URLSearchParams({
        ...allData,
        s: signature,
      });

      const response =
        await this.axiosInstance.get<FlowTransactionsReceivedByDateResponse>(
          '/payment/getTransactions?' + formData.toString(),
        );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new TransactionsReceivedByDateError((error as Error).message);
    }
  }
}

export default FlowClient;
