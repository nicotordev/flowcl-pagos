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
  FlowPaymentStatusResponse,
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
       * Obtiene el estado de un pago utilizando su token.
       * @param token Token único del pago a consultar.
       * @returns Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
       * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
       * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
       */
      byToken: (token: string) => Promise<FlowPaymentStatusResponse>;

      /**
       * Obtiene el estado de un pago utilizando el identificador de comercio.
       * @param commerceId Identificador único del comercio asignado al pago.
       * @returns Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
       * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
       * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
       */
      byCommerceId: (commerceId: string) => Promise<FlowPaymentStatusResponse>;

      /**
       * Obtiene el estado de un pago utilizando el número de orden de Flow.
       * @param flowOrder Número de orden de Flow asignado al pago.
       * @returns Una promesa que resuelve con la respuesta de Flow sobre el estado del pago.
       * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
       * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
       */
      byFlowOrderNumber: (
        flowOrder: number,
      ) => Promise<FlowPaymentStatusResponse>;
    };
    list: (
      data: FlowPaymentsReceivedByDateRequest,
    ) => Promise<FlowPaymentsReceivedByDateResponse>;
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
      list: this.getPaymentsReceivedByDate.bind(this),
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
      const response = await this.axiosInstance.get<FlowPaymentStatusResponse>(
        '/payment/getStatus?' + formData.toString(),
      );
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

      const response = await this.axiosInstance.get<FlowPaymentStatusResponse>(
        '/payment/getPaymentStatusByCommerceId?' + formData.toString(),
      );
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

      const response = await this.axiosInstance.get<FlowPaymentStatusResponse>(
        '/payment/getStatusByFlowOrder?' + formData.toString(),
      );
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
}

export default FlowClient;
