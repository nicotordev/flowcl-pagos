import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowGetLiquidationsByDateRangeError,
} from '../errors';
import { generateFormData } from '../utils/flow.utils';
import qs from 'qs';
import {
  FlowGetLiquidationByIdResponse,
  FlowGetLiquidationsByDateRangeRequest,
  FlowGetLiquidationsByDateRangeResponse,
} from '../types/flow';
/**
 * Permite obtener las liquidaciones de pagos efectuadas por Flow
 */
export default class FlowSettlements {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;
  /**
   * Este método se utiliza para obtener el(los) encabezado(s) de liquidación(es) dentro del rango de fechas ingresado (permite filtrar también por la moneda). Para obtener la liquidación completa (encabezado y detalles) utilizar el servicio /settlement/getByIdv2
   * @param {FlowGetSettlementHeadersByDateRangeRequest} data Datos de la petición.
   * @returns {Promise<FlowGetSettlementHeadersByDateRangeResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowGetLiquidationsByDateRangeError} Si hay problemas al realizar la petición.
   */
  public getLiquidationsByDateRange: (
    data: FlowGetLiquidationsByDateRangeRequest,
  ) => Promise<FlowGetLiquidationsByDateRangeResponse> =
    this._getLiquidationsByDateRange.bind(this);
  /**
   * Este método se utiliza para obtener el objeto Settlement correspondiente al identificador
   * @param {string} id Identificador de la liquidación.
   * @returns {Promise<FlowGetLiquidationByIdResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowGetLiquidationsByDateRangeError} Si hay problemas al realizar la petición.
   */
  public getLiquidationById: (
    id: string,
  ) => Promise<FlowGetLiquidationByIdResponse> =
    this._getLiquidationById.bind(this);
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
      baseURL: `${baseURL}/settlement`,
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
        throw new FlowAPIError(err.response?.status || 500, err.message);
      }
      error(err);
    }
  }
  /**
   * Este método se utiliza para obtener el(los) encabezado(s) de liquidación(es) dentro del rango de fechas ingresado (permite filtrar también por la moneda). Para obtener la liquidación completa (encabezado y detalles) utilizar el servicio /settlement/getByIdv2
   * @param {FlowGetSettlementHeadersByDateRangeRequest} data Datos de la petición.
   * @returns {Promise<FlowGetSettlementHeadersByDateRangeResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowGetLiquidationsByDateRangeError} Si hay problemas al realizar la petición.
   */
  private async _getLiquidationsByDateRange(
    data: FlowGetLiquidationsByDateRangeRequest,
  ): Promise<FlowGetLiquidationsByDateRangeResponse> {
    return this.request<FlowGetLiquidationsByDateRangeResponse>(
      '/search',
      data,
      'post',
      (err) => {
        throw new FlowGetLiquidationsByDateRangeError((err as Error).message);
      },
    );
  }
  /**
   * Este método se utiliza para obtener el objeto Settlement correspondiente al identificador
   * @param {string} id Identificador de la liquidación.
   * @returns {Promise<FlowGetLiquidationByIdResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowGetLiquidationsByDateRangeError} Si hay problemas al realizar la petición.
   */
  private async _getLiquidationById(
    id: string,
  ): Promise<FlowGetLiquidationByIdResponse> {
    return this.request<FlowGetLiquidationByIdResponse>(
      `/getByIdv2`,
      { id },
      'get',
      (err) => {
        throw new FlowGetLiquidationsByDateRangeError((err as Error).message);
      },
    );
  }
}
