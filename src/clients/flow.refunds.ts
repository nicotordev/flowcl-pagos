import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCancelRefundError,
  FlowCreateRefundError,
} from '../errors';
import {
  FlowCancelRefundResponse,
  FlowCreateRefundRequest,
  FlowCreateRefundResponse,
} from '../types/flow';
import { generateSignature } from '../utils/flow.utils';

/**
 * Cliente para interactuar con la API de Flow.
 * Permite realizar reembolsos en Flow.
 */
export default class FlowRefunds {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;

  /**
   * Objeto que proporciona métodos para interactuar con los reembolsos en Flow.
   */
  public refunds: {
    /**
     * Este servicio permite crear una orden de reembolso. Una vez que el receptor del reembolso acepte o rechaze el reembolso, Flow notificará vía POST a la página del comercio identificada en urlCallback pasando como parámetro token En esta página, el comercio debe invocar el servicio refund/getStatus para obtener el estado del reembolso.
     * @param data FlowCreateRefundRequest con los datos del reembolso.
     * @returns Promise<FlowCreateRefundResponse> con la respuesta de Flow.
     * @throws FlowAPIError Si hay un error en la respuesta de la API.
     * @throws FlowCreateRefundError Si hay un error al crear el reembolso.
     */
    createRefund: (
      data: FlowCreateRefundRequest,
    ) => Promise<FlowCreateRefundResponse>;
    /**
     * Este servicio permite cancelar una orden de reembolso pendiente
     * @param token Token de la orden de reembolso
     * @returns Promise<FlowCancelRefundResponse> con la respuesta de Flow.
     * @throws FlowAPIError Si hay un error en la respuesta de la API.
     * @throws FlowCancelRefundError Si hay un error al cancelar el reembolso.
     */
    cancelRefund: (token: string) => Promise<FlowCancelRefundResponse>;
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
      baseURL: `${baseURL}/refund`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.refunds = {
      createRefund: this.createRefund.bind(this),
      cancelRefund: this.cancelRefund.bind(this),
    };
  }
  /**
   * Este servicio permite crear una orden de reembolso. Una vez que el receptor del reembolso acepte o rechaze el reembolso, Flow notificará vía POST a la página del comercio identificada en urlCallback pasando como parámetro token En esta página, el comercio debe invocar el servicio refund/getStatus para obtener el estado del reembolso.
   * @param data FlowCreateRefundRequest con los datos del reembolso.
   * @returns Promise<FlowCreateRefundResponse> con la respuesta de Flow.
   * @throws FlowAPIError Si hay un error en la respuesta de la API.
   * @throws FlowCreateRefundError Si hay un error al crear el reembolso.
   */
  private async createRefund(
    data: FlowCreateRefundRequest,
  ): Promise<FlowCreateRefundResponse> {
    try {
      const allData = { ...data, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const signature = generateSignature(allData, this.secretKey); // Generar firma
      const formData = new URLSearchParams({
        ...allData,
        s: signature, // Agregar firma a los datos enviados
      });

      // Realizar la petición POST a la API de Flow
      const response = await this.axiosInstance.get<FlowCreateRefundResponse>(
        '/create?' + formData.toString(),
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowCreateRefundError((error as Error).message);
    }
  }
  /**
   * Este servicio permite cancelar una orden de reembolso pendiente
   * @param token Token de la orden de reembolso
   * @returns Promise<FlowCancelRefundResponse> con la respuesta de Flow.
   * @throws FlowAPIError Si hay un error en la respuesta de la API.
   * @throws FlowCancelRefundError Si hay un error al cancelar el reembolso.
   */
  private async cancelRefund(token: string): Promise<FlowCancelRefundResponse> {
    try {
      const allData = { token, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const signature = generateSignature(allData, this.secretKey); // Generar firma
      const formData = new URLSearchParams({
        ...allData,
        s: signature, // Agregar firma a los datos enviados
      });

      // Realizar la petición POST a la API de Flow
      const response = await this.axiosInstance.get<FlowCreateRefundResponse>(
        '/cancel?' + formData.toString(),
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowCancelRefundError((error as Error).message);
    }
  }
}
