import 'dotenv/config';
import FlowInvoices from '../clients/flow.invoices';
import { FlowRecordExternalPaymentAndMarkInvoicePaidRequest } from '../types/flow';
import {
  describeFlowIntegration,
  flowIntegrationConfig,
} from '../test-utils/flowIntegration';
// Para que Jest funcione con TypeScript, asegura que tengas ts-jest configurado o similar

const hasConfiguredInvoiceIds =
  Boolean(process.env.FLOW_TEST_INVOICE_ID) &&
  Boolean(process.env.FLOW_OVERDUE_INVOICE_ID);

describeFlowIntegration('FlowInvoices - Pruebas de integración con sandbox', () => {
  let flowInvoices: FlowInvoices;

  // Ajusta estos IDs con invoices existentes en tu entorno
  const TEST_INVOICE_ID = process.env.FLOW_TEST_INVOICE_ID;
  const OVERDUE_INVOICE_ID = process.env.FLOW_OVERDUE_INVOICE_ID;

  beforeAll(() => {
    flowInvoices = new FlowInvoices(
      flowIntegrationConfig.apiKey,
      flowIntegrationConfig.secretKey,
      flowIntegrationConfig.baseUrl,
    );
  });

  it('Obtener los datos de un Invoice (get.normal)', async () => {
    if (!hasConfiguredInvoiceIds) {
      expect(hasConfiguredInvoiceIds).toBe(false);
      return;
    }

    // Este test asume que el invoice existe en el entorno sandbox
    const invoiceData = await flowInvoices.get.normal(TEST_INVOICE_ID!);
    expect(invoiceData).toHaveProperty('id');
    expect(invoiceData).toHaveProperty('status');
    // Agrega más validaciones si lo deseas
    // Ejemplo: expect(invoiceData.id).toBe(Number(TEST_INVOICE_ID));
  });

  it('Obtener lista de invoices vencidos (get.overdue)', async () => {
    // Ajusta los filtros según necesites
    const data = {
      start: 0,
      limit: 10,
    };
    const overdueResponse = await flowInvoices.get.overdue(data);
    expect(overdueResponse).toHaveProperty('data');
    expect(overdueResponse).toHaveProperty('total');
    // overdueResponse.data usualmente es un string
  });

  it('Cancelar un Invoice pendiente de pago (cancelPendingPayment)', async () => {
    if (!hasConfiguredInvoiceIds) {
      expect(hasConfiguredInvoiceIds).toBe(false);
      return;
    }

    // OJO: Si el invoice ya está pagado o cancelado, obtendrás error.
    // Asegúrate de usar un invoice pendiente válido.
    try {
      const cancelResponse =
        await flowInvoices.cancelPendingPayment(TEST_INVOICE_ID!);
      expect(cancelResponse).toHaveProperty('status');
      // Dependiendo de la respuesta, revisa los campos específicos
      // Por ejemplo: 1 => cancelado, 0 => no cancelado, etc.
    } catch (error) {
      // Dependiendo de tus tests, podrías validar si el error es el esperado
      console.error('Error al cancelar invoice pendiente:', error);
      throw error;
    }
  });

  it('Registrar pago externo y marcar Invoice como pagado (recordExternalPaymentAndMarkInvoicePaid)', async () => {
    if (!hasConfiguredInvoiceIds) {
      expect(hasConfiguredInvoiceIds).toBe(false);
      return;
    }

    // Asegúrate de usar un invoice válido y en estado pendiente,
    // o re-crea uno nuevo si ya se ha modificado en el test anterior.
    const data: FlowRecordExternalPaymentAndMarkInvoicePaidRequest = {
      invoiceId: Number(TEST_INVOICE_ID),
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      // Agrega otros campos que tu API requiera (por si el server exige "amount", etc.)
    };

    try {
      const recordPaymentResponse =
        await flowInvoices.recordExternalPaymentAndMarkInvoicePaid(data);
      expect(recordPaymentResponse).toHaveProperty('id');
      // Por ejemplo: expect(recordPaymentResponse.status).toBe('pagado') depende de tu implementación
    } catch (error) {
      console.error('Error al registrar pago externo:', error);
      throw error;
    }
  });

  it('Reintentar cobro de un Invoice vencido (retryOverdueInvoicePayment)', async () => {
    if (!hasConfiguredInvoiceIds) {
      expect(hasConfiguredInvoiceIds).toBe(false);
      return;
    }

    // Este test asume que "OVERDUE_INVOICE_ID" realmente corresponde a un invoice vencido.
    try {
      const retryResponse =
        await flowInvoices.retryOverdueInvoicePayment(OVERDUE_INVOICE_ID!);
      expect(retryResponse).toHaveProperty('id');
      // Valida el status o lo que devuelva tu API en un reintento de cobro
    } catch (error) {
      console.error('Error al reintentar cobro de invoice vencido:', error);
      throw error;
    }
  });
});
