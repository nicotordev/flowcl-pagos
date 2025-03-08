import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreateCustomerError,
  FlowEditCustomerError,
} from '../errors';
import {
  FlowCreateCustomerRequest,
  FlowCreateCustomerResponse,
  FlowEditCustomerRequest,
  FlowEditCustomerResponse,
} from '../types/flow';
import { generateFormData } from '../utils/flow.utils';

/**
 * Cliente para interactuar con la API de clientes de Flow.
 * Permite realizar operaciones con clientes en Flow.
 */
export default class FlowCustomers {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;
  /**
   * Operaciones relacionadas con clientes
   */
  public customers: {
    /**
     * Permite crear un nuevo cliente. El servicio retorna el objeto cliente creado.
     * @param data FlowCreateCustomerRequest Datos del cliente a crear. Debe incluir email y nombre.
     * @returns Promise<FlowCreateCustomerResponse> Objeto con la información del cliente creado.
     * @throws FlowCreateCustomerError Si hay problemas al crear el cliente.
     * @throws FlowAPIError Si hay problemas con la API de Flow.
     */
    create: (
      data: FlowCreateCustomerRequest,
    ) => Promise<FlowCreateCustomerResponse>;
    edit: (data: FlowEditCustomerRequest) => Promise<FlowEditCustomerResponse>;
  };

  /**
   * Constructor de la clase FlowClient.
   * @param apiKey Clave de API proporcionada por Flow.
   * @param secretKey Clave secreta proporcionada por Flow.
   * @param baseURL URL base de la API de Flow.
   * @throws FlowAuthenticationError Si no se proporciona apiKey o secretKey.
   */
  constructor(apiKey: string, secretKey: string, baseURL: string) {
    if (!apiKey || !secretKey) {
      throw new FlowAuthenticationError();
    }

    this.apiKey = apiKey;
    this.secretKey = secretKey;
    // Crear una instancia de Axios con la configuración base
    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/customer`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.customers = {
      create: this.createCustomer.bind(this),
      edit: this.editCustomer.bind(this),
    };
  }
  /**
   * Permite crear un nuevo cliente. El servicio retorna el objeto cliente creado.
   * @param data FlowCreateCustomerRequest Datos del cliente a crear. Debe incluir email y nombre.
   * @returns Promise<FlowCreateCustomerResponse> Objeto con la información del cliente creado.
   * @throws FlowCreateCustomerError Si hay problemas al crear el cliente.
   * @throws FlowAPIError Si hay problemas con la API de Flow.
   */
  private async createCustomer(
    data: FlowCreateCustomerRequest,
  ): Promise<FlowCreateCustomerResponse> {
    try {
      const allData = { ...data, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const formData = generateFormData(allData, this.secretKey);

      const response =
        await this.axiosInstance.post<FlowCreateCustomerResponse>(
          '/create?' + formData.toString(),
        );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowCreateCustomerError((error as Error).message);
    }
  }
  /**
   * Permite editar un cliente existente. El servicio retorna el objeto cliente editado.
   * @param data FlowEditCustomerRequest Datos del cliente a editar. puede incluir email y nombre.
   * @returns Promise<FlowEditCustomerResponse> Objeto con la información del cliente editado.
   * @throws FlowCreateCustomerError Si hay problemas al crear el cliente.
   * @throws FlowAPIError Si hay problemas con la API de Flow.
   */
  private async editCustomer(
    data: FlowEditCustomerRequest,
  ): Promise<FlowEditCustomerResponse> {
    try {
      const allData = { ...data, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const formData = generateFormData(allData, this.secretKey);

      const response = await this.axiosInstance.post<FlowEditCustomerResponse>(
        '/edit?' + formData.toString(),
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowEditCustomerError((error as Error).message);
    }
  }
}
