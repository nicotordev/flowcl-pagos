import { FlowPayments } from '..';
import dotenv from 'dotenv';
import {
  FlowCreatePaymentRequest,
  FlowCreatePaymentByEmailRequest,
  FlowPaymentsReceivedByDateRequest,
  FlowTransactionsReceivedByDateRequest,
} from '../types/flow';
dotenv.config();

const API_KEY = process.env.FLOW_API_KEY!;
const SECRET_KEY = process.env.FLOW_SECRET_KEY!;
const BASE_URL = process.env.FLOW_BASE_URL!;

let flowPayments = new FlowPayments(API_KEY, SECRET_KEY, BASE_URL);

describe('FlowPayments API Integration Tests', () => {
  let token: string = '';
  test('Crear pago en Flow', async () => {
    const paymentData: FlowCreatePaymentRequest = {
      commerceOrder: Date.now().toString(),
      subject: 'Test de pago',
      amount: 1000,
      email: 'nicotordev@gmail.com',
      urlReturn: 'https://seguidoress.cl',
      urlConfirmation: 'https://seguidoress.cl/confirmation',
    };

    const response = await flowPayments.create(paymentData);
    console.log('Crear Pago:', response);
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('url');
    token = response.token;
  });

  test('Consultar estado de pago por token', async () => {
    const response = await flowPayments.status.byToken(token);
    console.log('Estado del pago:', response);
    expect(response).toHaveProperty('status');
  });

  test('Consultar pagos recibidos por fecha', async () => {
    const aDayBefore = new Date();
    aDayBefore.setDate(aDayBefore.getDate() - 1);
    const requestData: FlowPaymentsReceivedByDateRequest = {
      date: aDayBefore.toISOString().split('T')[0],
    };
    const response = await flowPayments.listPaymentsByDate(requestData);
    console.log('Pagos recibidos:', response);
    expect(response).toHaveProperty('total');
  });

  test('Consultar transacciones recibidas por fecha', async () => {
    const aDayBefore = new Date();
    aDayBefore.setDate(aDayBefore.getDate() - 1);
    const requestData: FlowTransactionsReceivedByDateRequest = {
      date: aDayBefore.toISOString().split('T')[0],
    };
    const response = await flowPayments.listTransactionsByDate(requestData);
    console.log('Transacciones recibidas:', response);
    expect(response).toHaveProperty('total');
  });

  test('Crear pago por email', async () => {
    const emailPaymentData: FlowCreatePaymentByEmailRequest = {
      commerceOrder: 'order-002',
      subject: 'Cobro por email',
      amount: 2000,
      email: 'testuser@example.com',
      urlReturn: 'https://www.google.com',
      urlConfirmation: 'https://www.google.com',
    };

    const response = await flowPayments.createByEmail(emailPaymentData);
    console.log('Pago por email:', response);
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('url');
  });
});
