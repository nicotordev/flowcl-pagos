import axios, { AxiosInstance } from 'axios';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreatePlanError,
  FlowEditPlanError,
  FlowListPlansError,
} from '../errors';
import { generateFormData } from '../utils/flow.utils';
import {
  FlowCreatePlanRequest,
  FlowCreatePlanResponse,
  FlowDeletePlanResponse,
  FlowEditPlanRequest,
  FlowEditPlanResponse,
  FlowGetPlanResponse,
  FlowListPlansRequest,
  FlowListPlansResponse,
} from '../types/flow';

/**
 * Cliente para interactuar con la API de pagos de Flow.
 * Permite crear planes de suscripción.
 */
export default class FlowPlans {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;

  /**
   * Este servicio permite crear un nuevo Plan de Suscripción
   * @param {FlowCreatePlanRequest} data Datos para crear el plan.
   * @returns {Promise<FlowCreatePlanResponse>} Respuesta de la API.
   * @throws {FlowCreatePlanError} Si hay problemas al crear el plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public create: (
    data: FlowCreatePlanRequest,
  ) => Promise<FlowCreatePlanResponse> = this.createPlan.bind(this);

  /**
   * Este servicio permite obtener los datos de un Plan de Suscripción
   * @param {string} planId Identificador del plan.
   * @returns {Promise<FlowGetPlanResponse>} Respuesta de la API.
   * @throws {FlowCreatePlanError} Si hay problemas al obtener el plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public get: (planId: string) => Promise<FlowGetPlanResponse> =
    this.getPlan.bind(this);
  /**
   * Este servicio permite editar los datos de un Plan de Suscripción. Si el plan tiene clientes suscritos sólo se puede modificar el campo trial_period_days.
   * @param {FlowEditPlanRequest} data Datos para editar el plan.
   * @returns {Promise<FlowEditPlanResponse>} Respuesta de la API.
   * @throws {FlowEditPlanError} Si hay problemas al editar el plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public edit: (data: FlowEditPlanRequest) => Promise<FlowEditPlanResponse> =
    this.editPlan.bind(this);
  /**
   * Este servicio permite eliminar un Plan de Suscripción. El eliminar un Plan significa que ya no podrá suscribir nuevos clientes al plan. Pero las suscripciones activas continuarán su ciclo de vida mientras estas no sean cancelas.
   * @param {string} planId Identificador del plan.
   * @returns {Promise<FlowDeletePlanResponse>} Respuesta de la API.
   * @throws {FlowEditPlanError} Si hay problemas al eliminar el plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public delete: (planId: string) => Promise<FlowDeletePlanResponse> =
    this.deletePlan.bind(this);
  /**
   * Permite obtener la lista de planes de suscripción paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
   * filter: filtro por nombre del plan
   * status: filtro por estado del plan
   * @param {FlowListPlansRequest} data Datos para listar los planes.
   * @returns {Promise<FlowListPlansResponse>} Respuesta de la API.
   * @throws {FlowEditPlanError} Si hay problemas al listar los planes.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public list: (data: FlowListPlansRequest) => Promise<FlowListPlansResponse> =
    this.listPlans.bind(this);
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
      baseURL: `${baseURL}/plans`,
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
  /**
   * Este servicio permite crear un nuevo Plan de Suscripción
   * @param {FlowCreatePlanRequest} data Datos para crear el plan.
   * @returns {Promise<FlowCreatePlanResponse>} Respuesta de la API.
   * @throws {FlowCreatePlanError} Si hay problemas al crear el plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async createPlan(
    data: FlowCreatePlanRequest,
  ): Promise<FlowCreatePlanResponse> {
    return await this.request<FlowCreatePlanResponse, FlowCreatePlanResponse>(
      '/create',
      data,
      'post',
      (e) => {
        throw new FlowCreatePlanError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite obtener los datos de un Plan de Suscripción
   * @param {string} planId Identificador del plan.
   * @returns {Promise<FlowGetPlanResponse>} Respuesta de la API.
   * @throws {FlowCreatePlanError} Si hay problemas al obtener el plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async getPlan(planId: string): Promise<FlowGetPlanResponse> {
    return await this.request<FlowGetPlanResponse, FlowGetPlanResponse>(
      '/get',
      { planId },
      'get',
      (e) => {
        throw new FlowCreatePlanError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite editar los datos de un Plan de Suscripción. Si el plan tiene clientes suscritos sólo se puede modificar el campo trial_period_days.
   * @param {FlowEditPlanRequest} data Datos para editar el plan.
   * @returns {Promise<FlowEditPlanResponse>} Respuesta de la API.
   * @throws {FlowEditPlanError} Si hay problemas al editar el plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async editPlan(
    data: FlowEditPlanRequest,
  ): Promise<FlowEditPlanResponse> {
    return await this.request<FlowEditPlanResponse, FlowEditPlanResponse>(
      '/edit',
      { ...data },
      'post',
      (e) => {
        throw new FlowEditPlanError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite eliminar un Plan de Suscripción. El eliminar un Plan significa que ya no podrá suscribir nuevos clientes al plan. Pero las suscripciones activas continuarán su ciclo de vida mientras estas no sean cancelas.
   * @param {string} planId Identificador del plan.
   * @returns {Promise<FlowDeletePlanResponse>} Respuesta de la API.
   * @throws {FlowEditPlanError} Si hay problemas al eliminar el plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async deletePlan(planId: string): Promise<FlowDeletePlanResponse> {
    return await this.request<FlowEditPlanResponse, FlowEditPlanResponse>(
      '/delete',
      { planId },
      'post',
      (e) => {
        throw new FlowEditPlanError((e as Error).message);
      },
    );
  }
  /**
   * Permite obtener la lista de planes de suscripción paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
   * filter: filtro por nombre del plan
   * status: filtro por estado del plan
   * @param {FlowListPlansRequest} data Datos para listar los planes.
   * @returns {Promise<FlowListPlansResponse>} Respuesta de la API.
   * @throws {FlowEditPlanError} Si hay problemas al listar los planes.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async listPlans(
    data: FlowListPlansRequest,
  ): Promise<FlowListPlansResponse> {
    return await this.request<FlowListPlansResponse, FlowListPlansResponse>(
      '/list',
      { ...data },
      'get',
      (e) => {
        throw new FlowListPlansError((e as Error).message);
      },
    );
  }
}
