/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import CryptoJS from 'crypto-js';

import {
  FlowCreatePaymentRequest,
  FlowCreatePaymentResponse,
  FlowPaymentStatusResponse,
} from '../types/flow';

class FlowClient {
  private apiKey: string;
  private secretKey: string;
  private axiosInstance: AxiosInstance;

  /**
   * Constructor de la clase FlowClient.
   * @param apiKey Clave de API proporcionada por Flow.
   * @param secretKey Clave secreta proporcionada por Flow.
   * @param enviroment Entorno de Flow (sandbox o producción).
   */
  constructor(
    apiKey: string,
    secretKey: string,
    enviroment: 'sandbox' | 'production' = 'sandbox',
  ) {
    if (!apiKey || !secretKey) {
      throw new Error('API Key y Secret Key son requeridos');
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
   */
  async createOrder(
    data: Omit<FlowCreatePaymentRequest, 'apiKey' | 's'>,
  ): Promise<FlowCreatePaymentResponse> {
    try {
      const allData = { ...data, apiKey: this.apiKey }; // Agregar apiKey a los datos
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
      throw error; // Propagar error en caso de fallo
    }
  }

  /**
   * Obtiene el estado de un pago en Flow.
   * @param token Token del pago a consultar.
   * @returns Respuesta de Flow con el estado del pago.
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
      return response.data;
    } catch (error) {
      throw error; // Propagar error en caso de fallo
    }
  }
}

export default FlowClient;
