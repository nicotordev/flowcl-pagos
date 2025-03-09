import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowChargeCardError,
  FlowCreateCustomerError,
  FlowDeleteCardError,
  FlowDeleteCustomerError,
  FlowEditCustomerError,
  FlowGetCustomerError,
  FlowGetCustomerListError,
  FlowListChargesCardError,
  FlowListFailedChargesCardError,
  FlowListPaginatedSubscriptionsError,
  FlowMassiveChargeCardStatusError,
  FlowRegisterCardError,
  FlowRegisterCardStatusError,
  FlowReverseChargeCardError,
  FlowSendChargeCardError,
  FlowSendMassiveChargeCardError,
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
  FlowChargeCardRequest,
  FlowChargeCardResponse,
  FlowSendChargeRequest,
  FlowSendChargeResponse,
  FlowSendMassiveChargeCardRequest,
  FlowSendMassiveChargeCardResponse,
  FlowMassiveChargeCardStatusResponse,
  FlowReverseChargeCardRequest,
  FlowReverseChargeCardResponse,
  FlowListChargesResponse,
  FlowListChargesRequest,
  FlowListFailedChargesResponse,
  FlowListFailedChargesRequest,
  FlowListPaginatedSubscriptionsRequest,
  FlowListPaginatedSubscriptionsResponse,
} from '../types/flow';
import { generateFormData, getPaymentMethod } from '../utils/flow.utils';

