const DEFAULT_BASE_URL = 'https://sandbox.flow.cl/api';
const PLACEHOLDER_VALUES = new Set([
  '',
  'TU_API_KEY_DE_SANDBOX',
  'TU_SECRET_KEY_DE_SANDBOX',
]);

const hasRealCredential = (value: string | undefined): boolean =>
  value !== undefined && value !== '' && !PLACEHOLDER_VALUES.has(value);

export const flowIntegrationConfig = {
  apiKey:
    process.env.FLOW_API_KEY ||
    process.env.FLOW_PUBLIC_KEY ||
    'TU_API_KEY_DE_SANDBOX',
  secretKey: process.env.FLOW_SECRET_KEY || 'TU_SECRET_KEY_DE_SANDBOX',
  baseUrl:
    process.env.FLOW_BASE_URL || process.env.FLOW_API_URL || DEFAULT_BASE_URL,
};

export const hasFlowIntegrationCredentials =
  hasRealCredential(flowIntegrationConfig.apiKey) &&
  hasRealCredential(flowIntegrationConfig.secretKey);

/** Desactiva integración con `FLOW_RUN_INTEGRATION_TESTS=false`. */
export const shouldRunIntegrationTests =
  process.env.FLOW_RUN_INTEGRATION_TESTS !== 'false' &&
  hasFlowIntegrationCredentials;

export const describeFlowIntegration = shouldRunIntegrationTests
  ? describe
  : describe.skip;

/** Requiere cuenta integrador en Flow (`FLOW_RUN_MERCHANT_TESTS=true`). */
export const shouldRunMerchantIntegrationTests =
  shouldRunIntegrationTests && process.env.FLOW_RUN_MERCHANT_TESTS === 'true';

export const describeFlowMerchantIntegration = shouldRunMerchantIntegrationTests
  ? describe
  : describe.skip;
