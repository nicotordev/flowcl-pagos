import axios, { AxiosInstance } from 'axios';
import { generateFormData } from '../utils/flow.utils';
import qs from 'qs';
import {
  FlowAddDiscountToSubscriptionError,
  FlowAddItemToSubscriptionError,
  FlowAPIError,
  FlowAuthenticationError,
  FlowCancelScheduledPlanChangeError,
  FlowCancelSubscriptionError,
  FlowChangeAssociatedPlanToSubscriptionError,
  FlowCreateSubscriptionToPlanError,
  FlowGetPlanSubscriptionsError,
  FlowGetSubscriptionBySubscriptionIdError,
  FlowPreviewSubscriptionPlanChangeError,
  FlowRemoveDiscountFromSubscriptionError,
  FlowRemoveItemFromSubscriptionError,
  FlowUpdateSubscriptionTrialDaysError,
} from '../errors';
import {
  FlowAddDiscountToSubscriptionResponse,
  FlowAddItemToSubscriptionResponse,
  FlowCancelScheduledPlanChangeResponse,
  FlowCancelSubscriptionResponse,
  FlowChangeAssociatedPlanToSubscriptionRequest,
  FlowChangeAssociatedPlanToSubscriptionResponse,
  FlowCreateSubscriptionToPlanRequest,
  FlowCreateSubscriptionToPlanResponse,
  FlowGetPlanSubscriptionsRequest,
  FlowGetPlanSubscriptionsResponse,
  FlowGetSubscriptionBySubscriptionIdResponse,
  FlowPreviewSubscriptionPlanChangeRequest,
  FlowPreviewSubscriptionPlanChangeResponse,
  FlowRemoveDiscountFromSubscriptionResponse,
  FlowRemoveItemFromSubscriptionResponse,
  FlowUpdateSubscriptionTrialDays,
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
   * Permite obtener la lista de suscripciones paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
   * filter: filtro por nombre del plan
   * status: filtro por estado de la suscripción.
   * @param {FlowGetPlanSubscriptionsRequest} data Datos para obtener las suscripciones.
   * @returns {Promise<FlowGetPlanSubscriptionsResponse>} Respuesta de la API.
   * @throws {FlowGetPlanSubscriptionsError} Si hay problemas al obtener las suscripciones.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public getPlanSubscriptions: (
    data: FlowGetPlanSubscriptionsRequest,
  ) => Promise<FlowGetPlanSubscriptionsResponse> =
    this._getPlanSubscriptions.bind(this);

  public update: {
    /**
     * Este servicio permite modificar los días de Trial de una suscripción. Sólo se puede modificar los días de Trial a una suscripción que aún no se ha iniciado o que todavía está vigente el Trial.
     * @param {string} subscriptionId ID de la suscripción.
     * @param {number} trial_period_days Días de prueba.
     * @returns {Promise<FlowUpdateSubscriptionTrialDays>} Respuesta de la API.
     * @throws {FlowUpdateSubscriptionTrialDaysError} Si hay problemas al actualizar los días de prueba.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    trialDays: (
      subscriptionId: string,
      trial_period_days: number,
    ) => Promise<FlowUpdateSubscriptionTrialDays>;
  } = {
    trialDays: this.updateSubscriptionTrialDays.bind(this),
  };
  /**
   * Este servicio permite cancelar una suscripción. Existen formas de cancelar una suscripción:
   * inmediatamente. Es decir, en este instante al terminar el perído vigente.
   * Si desea cancelar la suscripción inmediatamente, envíe el parámetro at_period_end con valor 0, si desea cancelarla al final del período vigente envíe el valor 1.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {number} at_period_end 0 para cancelar inmediatamente, 1 para cancelar al final del período vigente.
   * @returns {Promise<FlowCancelSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowCancelSubscriptionError} Si hay problemas al cancelar la suscripción.
   */
  public cancelSubscription: (
    subscriptionId: string,
    at_period_end: number,
  ) => Promise<FlowCancelSubscriptionResponse> =
    this._cancelSubscription.bind(this);
  /**
   * Este servicio permite agregar un descuento a la suscripción. Si la suscripción ya tenía un descuento, será reemplazado por este.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {string} couponId ID del cupón.
   * @returns {Promise<FlowAddDiscountToSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowAddDiscountToSubscription} Si hay problemas al agregar el descuento.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public addDiscountToSubscription: (
    subscriptionId: string,
    couponId: string,
  ) => Promise<FlowAddDiscountToSubscriptionResponse> =
    this._addDiscountToSubscription;

  /**
   * Este servicio permite eliminar el descuento que tenga la suscripción. El eliminar el descuento de la suscripción, no elimina el descuento que podría tenar asociado el cliente.
   * @param {string} subscriptionId ID de la suscripción.
   * @returns {Promise<FlowRemoveDiscountFromSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowRemoveDiscountFromSubscriptionError} Si hay problemas al eliminar el descuento.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public removeDiscountFromSubscription: (
    subscriptionId: string,
  ) => Promise<FlowRemoveDiscountFromSubscriptionResponse> =
    this._removeDiscountFromSubscription.bind(this);
  /**
   * Este servicio permite agregar un item adicional a la suscripción.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {string} itemId ID del item.
   * @returns {Promise<FlowAddItemToSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowAddItemToSubscriptionError} Si hay problemas al agregar el item.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public addItemToSubscription: (
    subscriptionId: string,
    itemId: string,
  ) => Promise<FlowAddItemToSubscriptionResponse> =
    this._addItemToSubscription.bind(this);

  /**
   * Este servicio permite eliminar un item adicional que este agregado en una suscripción.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {string} itemId ID del item.
   * @returns {Promise<FlowRemoveItemFromSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowRemoveItemFromSubscriptionError} Si hay problemas al eliminar el item.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public removeItemFromSubscription: (
    subscriptionId: string,
    itemId: string,
  ) => Promise<FlowRemoveItemFromSubscriptionResponse> =
    this._removeItemFromSubscription.bind(this);
  /**
   * Este servicio permite modificar el plan que esta asociado a una suscripción. Se puede modificar el plan de una suscripción ingresando de manera opcional una fecha asocial al cambio de plan. Esta fecha deberá estar en el rango del ciclo de facturación actual de la suscripción, y puede ser a futuro.
   * @param {FlowChangeAssociatedPlanToSubscriptionRequest} data Datos para cambiar el plan de la suscripción.
   * @returns {Promise<FlowChangeAssociatedPlanToSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowChangeAssociatedPlanToSubscriptionError} Si hay problemas al cambiar el plan de la suscripción.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public changeAssociatedPlanToSubscription: (
    data: FlowChangeAssociatedPlanToSubscriptionRequest,
  ) => Promise<FlowChangeAssociatedPlanToSubscriptionResponse> =
    this._changeAssociatedPlanToSubscription.bind(this);

  /**
   * Este servicio permite previsualizar el modificar un plan que esta asociado a una suscripción. Se puede modificar el plan de una suscripción ingresando de manera opcional una fecha asocial al cambio de plan. Esta fecha deberá estar en el rango del ciclo de facturación actual de la suscripción, y puede ser a futuro.
   * @param {FlowChangeAssociatedPlanToSubscriptionRequest} data Datos para cambiar el plan de la suscripción.
   * @returns {Promise<FlowChangeAssociatedPlanToSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowPreviewSubscriptionPlanChangeError} Si hay problemas al cambiar el plan de la suscripción.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public previewSubscriptionPlanChange: (
    data: FlowPreviewSubscriptionPlanChangeRequest,
  ) => Promise<FlowPreviewSubscriptionPlanChangeResponse> =
    this._previewSubscriptionPlanChange.bind(this);
  /**
   * Este servicio permite cancelar un cambio de plan que haya sido programado para una suscripción.
   * @param {string} subscriptionId ID de la suscripción.
   * @returns {Promise<FlowCancelScheduledPlanChangeResponse>} Respuesta de la API.
   * @throws {FlowCancelScheduledPlanChangeError} Si hay problemas al cancelar el cambio de plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public cancelScheduledPlanChange: (
    subscriptionId: string,
  ) => Promise<FlowCancelScheduledPlanChangeResponse> =
    this._cancelScheduledPlanChange.bind(this);

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
  /**
   * Permite obtener la lista de suscripciones paginada de acuerdo a los parámetros de paginación. Además, se puede definir los siguientes filtros:
   * filter: filtro por nombre del plan
   * status: filtro por estado de la suscripción.
   * @param {FlowGetPlanSubscriptionsRequest} data Datos para obtener las suscripciones.
   * @returns {Promise<FlowGetPlanSubscriptionsResponse>} Respuesta de la API.
   * @throws {FlowGetPlanSubscriptionsError} Si hay problemas al obtener las suscripciones.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async _getPlanSubscriptions(
    data: FlowGetPlanSubscriptionsRequest,
  ): Promise<FlowGetPlanSubscriptionsResponse> {
    return await this.request<FlowGetPlanSubscriptionsResponse>(
      '/list',
      data,
      'get',
      (err) => {
        throw new FlowGetPlanSubscriptionsError((err as Error).message);
      },
    );
  }
  /**
   * Este servicio permite modificar los días de Trial de una suscripción. Sólo se puede modificar los días de Trial a una suscripción que aún no se ha iniciado o que todavía está vigente el Trial.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {number} trial_period_days Días de prueba.
   * @returns {Promise<FlowUpdateSubscriptionTrialDays>} Respuesta de la API.
   * @throws {FlowUpdateSubscriptionTrialDaysError} Si hay problemas al actualizar los días de prueba.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async updateSubscriptionTrialDays(
    subscriptionId: string,
    trial_period_days: number,
  ): Promise<FlowUpdateSubscriptionTrialDays> {
    return await this.request<FlowUpdateSubscriptionTrialDays>(
      '/changeTrial',
      { subscriptionId, trial_period_days },
      'post',
      (err) => {
        throw new FlowUpdateSubscriptionTrialDaysError((err as Error).message);
      },
    );
  }
  /**
   * Este servicio permite cancelar una suscripción. Existen formas de cancelar una suscripción:
   * inmediatamente. Es decir, en este instante al terminar el perído vigente.
   * Si desea cancelar la suscripción inmediatamente, envíe el parámetro at_period_end con valor 0, si desea cancelarla al final del período vigente envíe el valor 1.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {number} at_period_end 0 para cancelar inmediatamente, 1 para cancelar al final del período vigente.
   * @returns {Promise<FlowCancelSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   * @throws {FlowCancelSubscriptionError} Si hay problemas al cancelar la suscripción.
   */
  private async _cancelSubscription(
    subscriptionId: string,
    at_period_end: number,
  ): Promise<FlowCancelSubscriptionResponse> {
    return await this.request<FlowCancelSubscriptionResponse>(
      '/cancel',
      { subscriptionId, at_period_end },
      'post',
      (err) => {
        throw new FlowCancelSubscriptionError((err as Error).message);
      },
    );
  }
  /**
   * Este servicio permite agregar un descuento a la suscripción. Si la suscripción ya tenía un descuento, será reemplazado por este.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {string} couponId ID del cupón.
   * @returns {Promise<FlowAddDiscountToSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowAddDiscountToSubscription} Si hay problemas al agregar el descuento.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async _addDiscountToSubscription(
    subscriptionId: string,
    couponId: string,
  ): Promise<FlowAddDiscountToSubscriptionResponse> {
    return await this.request<FlowAddDiscountToSubscriptionResponse>(
      '/addCoupon',
      { subscriptionId, couponId },
      'post',
      (err) => {
        throw new FlowAddDiscountToSubscriptionError((err as Error).message);
      },
    );
  }
  /**
   * Este servicio permite eliminar el descuento que tenga la suscripción. El eliminar el descuento de la suscripción, no elimina el descuento que podría tenar asociado el cliente.
   * @param {string} subscriptionId ID de la suscripción.
   * @returns {Promise<FlowRemoveDiscountFromSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowRemoveDiscountFromSubscriptionError} Si hay problemas al eliminar el descuento.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async _removeDiscountFromSubscription(
    subscriptionId: string,
  ): Promise<FlowRemoveDiscountFromSubscriptionResponse> {
    return await this.request<FlowRemoveDiscountFromSubscriptionResponse>(
      '/deleteCoupon',
      { subscriptionId },
      'post',
      (err) => {
        throw new FlowRemoveDiscountFromSubscriptionError(
          (err as Error).message,
        );
      },
    );
  }
  /**
   * Este servicio permite agregar un item adicional a la suscripción.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {string} itemId ID del item.
   * @returns {Promise<FlowAddItemToSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowAddItemToSubscriptionError} Si hay problemas al agregar el item.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async _addItemToSubscription(
    subscriptionId: string,
    itemId: string,
  ): Promise<FlowAddItemToSubscriptionResponse> {
    return await this.request<FlowAddItemToSubscriptionResponse>(
      '/addItem',
      { subscriptionId, itemId },
      'post',
      (err) => {
        throw new FlowAddItemToSubscriptionError((err as Error).message);
      },
    );
  }
  /**
   * Este servicio permite eliminar un item adicional que este agregado en una suscripción.
   * @param {string} subscriptionId ID de la suscripción.
   * @param {string} itemId ID del item.
   * @returns {Promise<FlowRemoveItemFromSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowRemoveItemFromSubscriptionError} Si hay problemas al eliminar el item.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async _removeItemFromSubscription(
    subscriptionId: string,
    itemId: string,
  ): Promise<FlowRemoveItemFromSubscriptionResponse> {
    return await this.request<FlowRemoveItemFromSubscriptionResponse>(
      '/deleteItem',
      { subscriptionId, itemId },
      'post',
      (err) => {
        throw new FlowRemoveItemFromSubscriptionError((err as Error).message);
      },
    );
  }
  /**
   * Este servicio permite modificar el plan que esta asociado a una suscripción. Se puede modificar el plan de una suscripción ingresando de manera opcional una fecha asocial al cambio de plan. Esta fecha deberá estar en el rango del ciclo de facturación actual de la suscripción, y puede ser a futuro.
   * @param {FlowChangeAssociatedPlanToSubscriptionRequest} data Datos para cambiar el plan de la suscripción.
   * @returns {Promise<FlowChangeAssociatedPlanToSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowChangeAssociatedPlanToSubscriptionError} Si hay problemas al cambiar el plan de la suscripción.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async _changeAssociatedPlanToSubscription(
    data: FlowChangeAssociatedPlanToSubscriptionRequest,
  ): Promise<FlowChangeAssociatedPlanToSubscriptionResponse> {
    return await this.request<FlowChangeAssociatedPlanToSubscriptionResponse>(
      '/changePlan',
      data,
      'post',
      (err) => {
        throw new FlowChangeAssociatedPlanToSubscriptionError(
          (err as Error).message,
        );
      },
    );
  }
  /**
   * Este servicio permite previsualizar el modificar un plan que esta asociado a una suscripción. Se puede modificar el plan de una suscripción ingresando de manera opcional una fecha asocial al cambio de plan. Esta fecha deberá estar en el rango del ciclo de facturación actual de la suscripción, y puede ser a futuro.
   * @param {FlowChangeAssociatedPlanToSubscriptionRequest} data Datos para cambiar el plan de la suscripción.
   * @returns {Promise<FlowChangeAssociatedPlanToSubscriptionResponse>} Respuesta de la API.
   * @throws {FlowPreviewSubscriptionPlanChangeError} Si hay problemas al cambiar el plan de la suscripción.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   *
   */
  private async _previewSubscriptionPlanChange(
    data: FlowPreviewSubscriptionPlanChangeRequest,
  ): Promise<FlowPreviewSubscriptionPlanChangeResponse> {
    return await this.request<FlowPreviewSubscriptionPlanChangeResponse>(
      '/changePlanPreview',
      data,
      'post',
      (err) => {
        throw new FlowPreviewSubscriptionPlanChangeError(
          (err as Error).message,
        );
      },
    );
  }
  /**
   * Este servicio permite cancelar un cambio de plan que haya sido programado para una suscripción.
   * @param {string} subscriptionId ID de la suscripción.
   * @returns {Promise<FlowCancelScheduledPlanChangeResponse>} Respuesta de la API.
   * @throws {FlowCancelScheduledPlanChangeError} Si hay problemas al cancelar el cambio de plan.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   *
   */
  private async _cancelScheduledPlanChange(
    subscriptionId: string,
  ): Promise<FlowCancelScheduledPlanChangeResponse> {
    return await this.request<FlowCancelScheduledPlanChangeResponse>(
      '/changePlanCancel',
      { subscriptionId },
      'post',
      (err) => {
        throw new FlowCancelScheduledPlanChangeError((err as Error).message);
      },
    );
  }
}
