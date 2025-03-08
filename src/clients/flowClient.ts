/**
 * Cliente para interactuar con la API de Flow.
 * Permite crear órdenes de pago y consultar su estado.
 * Implementa un sistema de errores personalizados para un mejor manejo de fallos.
 */
import axios, { AxiosInstance } from 'axios';
import CryptoJS from 'crypto-js';

import {
  FlowCreatePaymentRequest,
  FlowCreatePaymentResponse,
  FlowPaymentStatusResponse,
} from '../types/flow';
import { getPaymentMethod, getPaymentStatus } from '../utils/flow.utils';
import {
  FlowAPIError,
  FlowAuthenticationError,
  FlowOrderCreationError,
  FlowPaymentStatusError,
} from '../errors';

class FlowClient {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;

  /**
   * Constructor de la clase FlowClient.
   * @param apiKey Clave de API proporcionada por Flow.
   * @param secretKey Clave secreta proporcionada por Flow.
   * @param enviroment Entorno de Flow ('sandbox' o 'production').
   * @throws FlowAuthenticationError Si no se proporciona apiKey o secretKey.
   */
  constructor(
    apiKey: string,
    secretKey: string,
    enviroment: 'sandbox' | 'production' = 'sandbox',
  ) {
    if (!apiKey || !secretKey) {
      throw new FlowAuthenticationError();
    }

    this.apiKey = apiKey;
    this.secretKey = secretKey;
    const baseURL =
      enviroment === 'sandbox'
        ? 'https://sandbox.flow.cl/api'
        : 'https://www.flow.cl/api';

    // Crear una instancia de Axios con la configuración base
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Genera una firma HMAC-SHA256 para asegurar la autenticidad de los datos enviados a Flow.
   * @param params Parámetros a firmar.
   * @returns Firma generada.
   */
  private generateSignature(params: any): string {
    const sortedKeys = Object.keys(params).sort(); // Ordenar las claves alfabéticamente
    let toSign = '';
    sortedKeys.forEach((key) => {
      toSign += key + params[key]; // Concatenar clave y valor
    });
    return CryptoJS.HmacSHA256(toSign, this.secretKey).toString(); // Generar firma
  }

  /**
   * Crea una orden de pago en Flow.
   * @param data Datos de la orden de pago (sin incluir apiKey y firma, ya que se agregan automáticamente).
   * @returns Respuesta de Flow con los detalles de la orden creada.
   * @throws FlowOrderCreationError Si ocurre un error en la creación de la orden.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   */
  async createOrder(
    data: Omit<FlowCreatePaymentRequest, 'apiKey' | 's'>,
  ): Promise<FlowCreatePaymentResponse> {
    try {
      const paymentMethod = getPaymentMethod(data.paymentMethod ?? 'flow');
      const allData = { ...data, apiKey: this.apiKey, paymentMethod }; // Agregar apiKey a los datos
      const signature = this.generateSignature(allData); // Generar firma
      const formData = new URLSearchParams({
        ...(allData as any),
        s: signature, // Agregar firma a los datos enviados
      });

      // Enviar solicitud POST a la API de Flow para crear el pago
      const response = await this.axiosInstance.post<FlowCreatePaymentResponse>(
        '/payment/create',
        formData,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowOrderCreationError((error as Error).message);
    }
  }

  /**
   * Obtiene el estado de un pago en Flow.
   * @param token Token del pago a consultar.
   * @returns Respuesta de Flow con el estado del pago.
   * @throws FlowPaymentStatusError Si ocurre un error al obtener el estado del pago.
   * @throws FlowAPIError Si la API de Flow responde con un error HTTP.
   */
  async getPaymentStatus(token: string): Promise<FlowPaymentStatusResponse> {
    try {
      const allData = { token, apiKey: this.apiKey }; // Agregar apiKey a los datos
      const signature = this.generateSignature(allData); // Generar firma
      const formData = new URLSearchParams({
        ...(allData as any),
        s: signature, // Agregar firma a los datos enviados
      });

      // Enviar solicitud GET a la API de Flow para obtener el estado del pago
      const response = await this.axiosInstance.get<FlowPaymentStatusResponse>(
        '/payment/getStatus?' + formData.toString(),
      );
      return {
        ...response.data,
        statusStr: getPaymentStatus(response.data.status),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new FlowAPIError(error.response?.status || 500, error.message);
      }
      throw new FlowPaymentStatusError((error as Error).message);
    }
  }
}

export default FlowClient;
