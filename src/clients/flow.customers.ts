import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreateCustomerError,
  FlowDeleteCustomerError,
  FlowEditCustomerError,
  FlowGetCustomerError,
  FlowGetCustomerListError,
  FlowRegisterCardError,
  FlowRegisterCardStatusError,
} from '../errors';
import {
  FlowGetCustomerListResponse,
  FlowCreateCustomerRequest,
  FlowCreateCustomerResponse,
  FlowDeleteCustomerResponse,
  FlowEditCustomerRequest,
  FlowEditCustomerResponse,
  FlowGetCustomerListRequest,
  FlowGetCustomerResponse,
  FlowRegisterCardResponse,
  FlowRegisterCardRequest,
  FlowRegisterCardStatusResponse,
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
    /**
     * Permite editar un cliente existente. El servicio retorna el objeto cliente editado.
     * @param data FlowEditCustomerRequest Datos del cliente a editar. puede incluir email y nombre.
     * @returns Promise<FlowEditCustomerResponse> Objeto con la información del cliente editado.
     * @throws FlowCreateCustomerError Si hay problemas al crear el cliente.
     * @throws FlowAPIError Si hay problemas con la API de Flow.
     */
    edit: (data: FlowEditCustomerRequest) => Promise<FlowEditCustomerResponse>;
    /**
     * Permite eliminar un cliente. Para eliminar un cliente, este no debe tener suscripciones activas o importes pendientes de pago.
     * @param customerId Identificador del cliente a eliminar.
     * @returns Promise<FlowDeleteCustomerResponse> Objeto con la información del cliente eliminado.
     * @throws FlowCreateCustomerError Si hay problemas al crear el cliente.
     * @throws FlowAPIError Si hay problemas con la API de Flow.
     */
    delete: (customerId: string) => Promise<FlowDeleteCustomerResponse>;
    /**
     * Permite obtener los datos de un cliente en base a su customerId.
     * @param customerId Identificador del cliente a obtener.
     * @returns Promise<FlowGetCustomerResponse> Objeto con la información del cliente.
     * @throws FlowCreateCustomerError Si hay problemas al crear el cliente.
     * @throws FlowAPIError Si hay problemas con la API de Flow.
     */
    get: (customerId: string) => Promise<FlowGetCustomerResponse>;
    /**
     * Permite obtener la lista de clientes paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
     * filter: filtro por nombre del cliente
     * status: filtro por estado del cliente
     * @param data FlowGetCustomerListRequest Datos de la petición de la lista de clientes.
     * @returns Promise<FloeGetCustomerListResponse> Objeto con la información de la lista de clientes.
     * @throws FlowGetCustomerError Si hay problemas al obtener la lista de clientes.
     * @throws FlowAPIError Si hay problemas con la API de Flow.
     */
    list: (
      data: FlowGetCustomerListRequest,
    ) => Promise<FlowGetCustomerListResponse>;
    registerCard: {
      /**
       * Envía a un cliente a registrar su tarjeta de crédito para poder efectuarle cargos automáticos. El servicio responde con la URL para redirigir el browser del pagador y el token que identifica la transacción. La url de redirección se debe formar concatenando los valores recibidos en la respuesta de la siguiente forma:
       * url + "?token=" + token
       * @param data FlowRegisterCardRequest Datos de la petición de registro de tarjeta.
       * @returns Promise<FlowRegisterCardResponse> Objeto con la información de la transacción.
       * @throws FlowAPIError Si hay problemas con la API de Flow.
       * @throws FlowRegisterCardError Si hay problemas al registrar la tarjeta.
       */
      register: (
        data: FlowRegisterCardRequest,
      ) => Promise<FlowRegisterCardResponse>;
      /**
       * Este servicio retorna el resultado del registro de la tarjeta de crédito de un cliente.
       * @param token Token de la transacción de registro de tarjeta.
       * @returns Promise<FlowRegisterCardStatusResponse> Objeto con la información del registro de la tarjeta.
       * @throws FlowAPIError Si hay problemas con la API de Flow.
       * @throws FlowRegisterCardError Si hay problemas al registrar la tarjeta.
       */
      status: (token: string) => Promise<FlowRegisterCardStatusResponse>;
    };
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
      delete: this.deleteCustomer.bind(this),
      get: this.getCustomer.bind(this),
      list: this.getCustomerList.bind(this),
      registerCard: {
        register: this.registerCard.bind(this),
        status: this.registerCardStatus.bind(this),
      },
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
  /**
   * Permite eliminar un cliente. Para eliminar un cliente, este no debe tener suscripciones activas o importes pendientes de pago.
   * @param customerId Identificador del cliente a eliminar.
   * @returns Promise<FlowDeleteCustomerResponse> Objeto con la información del cliente eliminado.
   * @throws FlowCreateCustomerError Si hay problemas al crear el cliente.
   * @throws FlowAPIError Si hay problemas con la API de Flow.
   */
  private async deleteCustomer(
    customerId: string,
  ): Promise<FlowDeleteCustomerResponse> {
    try {
      const allData = { customerId, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const formData = generateFormData(allData, this.secretKey);

      const response = await this.axiosInstance.post<FlowEditCustomerResponse>(
        '/delete?' + formData.toString(),
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowDeleteCustomerError((error as Error).message);
    }
  }
  /**
   * Permite obtener los datos de un cliente en base a su customerId.
   * @param customerId Identificador del cliente a obtener.
   * @returns Promise<FlowGetCustomerResponse> Objeto con la información del cliente.
   * @throws FlowCreateCustomerError Si hay problemas al crear el cliente.
   * @throws FlowAPIError Si hay problemas con la API de Flow.
   */
  private async getCustomer(
    customerId: string,
  ): Promise<FlowGetCustomerResponse> {
    try {
      const allData = { customerId, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const formData = generateFormData(allData, this.secretKey);

      const response = await this.axiosInstance.get<FlowEditCustomerResponse>(
        '/get?' + formData.toString(),
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowGetCustomerError((error as Error).message);
    }
  }
  /**
   * Permite obtener la lista de clientes paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
   * filter: filtro por nombre del cliente
   * status: filtro por estado del cliente
   * @param data FlowGetCustomerListRequest Datos de la petición de la lista de clientes.
   * @returns Promise<FloeGetCustomerListResponse> Objeto con la información de la lista de clientes.
   * @throws FlowGetCustomerError Si hay problemas al obtener la lista de clientes.
   * @throws FlowAPIError Si hay problemas con la API de Flow.
   */
  private async getCustomerList(
    data: FlowGetCustomerListRequest,
  ): Promise<FlowGetCustomerListResponse> {
    try {
      const allData = { ...data, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const formData = generateFormData(allData, this.secretKey);

      const response =
        await this.axiosInstance.get<FlowGetCustomerListResponse>(
          '/list?' + formData.toString(),
        );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowGetCustomerListError((error as Error).message);
    }
  }
  /**
   * Envía a un cliente a registrar su tarjeta de crédito para poder efectuarle cargos automáticos. El servicio responde con la URL para redirigir el browser del pagador y el token que identifica la transacción. La url de redirección se debe formar concatenando los valores recibidos en la respuesta de la siguiente forma:
   * url + "?token=" + token
   * @param data FlowRegisterCardRequest Datos de la petición de registro de tarjeta.
   * @returns Promise<FlowRegisterCardResponse> Objeto con la información de la transacción.
   * @throws FlowAPIError Si hay problemas con la API de Flow.
   * @throws FlowRegisterCardError Si hay problemas al registrar la tarjeta.
   */
  private async registerCard(
    data: FlowRegisterCardRequest,
  ): Promise<FlowRegisterCardResponse> {
    try {
      const allData = { ...data, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const formData = generateFormData(allData, this.secretKey);

      const response = await this.axiosInstance.post<
        Omit<FlowRegisterCardResponse, 'redirectUrl'>
      >('/register?' + formData.toString());

      return {
        ...response.data,
        redirectUrl: `${response.data.url}?token=${response.data.token}`,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowRegisterCardError((error as Error).message);
    }
  }
  /**
   * Este servicio retorna el resultado del registro de la tarjeta de crédito de un cliente.
   * @param token Token de la transacción de registro de tarjeta.
   * @returns Promise<FlowRegisterCardStatusResponse> Objeto con la información del registro de la tarjeta.
   * @throws FlowAPIError Si hay problemas con la API de Flow.
   * @throws FlowRegisterCardError Si hay problemas al registrar la tarjeta.
   */
  private async registerCardStatus(
    token: string,
  ): Promise<FlowRegisterCardStatusResponse> {
    try {
      const allData = { token, apiKey: this.apiKey } as unknown as Record<
        string,
        string
      >;
      const formData = generateFormData(allData, this.secretKey);

      const response =
        await this.axiosInstance.post<FlowRegisterCardStatusResponse>(
          '/getRegisterStatus?' + formData.toString(),
        );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowRegisterCardStatusError((error as Error).message);
    }
  }
}
