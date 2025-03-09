import axios, { AxiosInstance } from 'axios';
import { generateFormData } from '../utils/flow.utils';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreateAssociatedMerchantError,
  FlowDeleteAssociatedMerchantError,
} from '../errors';
import qs from 'qs';
import {
  FlowCreateAssociatedMerchantRequest,
  FlowCreateAssociatedMerchantResponse,
  FlowDeleteAssociatedMerchantResponse,
  FlowEditAssociatedMerchantRequest,
  FlowEditAssociatedMerchantResponse,
  FlowGetAssociatedMerchantResponse,
  FlowGetAssociatedMerchantsRequest,
  FlowGetAssociatedMerchantsResponse,
} from '../types/flow';
/**
 * Permite gestionar los comercios asociados
 *
 */
export default class FlowMerchant {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;

  public createAssociatedMerchant: (
    data: FlowCreateAssociatedMerchantRequest,
  ) => Promise<FlowCreateAssociatedMerchantResponse> =
    this._createAssociatedMerchant.bind(this);
  /**
   * Este método permite modificar un comercio asociado previamente creado en Flow
   * @param {FlowEditAssociatedMerchantRequest} data Datos del comercio asociado a modificar
   * @returns {Promise<FlowEditAssociatedMerchantResponse>} Respuesta de la API de Flow
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowCreateAssociatedMerchantError} Si hay problemas al modificar el comercio asociado.
   */
  public editAssociatedMerchant: (
    data: FlowEditAssociatedMerchantRequest,
  ) => Promise<FlowEditAssociatedMerchantResponse> =
    this._editAssociatedMerchant.bind(this);
  /**
   * Este método permite eliminar un comercio asociado previamente creado en Flow
   * @param {string} id ID del comercio asociado a eliminar
   * @returns {Promise<FlowDeleteAssociatedMerchantResponse>} Respuesta de la API de Flow
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowCreateAssociatedMerchantError} Si hay problemas al eliminar el comercio asociado.
   */
  public deleteAssociatedMerchant: (
    id: string,
  ) => Promise<FlowDeleteAssociatedMerchantResponse> =
    this._deleteAssociatedMerchant.bind(this);
  /**
   * Este método permite obtener la información de un comercio asociado previamente creado en Flow
   *
   */
  public getAssociatedMerchant: (
    id: string,
  ) => Promise<FlowGetAssociatedMerchantResponse> =
    this._getAssociatedMerchant.bind(this);
  /**
   * Permite obtener la lista de comercios paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
   * filter: filtro por nombre del comercio asociad
   * status: filtro por estado del comercio asociado
   * @param {FlowGetAssociatedMerchantsRequest} data Datos de la petición.
   * @returns {Promise<FlowGetAssociatedMerchantsResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowDeleteAssociatedMerchantError} Si hay problemas al realizar la petición.
   */
  public getAssociatedMerchants: (
    data: FlowGetAssociatedMerchantsRequest,
  ) => Promise<FlowGetAssociatedMerchantsResponse> =
    this._getAssociatedMerchants.bind(this);

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
      baseURL: `${baseURL}/merchant`,
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
  private async request<T>(
    endpoint: string,
    data: Record<string, unknown>,
    method: 'post' | 'get' = 'post',
    error: (err: unknown) => never,
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
        console.error(err.response?.data);
        throw new FlowAPIError(err.response?.status || 500, err.message);
      }
      error(err);
    }
  }
  /**
   * Este método permite crear un nuevo comercio asociado en Flow
   * @param {FlowCreateAssociatedMerchantRequest} data Datos del comercio asociado a crear
   * @returns {Promise<FlowCreateAssociatedMerchantRequest>} Respuesta de la API de Flow
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowCreateAssociatedMerchantError} Si hay problemas al crear el comercio asociado.
   */
  private async _createAssociatedMerchant(
    data: FlowCreateAssociatedMerchantRequest,
  ): Promise<FlowCreateAssociatedMerchantResponse> {
    return await this.request<FlowCreateAssociatedMerchantResponse>(
      '/create',
      data,
      'post',
      (er) => {
        throw new FlowCreateAssociatedMerchantError((er as Error).message);
      },
    );
  }
  /**
   * Este método permite modificar un comercio asociado previamente creado en Flow
   * @param {FlowEditAssociatedMerchantRequest} data Datos del comercio asociado a modificar
   * @returns {Promise<FlowEditAssociatedMerchantResponse>} Respuesta de la API de Flow
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowCreateAssociatedMerchantError} Si hay problemas al modificar el comercio asociado.
   */
  private async _editAssociatedMerchant(
    data: FlowEditAssociatedMerchantRequest,
  ): Promise<FlowEditAssociatedMerchantResponse> {
    return await this.request<FlowEditAssociatedMerchantResponse>(
      '/edit',
      data,
      'post',
      (er) => {
        throw new FlowCreateAssociatedMerchantError((er as Error).message);
      },
    );
  }
  /**
   * Este método permite eliminar un comercio asociado previamente creado en Flow
   * @param {string} id ID del comercio asociado a eliminar
   * @returns {Promise<FlowDeleteAssociatedMerchantResponse>} Respuesta de la API de Flow
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowCreateAssociatedMerchantError} Si hay problemas al eliminar el comercio asociado.
   */
  private async _deleteAssociatedMerchant(
    id: string,
  ): Promise<FlowDeleteAssociatedMerchantResponse> {
    return await this.request<FlowDeleteAssociatedMerchantResponse>(
      '/delete',
      { id },
      'post',
      (er) => {
        throw new FlowDeleteAssociatedMerchantError((er as Error).message);
      },
    );
  }
  /**
   * Este método permite obtener la información de un comercio asociado previamente creado en Flow
   *
   */
  private async _getAssociatedMerchant(
    id: string,
  ): Promise<FlowGetAssociatedMerchantResponse> {
    return await this.request<FlowGetAssociatedMerchantResponse>(
      '/get',
      { id },
      'get',
      (er) => {
        throw new FlowDeleteAssociatedMerchantError((er as Error).message);
      },
    );
  }
  /**
   * Permite obtener la lista de comercios paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
   * filter: filtro por nombre del comercio asociad
   * status: filtro por estado del comercio asociado
   * @param {FlowGetAssociatedMerchantsRequest} data Datos de la petición.
   * @returns {Promise<FlowGetAssociatedMerchantsResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowDeleteAssociatedMerchantError} Si hay problemas al realizar la petición.
   */
  public async _getAssociatedMerchants(
    data: FlowGetAssociatedMerchantsRequest,
  ): Promise<FlowGetAssociatedMerchantsResponse> {
    return await this.request<FlowGetAssociatedMerchantsResponse>(
      '/list',
      data,
      'get',
      (er) => {
        throw new FlowDeleteAssociatedMerchantError((er as Error).message);
      },
    );
  }
}