import qs from 'qs';

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
  /**
   * Crea un nuevo cliente en Flow.
   * @param {FlowCreateCustomerRequest} data Datos del cliente a crear.
   * @returns {Promise<FlowCreateCustomerResponse>} Objeto con la información del cliente creado.
   * @throws {FlowCreateCustomerError}
   * @throws {FlowAPIError}
   */
  public create = this.createCustomer.bind(this);
  /**
   * Edita un cliente existente en Flow.
   * @param {FlowEditCustomerRequest} data Datos del cliente a editar.
   * @returns {Promise<FlowEditCustomerResponse>} Objeto con la información del cliente editado.
   * @throws {FlowEditCustomerError}¿
   * @throws {FlowAPIError}
   */
  public edit = this.editCustomer.bind(this);
  /**
   * Elimina un cliente en Flow.
   * @param {string} customerId Identificador del cliente a eliminar.
   * @returns {Promise<FlowDeleteCustomerResponse>} Objeto con la información del cliente eliminado.
   * @throws {FlowDeleteCustomerError}
   * @throws {FlowAPIError}
   */
  public delete = this.deleteCustomer.bind(this);
  /**
   * Permite obtener los datos de un cliente en base a su customerId.
   * @param {string} customerId Identificador del cliente a obtener.
   * @returns {Promise<FlowGetCustomerResponse>} Objeto con la información del cliente.
   * @throws {FlowCreateCustomerError} Si hay problemas al crear el cliente.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public get = this.getCustomer.bind(this);
  /**
   * Permite obtener la lista de clientes paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
   * filter: filtro por nombre del cliente
   * status: filtro por estado del cliente
   * @param {FlowGetCustomerListRequest} data Datos de la petición de la lista de clientes.
   * @returns {Promise<FloeGetCustomerListResponse>} Objeto con la información de la lista de clientes.
   * @throws {FlowGetCustomerError} Si hay problemas al obtener la lista de clientes.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public list = this.getCustomerList.bind(this);
  public card = {
    /**
     * Registra una tarjeta de crédito para un cliente en Flow.
     * @param {FlowRegisterCardRequest} data Datos de la solicitud de registro de tarjeta.
     * @returns {Promise<FlowRegisterCardResponse>} Información de la transacción con URL de redirección.
     * @throws {FlowRegisterCardError}
     * @throws {FlowAPIError}
     */
    register: this.registerCard.bind(this),
    /**
     * Obtiene el estado del registro de tarjeta de un cliente.
     * @param {string} token Token de la transacción.
     * @returns {Promise<FlowRegisterCardStatusResponse> } Estado del registro de la tarjeta.
     * @throws {FlowRegisterCardStatusError}
     * @throws {FlowAPIError}
     */
    status: this.registerCardStatus.bind(this),
    /**
     * Elimina el registro de la tarjeta de crédito de un cliente.
     * @param {string} customerId Identificador del cliente.
     * @returns {Promise<FlowDeleteCardResponse>} Información del registro de tarjeta eliminado.
     * @throws {FlowDeleteCardError} Si hay problemas al eliminar el registro de la tarjeta.
     * @throws {FlowDeleteCardError} Si hay problemas al eliminar el registro de la tarjeta.
     */
    deleteCard: this.deleteCard.bind(this),
    /**
     * Este servicio permite efectuar un cargo automático en la tarjeta de crédito previamente registrada por el cliente. Si el cliente no tiene registrada una tarjeta el metodo retornará error.
     * @param {FlowChargeCardRequest} data Datos de la petición de cargo.
     * @returns {Promise<FlowChargeCardResponse>} Objeto con la información del cargo.
     * @throws {FlowChargeCardError} Si hay problemas al realizar el cargo.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    charge: this.chargeCard.bind(this),
    /**
     * Este servicio envía un cobro a un cliente. Si el cliente tiene registrada una tarjeta de crédito se le hace un cargo automático, si no tiene registrada una tarjeta de credito se genera un cobro. Si se envía el parámetro byEmail = 1, se genera un cobro por email.
     * @param {FlowSendChargeRequest} data Datos de la petición de cargo.
     * @returns {Promise<FlowSendChargeResponse>} Objeto con la información del cargo.
     * @throws {FlowSendChargeCardError} Si hay problemas al realizar el cargo.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    sendCharge: this.sendChargeCard.bind(this),
    /**
     * Este servicio envía de forma masiva un lote de cobros a clientes. Similar al servicio collect pero masivo y asíncrono. Este servicio responde con un token identificador del lote y el número de filas recibidas.
     * @param {FlowSendMassiveChargeCardRequest} data Datos de la petición de cargo masivo.
     * @returns {Promise<FlowSendMassiveChargeCardResponse>} Objeto con la información del cargo masivo.
     * @throws {FlowSendMassiveChargeCardError} Si hay problemas al realizar el cargo.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    sendMassiveCharge: this.sendMassiveChargeCard.bind(this),
    /**
     * Este servicio permite consultar el estado de un lote de cobros enviados por medio del servicio batchCollect.
     * @param {string} token Token del lote de cobros.
     * @returns {Promise<FlowMassiveChargeCardStatusResponse>} Objeto con la información del estado del lote de cobros.
     * @throws {FlowMassiveChargeCardStatusError} Si hay problemas al ver el estado del lote de cobros.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    massiveChargeStatus: this.massiveChargeCardStatus.bind(this),
    /**
     * Este servicio permite reversar un cargo previamente efectuado a un cliente. Para que el cargo se reverse, este servicio debe ser invocado dentro de las 24 horas siguientes a efectuado el cargo, las 24 horas rigen desde las 14:00 hrs, es decir, si el cargo se efectuó a las 16:00 hrs, este puede reversarse hasta las 14:00 hrs del día siguiente.\n\n Puede enviar como parámetros el commerceOrder o el flowOrder.
     * @param {FlowReverseChargeCardRequest} data Datos de la petición de reversa.
     * @returns {Promise<FlowReverseChargeCardResponse>} Objeto con la información de la reversa.
     * @throws {FlowReverseChargeCardError} Si hay problemas al realizar la reversa.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     *
     */
    reverseCharge: this.reverseChargeCard.bind(this),
    /**
     * Este servicio obtiene la lista paginada de los cargos efectuados a un cliente.
     * @param {FlowListChargesRequest} data Datos de la petición de lista de cargos.
     * @returns {Promise<FlowListChargesResponse>} Objeto con la información de la lista de cargos.
     * @throws {FlowListChargesCardError} Si hay problemas al listar los cargos.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     *
     */
    listCharges: this.listChargeCard.bind(this),
    /**
     * Este servicio obtiene la lista paginada de los intentos de cargos fallidos a un cliente.
     * @param {FlowListFailedChargesRequest} data Datos de la petición de lista de cargos fallidos.
     * @returns {Promise<FlowListFailedChargesResponse>} Objeto con la información de la lista de cargos fallidos.
     * @throws {FlowListFailedChargesCardError} Si hay problemas al listar los cargos fallidos.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    listFailedCharges: this.listFailedChargesCard.bind(this),
  };
  /**
   * Operaciones relacionadas con las suscripciones de un cliente.
   */
  subscriptions = {
    /**
     * Este servicio obtiene la lista paginada de las suscripciones de un cliente.
     * @param {FlowListPaginatedSubscriptionsRequest} data  Datos de la petición de lista de suscripciones.
     * @returns {Promise<FlowListPaginatedSubscriptionsResponse>} Objeto con la información de la lista de suscripciones.
     * @throws {FlowListPaginatedSubscriptionsError} Si hay problemas al listar las suscripciones.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    listPaginated: this.listPaginatedSubscriptions.bind(this),
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
  }
  /**
   * Realiza una petición a la API de Flow.
   * @param {string} endpoint URL del endpoint de la API.
   * @param {string} data Datos a enviar en la petición.
   * @param {string} method Método de la petición (POST o GET).
   * @param {(err: unknown) => never} error - Error a lanzar en caso de error.
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
   * Crea un nuevo cliente en Flow.
   * @param {FlowCreateCustomerRequest} data Datos del cliente a crear.
   * @returns {Promise<FlowCreateCustomerResponse>} Objeto con la información del cliente creado.
   * @throws {FlowCreateCustomerError}
   * @throws {FlowAPIError}
   */
  private async createCustomer(
    data: FlowCreateCustomerRequest,
  ): Promise<FlowCreateCustomerResponse> {
    return await this.request<FlowCreateCustomerResponse>(
      '/create',
      data,
      'post',
      (e) => {
        throw new FlowCreateCustomerError((e as Error).message);
      },
    );
  }

  /**
   * Edita un cliente existente en Flow.
   * @param {FlowEditCustomerRequest} data Datos del cliente a editar.
   * @returns {Promise<FlowEditCustomerResponse>} Objeto con la información del cliente editado.
   * @throws {FlowEditCustomerError}¿
   * @throws {FlowAPIError}
   */
  private async editCustomer(
    data: FlowEditCustomerRequest,
  ): Promise<FlowEditCustomerResponse> {
    return await this.request<FlowEditCustomerResponse>(
      '/edit',
      data,
      'post',
      (e) => {
        throw new FlowEditCustomerError((e as Error).message);
      },
    );
  }

  /**
   * Elimina un cliente en Flow.
   * @param {string} customerId Identificador del cliente a eliminar.
   * @returns {Promise<FlowDeleteCustomerResponse>} Objeto con la información del cliente eliminado.
   * @throws {FlowDeleteCustomerError}
   * @throws {FlowAPIError}
   */
  private async deleteCustomer(
    customerId: string,
  ): Promise<FlowDeleteCustomerResponse> {
    return await this.request<FlowDeleteCustomerResponse>(
      '/delete',
      { customerId },
      'post',
      (e) => {
        throw new FlowDeleteCustomerError((e as Error).message);
      },
    );
  }

  /**
   * Obtiene los datos de un cliente por su ID.
   * @param {string} customerId Identificador del cliente.
   * @returns {Promise<FlowGetCustomerResponse>} Objeto con la información del cliente.
   * @throws {FlowGetCustomerError}
   * @throws {FlowAPIError}
   */
  private async getCustomer(
    customerId: string,
  ): Promise<FlowGetCustomerResponse> {
    return await this.request<FlowGetCustomerResponse>(
      '/get',
      { customerId },
      'get',
      (e) => {
        throw new FlowGetCustomerError((e as Error).message);
      },
    );
  }

  /**
   * Obtiene una lista de clientes con paginación y filtros.
   * @param {FlowGetCustomerListRequest} data Parámetros de paginación y filtro.
   * @returns {Promise<FlowGetCustomerListResponse>} Lista de clientes paginada.
   * @throws {FlowGetCustomerListError}
   * @throws {FlowAPIError}
   */
  private async getCustomerList(
    data: FlowGetCustomerListRequest,
  ): Promise<FlowGetCustomerListResponse> {
    return await this.request<FlowGetCustomerListResponse>(
      '/list',
      data,
      'get',
      (e) => {
        throw new FlowGetCustomerListError((e as Error).message);
      },
    );
  }

  /**
   * Registra una tarjeta de crédito para un cliente en Flow.
   * @param {FlowRegisterCardRequest} data Datos de la solicitud de registro de tarjeta.
   * @returns {Promise<FlowRegisterCardResponse>} Información de la transacción con URL de redirección.
   * @throws {FlowRegisterCardError}
   * @throws {FlowAPIError}
   */
  private async registerCard(
    data: FlowRegisterCardRequest,
  ): Promise<FlowRegisterCardResponse> {
    const response = await this.request<
      Omit<FlowRegisterCardResponse, 'redirectUrl'>
    >('/register', data, 'post', (e) => {
      throw new FlowRegisterCardError((e as Error).message);
    });
    return {
      ...response,
      redirectUrl: `${response.url}?token=${response.token}`,
    };
  }

  /**
   * Obtiene el estado del registro de tarjeta de un cliente.
   * @param {string} token Token de la transacción.
   * @returns {Promise<FlowRegisterCardStatusResponse> } Estado del registro de la tarjeta.
   * @throws {FlowRegisterCardStatusError}
   * @throws {FlowAPIError}
   */
  private async registerCardStatus(
    token: string,
  ): Promise<FlowRegisterCardStatusResponse> {
    return await this.request<FlowRegisterCardStatusResponse>(
      '/getRegisterStatus',
      { token },
      'post',
      (e) => {
        throw new FlowRegisterCardStatusError((e as Error).message);
      },
    );
  }

  /**
   * Elimina el registro de la tarjeta de crédito de un cliente.
   * @param {string} customerId Identificador del cliente.
   * @returns {Promise<FlowDeleteCardResponse>} Información del registro de tarjeta eliminado.
   * @throws {FlowDeleteCardError} Si hay problemas al eliminar el registro de la tarjeta.
   * @throws {FlowDeleteCardError} Si hay problemas al eliminar el registro de la tarjeta.
   */
  private async deleteCard(
    customerId: string,
  ): Promise<FlowDeleteCardResponse> {
    return await this.request<FlowDeleteCardResponse>(
      '/unRegister',
      { customerId },
      'post',
      (e) => {
        throw new FlowDeleteCardError((e as Error).message);
      },
    );
  }

  /**
   * Este servicio permite efectuar un cargo automático en la tarjeta de crédito previamente registrada por el cliente. Si el cliente no tiene registrada una tarjeta el metodo retornará error.
   * @param {FlowChargeCardRequest} data Datos de la petición de cargo.
   * @returns {Promise<FlowChargeCardResponse>} Objeto con la información del cargo.
   * @throws {FlowChargeCardError} Si hay problemas al realizar el cargo.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async chargeCard(
    data: FlowChargeCardRequest,
  ): Promise<FlowChargeCardResponse> {
    return await this.request<FlowChargeCardResponse>(
      '/charge',
      data,
      'post',
      (e) => {
        throw new FlowChargeCardError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio envía un cobro a un cliente. Si el cliente tiene registrada una tarjeta de crédito se le hace un cargo automático, si no tiene registrada una tarjeta de credito se genera un cobro. Si se envía el parámetro byEmail = 1, se genera un cobro por email.
   * @param {FlowSendChargeRequest} data Datos de la petición de cargo.
   * @returns {Promise<FlowSendChargeResponse>} Objeto con la información del cargo.
   * @throws {FlowSendChargeCardError} Si hay problemas al realizar el cargo.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async sendChargeCard(
    data: FlowSendChargeRequest,
  ): Promise<FlowSendChargeResponse> {
    return await this.request<FlowSendChargeResponse>(
      '/collect',
      {
        ...data,
        paymentMethod: getPaymentMethod(data.paymentMethod ?? 'flow'),
      },
      'post',
      (e) => {
        throw new FlowSendChargeCardError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio envía de forma masiva un lote de cobros a clientes. Similar al servicio collect pero masivo y asíncrono. Este servicio responde con un token identificador del lote y el número de filas recibidas.
   * @param {FlowSendMassiveChargeCardRequest} data Datos de la petición de cargo masivo.
   * @returns {Promise<FlowSendMassiveChargeCardResponse>} Objeto con la información del cargo masivo.
   * @throws {FlowSendMassiveChargeCardError} Si hay problemas al realizar el cargo.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async sendMassiveChargeCard(
    data: FlowSendMassiveChargeCardRequest,
  ): Promise<FlowSendMassiveChargeCardResponse> {
    return await this.request<FlowSendMassiveChargeCardResponse>(
      '/batchCollect',
      {
        ...data,
        batchRows: data.batchRows.map((row) => ({
          ...row,
          paymentMethod: getPaymentMethod(row.paymentMethod ?? 'flow'),
        })),
      },
      'post',
      (e) => {
        throw new FlowSendMassiveChargeCardError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite consultar el estado de un lote de cobros enviados por medio del servicio batchCollect.
   * @param {string} token Token del lote de cobros.
   * @returns {Promise<FlowMassiveChargeCardStatusResponse>} Objeto con la información del estado del lote de cobros.
   * @throws {FlowMassiveChargeCardStatusError} Si hay problemas al ver el estado del lote de cobros.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async massiveChargeCardStatus(
    token: string,
  ): Promise<FlowMassiveChargeCardStatusResponse> {
    return await this.request<FlowMassiveChargeCardStatusResponse>(
      '/getBatchCollectStatus',
      { token },
      'get',
      (e) => {
        throw new FlowMassiveChargeCardStatusError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite reversar un cargo previamente efectuado a un cliente. Para que el cargo se reverse, este servicio debe ser invocado dentro de las 24 horas siguientes a efectuado el cargo, las 24 horas rigen desde las 14:00 hrs, es decir, si el cargo se efectuó a las 16:00 hrs, este puede reversarse hasta las 14:00 hrs del día siguiente.\n\n Puede enviar como parámetros el commerceOrder o el flowOrder.
   * @param {FlowReverseChargeCardRequest} data Datos de la petición de reversa.
   * @returns {Promise<FlowReverseChargeCardResponse>} Objeto con la información de la reversa.
   * @throws {FlowReverseChargeCardError} Si hay problemas al realizar la reversa.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   *
   */
  private async reverseChargeCard(
    data: FlowReverseChargeCardRequest,
  ): Promise<FlowReverseChargeCardResponse> {
    return await this.request<FlowReverseChargeCardResponse>(
      '/reverseCharge',
      data,
      'post',
      (e) => {
        throw new FlowReverseChargeCardError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio obtiene la lista paginada de los cargos efectuados a un cliente.
   * @param {FlowListChargesRequest} data Datos de la petición de lista de cargos.
   * @returns {Promise<FlowListChargesResponse>} Objeto con la información de la lista de cargos.
   * @throws {FlowListChargesCardError} Si hay problemas al listar los cargos.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   *
   */
  private async listChargeCard(
    data: FlowListChargesRequest,
  ): Promise<FlowListChargesResponse> {
    return await this.request<FlowListChargesResponse>(
      '/getCharges',
      data,
      'get',
      (e) => {
        throw new FlowListChargesCardError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio obtiene la lista paginada de los intentos de cargos fallidos a un cliente.
   * @param {FlowListFailedChargesRequest} data Datos de la petición de lista de cargos fallidos.
   * @returns {Promise<FlowListFailedChargesResponse>} Objeto con la información de la lista de cargos fallidos.
   * @throws {FlowListFailedChargesCardError} Si hay problemas al listar los cargos fallidos.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async listFailedChargesCard(
    data: FlowListFailedChargesRequest,
  ): Promise<FlowListFailedChargesResponse> {
    return await this.request<FlowListChargesResponse>(
      '/getChargeAttemps',
      data,
      'get',
      (e) => {
        throw new FlowListFailedChargesCardError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio obtiene la lista paginada de las suscripciones de un cliente.
   * @param {FlowListPaginatedSubscriptionsRequest} data  Datos de la petición de lista de suscripciones.
   * @returns {Promise<FlowListPaginatedSubscriptionsResponse>} Objeto con la información de la lista de suscripciones.
   * @throws {FlowListPaginatedSubscriptionsError} Si hay problemas al listar las suscripciones.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async listPaginatedSubscriptions(
    data: FlowListPaginatedSubscriptionsRequest,
  ): Promise<FlowListPaginatedSubscriptionsResponse> {
    return await this.request<FlowListChargesResponse>(
      '/getSubscriptions',
      data,
      'get',
      (e) => {
        throw new FlowListPaginatedSubscriptionsError((e as Error).message);
      },
    );
  }
}
