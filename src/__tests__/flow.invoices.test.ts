// /* eslint-disable no-console */
// import FlowInvoices from '../clients/flow.invoices';
// import { FlowRecordExternalPaymentAndMarkInvoicePaidRequest } from '../types/flow';
// // Para que Jest funcione con TypeScript, asegura que tengas ts-jest configurado o similar

// describe('FlowInvoices - Pruebas de integración con sandbox', () => {
//   let flowInvoices: FlowInvoices;

//   // Lee las credenciales y la baseURL de las variables de entorno o sustitúyelas directamente
//   const apiKey = process.env.FLOW_API_KEY || 'TU_API_KEY_DE_SANDBOX';
//   const secretKey = process.env.FLOW_SECRET_KEY || 'TU_SECRET_KEY_DE_SANDBOX';
//   const baseURL = process.env.FLOW_BASE_URL || 'https://sandbox.flow.cl/api';

//   // Ajusta estos IDs con invoices existentes en tu entorno
//   const TEST_INVOICE_ID = process.env.FLOW_TEST_INVOICE_ID || '12345'; // Ejemplo de Invoice (pendiente)
//   const OVERDUE_INVOICE_ID = process.env.FLOW_OVERDUE_INVOICE_ID || '67890'; // Ejemplo de Invoice vencido

//   beforeAll(() => {
//     flowInvoices = new FlowInvoices(apiKey, secretKey, baseURL);
//   });

//   it('Obtener los datos de un Invoice (get.normal)', async () => {
//     // Este test asume que el invoice existe en el entorno sandbox
//     const invoiceData = await flowInvoices.get.normal(TEST_INVOICE_ID);
//     expect(invoiceData).toHaveProperty('id');
//     expect(invoiceData).toHaveProperty('status');
//     // Agrega más validaciones si lo deseas
//     // Ejemplo: expect(invoiceData.id).toBe(Number(TEST_INVOICE_ID));
//   });

//   it('Obtener lista de invoices vencidos (get.overdue)', async () => {
//     // Ajusta los filtros según necesites
//     const data = {
//       start: 0,
//       limit: 10,
//     };
//     const overdueResponse = await flowInvoices.get.overdue(data);
//     expect(overdueResponse).toHaveProperty('data');
//     expect(overdueResponse).toHaveProperty('total');
//     // overdueResponse.data usualmente es un string
//   });

//   it('Cancelar un Invoice pendiente de pago (cancelPendingPayment)', async () => {
//     // OJO: Si el invoice ya está pagado o cancelado, obtendrás error.
//     // Asegúrate de usar un invoice pendiente válido.
//     try {
//       const cancelResponse =
//         await flowInvoices.cancelPendingPayment(TEST_INVOICE_ID);
//       expect(cancelResponse).toHaveProperty('status');
//       // Dependiendo de la respuesta, revisa los campos específicos
//       // Por ejemplo: 1 => cancelado, 0 => no cancelado, etc.
//     } catch (error) {
//       // Dependiendo de tus tests, podrías validar si el error es el esperado
//       console.error('Error al cancelar invoice pendiente:', error);
//       throw error;
//     }
//   });

//   it('Registrar pago externo y marcar Invoice como pagado (recordExternalPaymentAndMarkInvoicePaid)', async () => {
//     // Asegúrate de usar un invoice válido y en estado pendiente,
//     // o re-crea uno nuevo si ya se ha modificado en el test anterior.
//     const data: FlowRecordExternalPaymentAndMarkInvoicePaidRequest = {
//       invoiceId: TEST_INVOICE_ID,
//       date: '2025-01-01', // Debe cumplir el formato YYYY-MM-DD
//       // Agrega otros campos que tu API requiera (por si el server exige "amount", etc.)
//     };

//     try {
//       const recordPaymentResponse =
//         await flowInvoices.recordExternalPaymentAndMarkInvoicePaid(data);
//       expect(recordPaymentResponse).toHaveProperty('id');
//       // Por ejemplo: expect(recordPaymentResponse.status).toBe('pagado') depende de tu implementación
//     } catch (error) {
//       console.error('Error al registrar pago externo:', error);
//       throw error;
//     }
//   });

//   it('Reintentar cobro de un Invoice vencido (retryOverdueInvoicePayment)', async () => {
//     // Este test asume que "OVERDUE_INVOICE_ID" realmente corresponde a un invoice vencido.
//     try {
//       const retryResponse =
//         await flowInvoices.retryOverdueInvoicePayment(OVERDUE_INVOICE_ID);
//       expect(retryResponse).toHaveProperty('id');
//       // Valida el status o lo que devuelva tu API en un reintento de cobro
//     } catch (error) {
//       console.error('Error al reintentar cobro de invoice vencido:', error);
//       throw error;
//     }
//   });
// });
