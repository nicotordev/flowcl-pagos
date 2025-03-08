import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreateCustomerError,
  FlowDeleteCardError,
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
  FlowDeleteCardResponse,
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
    card: {
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
      /**
       * Este servicio permite eliminar el registro de la tarjeta de crédito de un cliente. Al eliminar el registro no se podrá hacer cargos automáticos y Flow enviará un cobro por email.
       * @param customerId Identificador del cliente.
       * @returns Promise<FlowDeleteCardResponse> Objeto con la información del registro de la tarjeta eliminado.
       * @throws FlowAPIError Si hay problemas con la API de Flow.
       * @throws FlowDeleteCardError Si hay problemas al eliminar el registro de la tarjeta.
       */
      delete: (customerId: string) => Promise<FlowDeleteCardResponse>;
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
      card: {
        register: this.registerCard.bind(this),
        status: this.registerCardStatus.bind(this),
        delete: this.deleteCard.bind(this),
      },
    };
  }
  /**
   * Realiza una petición a la API de Flow.
   * @param endpoint URL del endpoint de la API.
   * @param data Datos a enviar en la petición.
   * @param method Método de la petición (POST o GET).
   * @param errorParam Error a lanzar en caso de error.
   * @returns Promise<T> Respuesta de la API.
   * @throws FlowAPIError Si hay problemas con la API de Flow.
   * @throws Error Si hay problemas al realizar la petición.
   */
  private async request<T>(
    endpoint: string,
    data: Record<string, unknown>,
    method: 'post' | 'get' = 'post',
    error: () => never,
  ): Promise<T> {
    try {
      const allData = data as Record<string, string>;
      const formData = generateFormData(allData, this.secretKey);

      const response =
        method === 'post'
          ? await this.axiosInstance.post<T>(
              `${endpoint}?${formData.toString()}`,
            )
          : await this.axiosInstance.get<T>(
              `${endpoint}?${formData.toString()}`,
            );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new FlowAPIError(err.response?.status || 500, err.message);
      }
      error();
    }
  }

  /**
   * Crea un nuevo cliente en Flow.
   * @param data Datos del cliente a crear.
   * @returns Objeto con la información del cliente creado.
   * @throws FlowCreateCustomerError | FlowAPIError
   */
  private async createCustomer(
    data: FlowCreateCustomerRequest,
  ): Promise<FlowCreateCustomerResponse> {
    return await this.request<FlowCreateCustomerResponse>(
      '/create',
      data,
      'post',
      () => {
        throw new FlowCreateCustomerError('Error al crear el cliente.');
      },
    );
  }

  /**
   * Edita un cliente existente en Flow.
   * @param data Datos del cliente a editar.
   * @returns Objeto con la información del cliente editado.
   * @throws FlowEditCustomerError | FlowAPIError
   */
  private async editCustomer(
    data: FlowEditCustomerRequest,
  ): Promise<FlowEditCustomerResponse> {
    return await this.request<FlowEditCustomerResponse>(
      '/edit',
      data,
      'post',
      () => {
        throw new FlowEditCustomerError('Error al editar el cliente.');
      },
    );
  }

  /**
   * Elimina un cliente en Flow.
   * @param customerId Identificador del cliente a eliminar.
   * @returns Objeto con la información del cliente eliminado.
   * @throws FlowDeleteCustomerError | FlowAPIError
   */
  private async deleteCustomer(
    customerId: string,
  ): Promise<FlowDeleteCustomerResponse> {
    return await this.request<FlowDeleteCustomerResponse>(
      '/delete',
      { customerId },
      'post',
      () => {
        throw new FlowDeleteCustomerError('Error al eliminar el cliente.');
      },
    );
  }

  /**
   * Obtiene los datos de un cliente por su ID.
   * @param customerId Identificador del cliente.
   * @returns Objeto con la información del cliente.
   * @throws FlowGetCustomerError | FlowAPIError
   */
  private async getCustomer(
    customerId: string,
  ): Promise<FlowGetCustomerResponse> {
    return await this.request<FlowGetCustomerResponse>(
      '/get',
      { customerId },
      'get',
      () => {
        throw new FlowGetCustomerError('Error al obtener el cliente.');
      },
    );
  }

  /**
   * Obtiene una lista de clientes con paginación y filtros.
   * @param data Parámetros de paginación y filtro.
   * @returns Lista de clientes paginada.
   * @throws FlowGetCustomerListError | FlowAPIError
   */
  private async getCustomerList(
    data: FlowGetCustomerListRequest,
  ): Promise<FlowGetCustomerListResponse> {
    return await this.request<FlowGetCustomerListResponse>(
      '/list',
      data,
      'get',
      () => {
        throw new FlowGetCustomerListError(
          'Error al obtener la lista de clientes.',
        );
      },
    );
  }

  /**
   * Registra una tarjeta de crédito para un cliente en Flow.
   * @param data Datos de la solicitud de registro de tarjeta.
   * @returns Información de la transacción con URL de redirección.
   * @throws FlowRegisterCardError | FlowAPIError
   */
  private async registerCard(
    data: FlowRegisterCardRequest,
  ): Promise<FlowRegisterCardResponse> {
    const response = await this.request<
      Omit<FlowRegisterCardResponse, 'redirectUrl'>
    >('/register', data, 'post', () => {
      throw new FlowRegisterCardError('Error al registrar la tarjeta.');
    });
    return {
      ...response,
      redirectUrl: `${response.url}?token=${response.token}`,
    };
  }

  /**
   * Obtiene el estado del registro de tarjeta de un cliente.
   * @param token Token de la transacción.
   * @returns Estado del registro de la tarjeta.
   * @throws FlowRegisterCardStatusError | FlowAPIError
   */
  private async registerCardStatus(
    token: string,
  ): Promise<FlowRegisterCardStatusResponse> {
    return await this.request<FlowRegisterCardStatusResponse>(
      '/getRegisterStatus',
      { token },
      'post',
      () => {
        throw new FlowRegisterCardStatusError(
          'Error al obtener el estado de registro de la tarjeta.',
        );
      },
    );
  }

  /**
   * Elimina el registro de la tarjeta de crédito de un cliente.
   * @param customerId Identificador del cliente.
   * @returns Información del registro de tarjeta eliminado.
   * @throws FlowDeleteCardError | FlowAPIError
   */
  private async deleteCard(
    customerId: string,
  ): Promise<FlowDeleteCardResponse> {
    return await this.request<FlowDeleteCardResponse>(
      '/unRegister',
      { customerId },
      'post',
      () => {
        throw new FlowDeleteCardError('Error al eliminar la tarjeta.');
      },
    );
  }
}
