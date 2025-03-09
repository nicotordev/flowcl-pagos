import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCancelRefundError,
  FlowCreateRefundError,
  FlowRefundStatusError,
} from '../errors';
import {
  FlowCancelRefundResponse,
  FlowCreateRefundRequest,
  FlowCreateRefundResponse,
  FlowRefundStatusResponse,
} from '../types/flow';
import { generateFormData } from '../utils/flow.utils';
import qs from 'qs';
/**
 * Cliente para interactuar con la API de reembolsos de Flow.
 * Permite realizar reembolsos en Flow.
 */
export default class FlowRefunds {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;

  /**
   * Objeto que proporciona métodos para interactuar con los reembolsos en Flow.
   */
  /**
   * Este servicio permite crear una orden de reembolso. Una vez que el receptor del reembolso acepte o rechaze el reembolso, Flow notificará vía POST a la página del comercio identificada en urlCallback pasando como parámetro token En esta página, el comercio debe invocar el servicio refund/getStatus para obtener el estado del reembolso.
   * @param {string} data FlowCreateRefundRequest con los datos del reembolso.
   * @returns {Promise<FlowCreateRefundResponse>} con la respuesta de Flow.
   * @throws {FlowAPIError} Si hay un error en la respuesta de la API.
   * @throws {FlowCreateRefundError} Si hay un error al crear el reembolso.
   */
  public create = this.createRefund.bind(this);
  /**
   * Este servicio permite cancelar una orden de reembolso pendiente
   * @param {string} token Token de la orden de reembolso
   * @returns {Promise<FlowCancelRefundResponse>} con la respuesta de Flow.
   * @throws {FlowAPIError} Si hay un error en la respuesta de la API.
   * @throws {FlowCancelRefundError} Si hay un error al cancelar el reembolso.
   */
  public cancel = this.cancelRefund.bind(this);
  /**
   * Este servicio permite obtener el estado de un reembolso.
   */
  public status = {
    /**
     * Permite obtener el estado de un reembolso solicitado. Este servicio se debe invocar desde la página del comercio que se señaló en el parámetro urlCallback del servicio refund/create.
     * @param {string} token Token de la orden de reembolso
     * @returns {Promise<FlowRefundStatusResponse>} con la respuesta de Flow.
     * @throws {FlowAPIError} Si hay un error en la respuesta de la API.
     * @throws {FlowRefundStatusError} Si hay un error al obtener el estado del reembolso.
     */
    byToken: this.getRefundStatus.bind(this),
  };

  /**
   * Constructor de la clase FlowClient.
   * @param {string} apiKey Clave de API proporcionada por Flow.
   * @param {string} secretKey Clave secreta proporcionada por Flow.
   * @param {string} baseURL URL base de la API de Flow.
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
      baseURL: `${baseURL}/refund`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  /**
   * Realiza una petición a la API de Flow.
   * @param {string} endpoint URL del endpoint de la API.
   * @param {Record<string, unknown>} data Datos a enviar en la petición.
   * @param {'post' | 'get'} method Método de la petición (POST o GET).
   * @param {(err: unknown) => never} error Error a lanzar en caso de error.
   * @returns {Promise<T>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {Error} Si hay problemas al realizar la petición.
   */
  private async request<T, P>(
    endpoint: string,
    data: Record<string, unknown>,
    method: 'post' | 'get' = 'post',
    error: (err: unknown) => never,
    modifyResponse?: (data: P) => P,
  ): Promise<T | P> {
    try {
      const allData = {
        ...data,
        apiKey: this.apiKey,
      } as Record<string, string>;
      const formData = generateFormData(allData, this.secretKey);
      const formDataSearchParams = new URLSearchParams(formData);
      const response =
        method === 'post'
          ? await this.axiosInstance.post<T>(
              `${endpoint}`,
              qs.stringify(formData),
            )
          : await this.axiosInstance.get<T>(
              `${endpoint}?${formDataSearchParams}`,
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
   * Este servicio permite crear una orden de reembolso. Una vez que el receptor del reembolso acepte o rechaze el reembolso, Flow notificará vía POST a la página del comercio identificada en urlCallback pasando como parámetro token En esta página, el comercio debe invocar el servicio refund/getStatus para obtener el estado del reembolso.
   * @param {FlowCreateRefundRequest} data con los datos del reembolso.
   * @returns {Promise<FlowCreateRefundResponse>} con la respuesta de Flow.
   * @throws {FlowAPIError} Si hay un error en la respuesta de la API.
   * @throws {FlowCreateRefundError} Si hay un error al crear el reembolso.
   */
  private async createRefund(
    data: FlowCreateRefundRequest,
  ): Promise<FlowCreateRefundResponse> {
    return await this.request('/create', data, 'post', (e) => {
      throw new FlowCreateRefundError((e as Error).message);
    });
  }
  /**
   * Este servicio permite cancelar una orden de reembolso pendiente
   * @param {string} token Token de la orden de reembolso
   * @returns {Promise<FlowCancelRefundResponse>} con la respuesta de Flow.
   * @throws {FlowAPIError} Si hay un error en la respuesta de la API.
   * @throws {FlowCancelRefundError} Si hay un error al cancelar el reembolso.
   */
  private async cancelRefund(token: string): Promise<FlowCancelRefundResponse> {
    return await this.request('/cancel', { token }, 'post', (e) => {
      throw new FlowCancelRefundError((e as Error).message);
    });
  }
  /**
   * Permite obtener el estado de un reembolso solicitado. Este servicio se debe invocar desde la página del comercio que se señaló en el parámetro urlCallback del servicio refund/create.
   * @param {string} token Token de la orden de reembolso
   * @returns {Promise<FlowRefundStatusResponse>} con la respuesta de Flow.
   * @throws {FlowAPIError} Si hay un error en la respuesta de la API.
   * @throws {FlowRefundStatusError} Si hay un error al obtener el estado del reembolso.
   */
  private async getRefundStatus(
    token: string,
  ): Promise<FlowRefundStatusResponse> {
    return await this.request('/getStatus', { token }, 'get', (e) => {
      throw new FlowRefundStatusError((e as Error).message);
    });
  }
}
