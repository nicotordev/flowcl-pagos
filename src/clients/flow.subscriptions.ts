import axios, { AxiosInstance } from 'axios';
import { generateFormData } from '../utils/flow.utils';
import qs from 'qs';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreateSubscriptionToPlanError,
  FlowGetSubscriptionBySubscriptionIdError,
} from '../errors';
import {
  FlowCreateSubscriptionToPlanRequest,
  FlowCreateSubscriptionToPlanResponse,
  FlowGetSubscriptionBySubscriptionIdResponse,
} from '../types/flow';
/**
 * Cliente para interactuar con la API de pagos de Flow.
 * Permite suscribir clientes a un plan de suscripción.
 */
export default class FlowSubscriptions {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;
  /**
   * Este servicio permite crear una nueva suscripción de un cliente a un Plan. Para crear una nueva suscripción, basta con enviar los parámetros planId y customerId
   * @param {FlowCreateSubscriptionToPlanRequest} data Datos para crear la suscripción.
   * @returns {Promise<FlowCreateSubscriptionToPlanResponse>} Respuesta de la API.
   * @throws {FlowCreateSubscriptionToPlanError} Si hay problemas al crear la suscripción.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public createToPlan: (
    data: FlowCreateSubscriptionToPlanRequest,
  ) => Promise<FlowCreateSubscriptionToPlanResponse> =
    this.createSubscriptionToPlan.bind(this);

  public get: {
    /**
     * Este servicio permite obtener los datos de una suscripción.
     * @param {string} subscriptionId ID de la suscripción.
     * @returns {Promise<FlowGetSubscriptionBySubscriptionIdResponse>} Respuesta de la API.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     * @throws {FlowGetSubscriptionBySubscriptionIdError} Si hay problemas al obtener la suscripción.
     *
     */
    bySubscriptionId: (
      subscriptionId: string,
    ) => Promise<FlowGetSubscriptionBySubscriptionIdResponse>;
  } = {
    bySubscriptionId: this.getSubscriptionBySubscriptionId.bind(this),
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
      baseURL: `${baseURL}/subscription`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
  /**
   * Realiza una petición a la API de Flow.
   * @param {string} endpoint URL del endpoint de la API.
   * @param {string} data Datos a enviar en la petición.
   * @param {'post' | 'get'} method Método de la petición (POST o GET).
   * @param {(e: unknown) => never} error Error a lanzar en caso de error.
   * @returns {Promise<T>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {Error} Si hay problemas al realizar la petición.
   */
  private async request<T>(
    endpoint: string,
    data: Record<string, unknown>,
    method: 'post' | 'get' = 'post',
    error: (e: unknown) => never,
  ): Promise<T> {
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

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(JSON.stringify(err.response?.data, null, 2));
        throw new FlowAPIError(err.response?.status || 500, err.message);
      }
      error(err);
    }
  }
  /**
   * Este servicio permite crear una nueva suscripción de un cliente a un Plan. Para crear una nueva suscripción, basta con enviar los parámetros planId y customerId
   * @param {FlowCreateSubscriptionToPlanRequest} data Datos para crear la suscripción.
   * @returns {Promise<FlowCreateSubscriptionToPlanResponse>} Respuesta de la API.
   * @throws {FlowCreateSubscriptionToPlanError} Si hay problemas al crear la suscripción.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async createSubscriptionToPlan(
    data: FlowCreateSubscriptionToPlanRequest,
  ): Promise<FlowCreateSubscriptionToPlanResponse> {
    return await this.request<FlowCreateSubscriptionToPlanResponse>(
      '/create',
      data,
      'post',
      (err) => {
        throw new FlowCreateSubscriptionToPlanError((err as Error).message);
      },
    );
  }
  /**
   * Este servicio permite obtener los datos de una suscripción.
   * @param {string} subscriptionId ID de la suscripción.
   * @returns {Promise<FlowGetSubscriptionBySubscriptionIdResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowGetSubscriptionBySubscriptionIdError} Si hay problemas al obtener la suscripción.
   *
   */
  private async getSubscriptionBySubscriptionId(
    subscriptionId: string,
  ): Promise<FlowGetSubscriptionBySubscriptionIdResponse> {
    return await this.request<FlowCreateSubscriptionToPlanResponse>(
      '/get',
      { subscriptionId },
      'get',
      (err) => {
        throw new FlowGetSubscriptionBySubscriptionIdError(
          (err as Error).message,
        );
      },
    );
  }
}
