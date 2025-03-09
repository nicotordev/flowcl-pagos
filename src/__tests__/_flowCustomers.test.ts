// import FlowCustomers from '../clients/flow.customers';
// import {
//   FlowCreateCustomerRequest,
//   FlowCreateCustomerResponse,
//   FlowRegisterCardRequest,
//   FlowRegisterCardResponse,
//   FlowRegisterCardStatusResponse,
//   FlowDeleteCardResponse,
//   FlowSendChargeRequest,
//   FlowSendChargeResponse,
//   FlowReverseChargeCardRequest,
//   FlowReverseChargeCardResponse,
//   FlowListChargesRequest,
//   FlowListChargesResponse,
// } from '../types/flow';

// import 'dotenv/config';

// const API_KEY = process.env.FLOW_API_KEY!;
// const SECRET_KEY = process.env.FLOW_SECRET_KEY!;
// const BASE_URL = process.env.FLOW_BASE_URL!;

// describe('FlowCustomers API Integration Tests', () => {
//   let flowCustomers: FlowCustomers;
//   let createdCustomer: FlowCreateCustomerResponse | null = null;
//   let registeredCard: FlowRegisterCardResponse | null = null;
//   let lastCharge: FlowSendChargeResponse | null = null;

//   beforeAll(() => {
//     flowCustomers = new FlowCustomers(API_KEY, SECRET_KEY, BASE_URL);
//   });

//   test('Debe crear un cliente en Flow', async () => {
//     const requestData: FlowCreateCustomerRequest = {
//       name: 'Nicolas Torres',
//       email: 'nicotordev@gmail.com',
//       externalId: new Date().getTime().toString(),
//     };

//     const response = await flowCustomers.create(requestData);
//     createdCustomer = response;

//     console.log('Cliente Creado:', response);
//     expect(response.customerId).toBeDefined();
//   });

//   test('Debe registrar una tarjeta para el cliente', async () => {
//     if (!createdCustomer) throw new Error('Cliente no creado en test anterior');

//     const requestData: FlowRegisterCardRequest = {
//       customerId: createdCustomer.customerId,
//       url_return: 'https://example.com/return',
//     };

//     const response = await flowCustomers.card.register(requestData);
//     registeredCard = response;

//     console.log('Registro de Tarjeta:', response);
//     expect(response.token).toBeDefined();
//     expect(response.redirectUrl).toContain('https://sandbox.flow.cl');
//   });

//   test('Debe verificar el estado del registro de tarjeta', async () => {
//     if (!registeredCard)
//       throw new Error('Tarjeta no registrada en test anterior');

//     const response: FlowRegisterCardStatusResponse =
//       await flowCustomers.card.status(registeredCard.token);

//     console.log('Estado de la Tarjeta:', response);
//     expect(response.status).toBeDefined();
//     expect(response.customerId).toBe(createdCustomer!.customerId);
//   });

//   test('Debe eliminar una tarjeta registrada', async () => {
//     if (!createdCustomer) throw new Error('Cliente no creado en test anterior');

//     const response: FlowDeleteCardResponse =
//       await flowCustomers.card.deleteCard(createdCustomer.customerId);

//     console.log('Tarjeta Eliminada:', response);
//     expect(response.customerId).toBe(createdCustomer.customerId);
//   });

//   test('Debe enviar un cobro a un cliente', async () => {
//     if (!createdCustomer) throw new Error('Cliente no creado en test anterior');

//     const requestData: FlowSendChargeRequest = {
//       customerId: createdCustomer.customerId,
//       commerceOrder: 'ORDER-TEST-5678',
//       subject: 'Cobro Test Real',
//       amount: 7000,
//       urlConfirmation: 'https://nicotordev.com/confirm',
//       urlReturn: 'https://nicotordev.com/return',
//     };

//     const response: FlowSendChargeResponse =
//       await flowCustomers.card.sendCharge(requestData);
//     lastCharge = response;

//     console.log('Cobro Enviado:', response);
//     expect(response.flowOrder).toBeDefined();
//     expect(response.status).toBe(1);
//   });

//   test('Debe reversar un cobro', async () => {
//     if (!lastCharge) throw new Error('No hay un cobro para reversar');

//     const requestData: FlowReverseChargeCardRequest = {
//       flowOrder: lastCharge.flowOrder,
//     };

//     const response: FlowReverseChargeCardResponse =
//       await flowCustomers.card.reverseCharge(requestData);

//     console.log('Cobro Reversado:', response);
//     expect(response.status).toBeDefined();
//   });

//   test('Debe listar los cobros de un cliente', async () => {
//     if (!createdCustomer) throw new Error('Cliente no creado en test anterior');

//     const requestData: FlowListChargesRequest = {
//       customerId: createdCustomer.customerId,
//       start: 0,
//       limit: 5,
//     };

//     const response: FlowListChargesResponse =
//       await flowCustomers.card.listCharges(requestData);

//     console.log('Lista de Cobros:', response);
//     expect(response.total).toBeGreaterThanOrEqual(0);
//   });
// });
