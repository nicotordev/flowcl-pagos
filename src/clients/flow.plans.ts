import axios, { AxiosInstance } from 'axios';
import { FlowAPIError, FlowAuthenticationError } from '../errors';
import { generateFormData } from '../utils/flow.utils';

/**
 * Cliente para interactuar con la API de pagos de Flow.
 * Permite crear planes de suscripción.
 */
export default class FlowPlans {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;

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
      baseURL: `${baseURL}/payment`,
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
}
