import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreateAdditionalSubscriptionItemError,
  FlowDeleteAdditionalSubscriptionItemError,
  FlowEditAdditionalSubscriptionItemError,
  FlowGetAdditionalSubscriptionItemError,
  FlowListAdditionalSubscriptionItemError,
} from '../errors';
import { generateFormData } from '../utils/flow.utils';
import {
  FlowCreateAdditionalSubscriptionItemRequest,
  FlowCreateAdditionalSubscriptionItemResponse,
  FlowDeleteAdditionalSubscriptionItemResponse,
  FlowEditAdditionalSubscriptionItemRequest,
  FlowEditAdditionalSubscriptionItemResponse,
  FlowGetAdditionalSubscriptionItemResponse,
  FlowListAdditionalSubscriptionItemRequest,
  FlowListAdditionalSubscriptionItemResponse,
} from '../types/flow';
import qs from 'qs';
/**
 * Permite asociar items adicionales a suscripciones.
 */
export default class FlowSubscriptionsItems {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;
  /**
   * Este servicio permite obtener los datos de un item adicional de suscripción
   * @param {string} itemId ID del item adicional de suscripción.
   * @returns {Promise<getAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowCreateAdditionalSubscriptionItemError} Si hay problemas al obtener la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public get: (
    itemId: string,
  ) => Promise<FlowGetAdditionalSubscriptionItemResponse> =
    this.getAdditionalSubscriptionItem.bind(this);

  /**
   * Este servicio permite crear un nuevo item adicional de suscripción
   * @param {FlowCreateAdditionalSubscriptionItemRequest} data Datos de la suscripción adicional.
   * @returns {Promise<FlowCreateAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowCreateAdditionalSubscriptionItemError} Si hay problemas al crear la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public create: (
    data: FlowCreateAdditionalSubscriptionItemRequest,
  ) => Promise<FlowCreateAdditionalSubscriptionItemResponse> =
    this.createAdditionalSubscriptionItem.bind(this);
  /**
   * Este servicio permite editar un item adicional de suscripción. Se puede editar el nombre, tipo de ajuste, monto y definir si aplica para las suscripciones actuales o solo las futuras.
   * @param {FlowEditAdditionalSubscriptionItemRequest} data Datos de la suscripción adicional.
   * @returns {Promise<FlowEditAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowEditAdditionalSubscriptionItemError} Si hay problemas al editar la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public edit: (
    data: FlowEditAdditionalSubscriptionItemRequest,
  ) => Promise<FlowEditAdditionalSubscriptionItemResponse> =
    this.editAdditionalSubscriptionItem.bind(this);
  /**
   * Este servicio permite eliminar un item adicional de suscripción. Eliminar un item adicional de suscripción posee 2 tipos de eliminación: solo para suscripciones futuras o para todas las suscripciones que actualmente poseen asociado este item.
   * @param {string} itemId ID del item adicional de suscripción.
   * @param {'to_future' | 'all'} changeType Tipo de eliminación.
   * @returns {Promise<FlowDeleteAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowDeleteAdditionalSubscriptionItemError} Si hay problemas al eliminar la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public delete: (
    itemId: string,
    changeType: 'to_future' | 'all',
  ) => Promise<FlowDeleteAdditionalSubscriptionItemResponse> =
    this.deleteAdditionalSubscriptionItem.bind(this);
  /**
   * Este servicio permite la lista de items adicionales de suscripción
   * @param {FlowListAdditionalSubscriptionItemRequest} data Datos de la suscripción adicional.
   * @returns {Promise<FlowListAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowListAdditionalSubscriptionItemError} Si hay problemas al listar la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   *
   */
  public list: (
    data: FlowListAdditionalSubscriptionItemRequest,
  ) => Promise<FlowListAdditionalSubscriptionItemResponse> =
    this.listAdditionalSubscriptionItem.bind(this);

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
      baseURL: `${baseURL}/subscription_item`,
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
   * Este servicio permite crear un nuevo item adicional de suscripción
   * @param {FlowCreateAdditionalSubscriptionItemRequest} data Datos de la suscripción adicional.
   * @returns {Promise<FlowCreateAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowCreateAdditionalSubscriptionItemError} Si hay problemas al crear la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public async createAdditionalSubscriptionItem(
    data: FlowCreateAdditionalSubscriptionItemRequest,
  ): Promise<FlowCreateAdditionalSubscriptionItemResponse> {
    return this.request<FlowCreateAdditionalSubscriptionItemResponse>(
      '/create',
      data,
      'post',
      (e) => {
        throw new FlowCreateAdditionalSubscriptionItemError(
          (e as Error).message as string,
        );
      },
    );
  }
  /**
   * Este servicio permite obtener los datos de un item adicional de suscripción
   * @param {string} itemId ID del item adicional de suscripción.
   * @returns {Promise<getAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowCreateAdditionalSubscriptionItemError} Si hay problemas al obtener la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async getAdditionalSubscriptionItem(
    itemId: string,
  ): Promise<FlowGetAdditionalSubscriptionItemResponse> {
    return this.request<FlowGetAdditionalSubscriptionItemResponse>(
      `/get`,
      { itemId },
      'get',
      (e) => {
        throw new FlowGetAdditionalSubscriptionItemError(
          (e as Error).message as string,
        );
      },
    );
  }
  /**
   * Este servicio permite editar un item adicional de suscripción. Se puede editar el nombre, tipo de ajuste, monto y definir si aplica para las suscripciones actuales o solo las futuras.
   * @param {FlowEditAdditionalSubscriptionItemRequest} data Datos de la suscripción adicional.
   * @returns {Promise<FlowEditAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowEditAdditionalSubscriptionItemError} Si hay problemas al editar la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async editAdditionalSubscriptionItem(
    data: FlowEditAdditionalSubscriptionItemRequest,
  ): Promise<FlowEditAdditionalSubscriptionItemResponse> {
    return this.request<FlowEditAdditionalSubscriptionItemResponse>(
      '/edit',
      data,
      'post',
      (e) => {
        throw new FlowEditAdditionalSubscriptionItemError(
          (e as Error).message as string,
        );
      },
    );
  }
  /**
   * Este servicio permite eliminar un item adicional de suscripción. Eliminar un item adicional de suscripción posee 2 tipos de eliminación: solo para suscripciones futuras o para todas las suscripciones que actualmente poseen asociado este item.
   * @param {string} itemId ID del item adicional de suscripción.
   * @param {'to_future' | 'all'} changeType Tipo de eliminación.
   * @returns {Promise<FlowDeleteAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowDeleteAdditionalSubscriptionItemError} Si hay problemas al eliminar la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async deleteAdditionalSubscriptionItem(
    itemId: string,
    changeType: 'to_future' | 'all',
  ): Promise<FlowDeleteAdditionalSubscriptionItemResponse> {
    return this.request<FlowDeleteAdditionalSubscriptionItemResponse>(
      '/delete',
      { itemId, changeType },
      'post',
      (e) => {
        throw new FlowDeleteAdditionalSubscriptionItemError(
          (e as Error).message as string,
        );
      },
    );
  }
  /**
   * Este servicio permite la lista de items adicionales de suscripción
   * @param {FlowListAdditionalSubscriptionItemRequest} data Datos de la suscripción adicional.
   * @returns {Promise<FlowListAdditionalSubscriptionItemResponse>} Respuesta de la API.
   * @throws {FlowListAdditionalSubscriptionItemError} Si hay problemas al listar la suscripción adicional.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   *
   */
  private async listAdditionalSubscriptionItem(
    data: FlowListAdditionalSubscriptionItemRequest,
  ): Promise<FlowListAdditionalSubscriptionItemResponse> {
    return this.request<FlowListAdditionalSubscriptionItemResponse>(
      '/list',
      data,
      'get',
      (e) => {
        throw new FlowListAdditionalSubscriptionItemError(
          (e as Error).message as string,
        );
      },
    );
  }
}
