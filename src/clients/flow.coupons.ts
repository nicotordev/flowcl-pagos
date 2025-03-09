import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCreateDiscountCouponError,
  FlowDeleteDiscountCouponError,
  FlowEditDiscountCouponError,
  FlowGetDiscountCouponError,
  FlowListDiscountCouponsError,
} from '../errors';
import axios, { AxiosInstance } from 'axios';
import { generateFormData } from '../utils/flow.utils';
import qs from 'qs';
import {
  FlowEditDiscountCouponResponse,
  FlowCreateDiscountCouponRequest,
  FlowCreateDiscountCouponResponse,
  FlowEditDiscountCouponRequest,
  FlowDeleteDiscountCouponResponse,
  FlowGetDiscountCouponResponse,
  FlowListDiscountCouponsRequest,
  FlowListDiscountCouponsResponse,
} from '../types/flow';

/**
 * Permite crear cupones de descuento para ser aplicados a suscripciones o clientes
 */

export default class FlowCoupons {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;
  /**
   * Este servicio permite crear un cupón de descuento
   * @param {FlowCreateDiscountCouponRequest} data Datos para crear el cupón de descuento
   * @returns {Promise<FlowCreateDiscountCouponResponse>} Respuesta de la API
   * @throws {FlowCreateDiscountCouponError} Si hay problemas al crear el cupón de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  public create: (
    data: FlowCreateDiscountCouponRequest,
  ) => Promise<FlowCreateDiscountCouponResponse> =
    this.createDiscountCoupon.bind(this);

  /**
   * Este servicio permite editar un cupón de descuento. Sólo se puede editar el nombre de un cupón.
   * @param {FlowEditDiscountCouponRequest} data Datos para editar el cupón de descuento
   * @returns {Promise<FlowEditDiscountCouponResponse>} Respuesta de la API
   * @throws {FlowEditDiscountCouponError} Si hay problemas al editar el cupón de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  public edit: (
    data: FlowEditDiscountCouponRequest,
  ) => Promise<FlowEditDiscountCouponResponse> =
    this.editDiscountCoupon.bind(this);
  /**
   * Este servicio permite eliminar un cupón de descuento. Eliminar un cupón de descuento no elimina los descuentos aplicados a clientes o suscripciones, sólo no permite volver a aplicar este cupón
   * @param {string} couponId ID del cupón de descuento
   * @returns {Promise<FlowDeleteDiscountCouponResponse>} Respuesta de la API
   * @throws {FlowEditDiscountCouponError} Si hay problemas al eliminar el cupón de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  public delete: (
    couponId: string,
  ) => Promise<FlowDeleteDiscountCouponResponse> =
    this.deleteDiscountCoupon.bind(this);
  /**
   * Este servicio permite obtener los datos de un cupón de descuento
   * @param {string} couponId ID del cupón de descuento
   * @returns {Promise<FlowGetDiscountCouponResponse>} Respuesta de la API
   * @throws {FlowGetDiscountCouponError} Si hay problemas al obtener el cupón de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  public get: (couponId: string) => Promise<FlowGetDiscountCouponResponse> =
    this.getDiscountCoupon.bind(this);
  /**
   * Este servicio permite la lista de cupones de descuento
   * @param {FlowListDiscountCouponsRequest} data Datos para listar los cupones de descuento
   * @returns {Promise<FlowListDiscountCouponsResponse>} Respuesta de la API
   * @throws {FlowListDiscountCouponsError} Si hay problemas al listar los cupones de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  public list: (
    data: FlowListDiscountCouponsRequest,
  ) => Promise<FlowListDiscountCouponsResponse> =
    this.listDiscountCoupons.bind(this);

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
      baseURL: `${baseURL}/coupon`,
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
   * Este servicio permite crear un cupón de descuento
   * @param {FlowCreateDiscountCouponRequest} data Datos para crear el cupón de descuento
   * @returns {Promise<FlowCreateDiscountCouponResponse>} Respuesta de la API
   * @throws {FlowCreateDiscountCouponError} Si hay problemas al crear el cupón de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  private async createDiscountCoupon(
    data: FlowCreateDiscountCouponRequest,
  ): Promise<FlowCreateDiscountCouponResponse> {
    return await this.request<FlowCreateDiscountCouponResponse>(
      '/create',
      data,
      'post',
      (e) => {
        throw new FlowCreateDiscountCouponError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite editar un cupón de descuento. Sólo se puede editar el nombre de un cupón.
   * @param {FlowEditDiscountCouponRequest} data Datos para editar el cupón de descuento
   * @returns {Promise<FlowEditDiscountCouponResponse>} Respuesta de la API
   * @throws {FlowEditDiscountCouponError} Si hay problemas al editar el cupón de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  private async editDiscountCoupon(
    data: FlowEditDiscountCouponRequest,
  ): Promise<FlowEditDiscountCouponResponse> {
    return await this.request<FlowEditDiscountCouponResponse>(
      '/edit',
      data,
      'post',
      (e) => {
        throw new FlowEditDiscountCouponError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite eliminar un cupón de descuento. Eliminar un cupón de descuento no elimina los descuentos aplicados a clientes o suscripciones, sólo no permite volver a aplicar este cupón
   * @param {string} couponId ID del cupón de descuento
   * @returns {Promise<FlowDeleteDiscountCouponResponse>} Respuesta de la API
   * @throws {FlowEditDiscountCouponError} Si hay problemas al eliminar el cupón de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  private async deleteDiscountCoupon(
    couponId: string,
  ): Promise<FlowDeleteDiscountCouponResponse> {
    return await this.request<FlowDeleteDiscountCouponResponse>(
      '/delete',
      { couponId },
      'post',
      (e) => {
        throw new FlowDeleteDiscountCouponError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite obtener los datos de un cupón de descuento
   * @param {string} couponId ID del cupón de descuento
   * @returns {Promise<FlowGetDiscountCouponResponse>} Respuesta de la API
   * @throws {FlowGetDiscountCouponError} Si hay problemas al obtener el cupón de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  private async getDiscountCoupon(
    couponId: string,
  ): Promise<FlowGetDiscountCouponResponse> {
    return await this.request<FlowGetDiscountCouponResponse>(
      '/get',
      { couponId },
      'get',
      (e) => {
        throw new FlowGetDiscountCouponError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite la lista de cupones de descuento
   * @param {FlowListDiscountCouponsRequest} data Datos para listar los cupones de descuento
   * @returns {Promise<FlowListDiscountCouponsResponse>} Respuesta de la API
   * @throws {FlowListDiscountCouponsError} Si hay problemas al listar los cupones de descuento
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  private async listDiscountCoupons(
    data: FlowListDiscountCouponsRequest,
  ): Promise<FlowListDiscountCouponsResponse> {
    return await this.request<FlowListDiscountCouponsResponse>(
      '/list',
      data,
      'get',
      (e) => {
        throw new FlowListDiscountCouponsError((e as Error).message);
      },
    );
  }
}
