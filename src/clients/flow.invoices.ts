import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowCancelInvoicePendingPaymentError,
  FlowGetInvoiceDataError,
  FlowGetOverdueInvoicesError,
  FlowRecordExternalPaymentAndMarkInvoicePaidError,
  FlowRetryOverdueInvoicePaymentError,
} from '../errors';
import {
  generateFormData,
  isValidPaymentReceivedByDate,
} from '../utils/flow.utils';
import {
  FlowCancelInvoicePendingPaymentReponse,
  FlowGetInvoiceDataResponse,
  FlowGetOverdueInvoicesRequest,
  FlowGetOverdueInvoicesResponse,
  FlowRecordExternalPaymentAndMarkInvoicePaidRequest,
  FlowRecordExternalPaymentAndMarkInvoicePaidResponse,
  FlowRetryOverdueInvoicePaymentResponse,
} from '../types/flow';
/**
 * Este servicio permite obtener los datos de un Importe.
 */
export default class FlowInvoices {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;
  public get = {
    /**
     * Este servicio permite obtener los datos de un Importe.
     * @param invoiceId ID del Importe.
     * @returns {Promise<FlowGetInvoiceDataResponse>} Datos del Importe.
     * @throws {FlowGetInvoiceDataError} Si hay problemas al obtener los datos del Importe.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    normal: this.getInvoiceData.bind(this),
    /**
     * Este servicio permite obtener la lista de invoices vencidos, es decir, aquellos no pagados cuyo due_date este vencido.
     * @param {FlowGetOverdueInvoicesRequest} data  Datos para obtener los invoices vencidos.
     * @returns {Promise<FlowGetOverdueInvoicesResponse>} Lista de invoices vencidos.
     * @throws {FlowGetOverdueInvoicesError} Si hay problemas al obtener los invoices vencidos.
     * @throws {FlowAPIError} Si hay problemas con la API de Flow.
     */
    overdue: this.getOverdueInvoices.bind(this),
  };
  /**
   * Cancela un Importe (Invoice) pendiente de pago
   * @param invoiceId ID del Importe
   * @returns {Promise<FlowCancelInvoicePendingPaymentReponse>} Respuesta de la API
   * @throws {FlowCancelInvoicePendingPaymentError} Si hay problemas al cancelar el Importe
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  public cancelPendingPayment: (
    invoiceId: string,
  ) => Promise<FlowCancelInvoicePendingPaymentReponse> =
    this.cancelInvoicePendingPayment.bind(this);
  /**
   * Este servicio permite dar por pagado un Importe (Invoice) cuando el pago no se realiza por Flow.
   * @param {FlowRecordExternalPaymentAndMarkInvoicePaidRequest} data Datos para registrar el pago externo y marcar el Importe como pagado.
   * @returns {Promise<FlowRecordExternalPaymentAndMarkInvoicePaidResponse>} Respuesta de la API
   * @throws {FlowRecordExternalPaymentAndMarkInvoicePaidError} Si hay problemas al registrar el pago externo y marcar el Importe como pagado
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  public recordExternalPaymentAndMarkInvoicePaid: (
    data: FlowRecordExternalPaymentAndMarkInvoicePaidRequest,
  ) => Promise<FlowRecordExternalPaymentAndMarkInvoicePaidResponse> =
    this._recordExternalPaymentAndMarkInvoicePaid.bind(this);
  /**
   * Este servicio permite reintentar el cobro de un Invoice vencido.
   * @param invoiceId ID del Invoice.
   * @returns {Promise<FlowRetryOverdueInvoicePaymentResponse>} Respuesta de la API.
   * @throws {FlowRetryOverdueInvoicePaymentError} Si hay problemas al reintentar el cobro del Invoice.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  public retryOverdueInvoicePayment: (
    invoiceId: string,
  ) => Promise<FlowRetryOverdueInvoicePaymentResponse> =
    this._retryOverdueInvoicePayment.bind(this);
  /**
   * Constructor de la clase FlowClient.
   * @param {string} apiKey Clave de API proporcionada por Flow.
   * @param {string} secretKey Clave secreta proporcionada por Flow.
   * @param  {string}baseURL URL base de la API de Flow.
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
      baseURL: `${baseURL}/invoice`,
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
        console.log(err.response?.data);
        throw new FlowAPIError(err.response?.status || 500, err.message);
      }
      error(err);
    }
  }
  /**
   * Este servicio permite obtener los datos de un Importe.
   * @param invoiceId ID del Importe.
   * @returns {Promise<FlowGetInvoiceDataResponse>} Datos del Importe.
   * @throws {FlowGetInvoiceDataError} Si hay problemas al obtener los datos del Importe.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async getInvoiceData(
    invoiceId: string,
  ): Promise<FlowGetInvoiceDataResponse> {
    return await this.request<FlowGetInvoiceDataResponse>(
      `/get`,
      {
        invoiceId,
      },
      'get',
      (err) => {
        throw new FlowGetInvoiceDataError((err as Error).message);
      },
    );
  }
  /**
   * Cancela un Importe (Invoice) pendiente de pago
   * @param invoiceId ID del Importe
   * @returns {Promise<FlowCancelInvoicePendingPaymentReponse>} Respuesta de la API
   * @throws {FlowCancelInvoicePendingPaymentError} Si hay problemas al cancelar el Importe
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  private async cancelInvoicePendingPayment(
    invoiceId: string,
  ): Promise<FlowCancelInvoicePendingPaymentReponse> {
    return await this.request<FlowCancelInvoicePendingPaymentReponse>(
      '/cancel',
      {
        invoiceId,
      },
      'post',
      (e) => {
        throw new FlowCancelInvoicePendingPaymentError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite dar por pagado un Importe (Invoice) cuando el pago no se realiza por Flow.
   * @param {FlowRecordExternalPaymentAndMarkInvoicePaidRequest} data Datos para registrar el pago externo y marcar el Importe como pagado.
   * @returns {Promise<FlowRecordExternalPaymentAndMarkInvoicePaidResponse>} Respuesta de la API
   * @throws {FlowRecordExternalPaymentAndMarkInvoicePaidError} Si hay problemas al registrar el pago externo y marcar el Importe como pagado
   * @throws {FlowAPIError} Si hay problemas con la API de Flow
   */
  private async _recordExternalPaymentAndMarkInvoicePaid(
    data: FlowRecordExternalPaymentAndMarkInvoicePaidRequest,
  ): Promise<FlowRecordExternalPaymentAndMarkInvoicePaidResponse> {
    const date = data.date;

    const validatedDate = isValidPaymentReceivedByDate(date);

    if (!validatedDate) {
      throw new FlowRecordExternalPaymentAndMarkInvoicePaidError(
        'La fecha de pago no esta en formato YYYY-MM-DD',
      );
    }
    return await this.request<FlowRecordExternalPaymentAndMarkInvoicePaidResponse>(
      '/outsidePayment',
      data,
      'post',
      (e) => {
        throw new FlowRecordExternalPaymentAndMarkInvoicePaidError(
          (e as Error).message,
        );
      },
    );
  }
  /**
   * Este servicio permite obtener la lista de invoices vencidos, es decir, aquellos no pagados cuyo due_date este vencido.
   * @param {FlowGetOverdueInvoicesRequest} data  Datos para obtener los invoices vencidos.
   * @returns {Promise<FlowGetOverdueInvoicesResponse>} Lista de invoices vencidos.
   * @throws {FlowGetOverdueInvoicesError} Si hay problemas al obtener los invoices vencidos.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async getOverdueInvoices(
    data: FlowGetOverdueInvoicesRequest,
  ): Promise<FlowGetOverdueInvoicesResponse> {
    return this.request<FlowGetOverdueInvoicesResponse>(
      '/getOverDue',
      data,
      'get',
      (e) => {
        throw new FlowGetOverdueInvoicesError((e as Error).message);
      },
    );
  }
  /**
   * Este servicio permite reintentar el cobro de un Invoice vencido.
   * @param invoiceId ID del Invoice.
   * @returns {Promise<FlowRetryOverdueInvoicePaymentResponse>} Respuesta de la API.
   * @throws {FlowRetryOverdueInvoicePaymentError} Si hay problemas al reintentar el cobro del Invoice.
   * @throws {FlowAPIError} Si hay problemas con la API de Flow.
   */
  private async _retryOverdueInvoicePayment(invoiceId: string) {
    return this.request<FlowRetryOverdueInvoicePaymentResponse>(
      '/retryToCollect',
      {
        invoiceId,
      },
      'post',
      (e) => {
        throw new FlowRetryOverdueInvoicePaymentError((e as Error).message);
      },
    );
  }
}
