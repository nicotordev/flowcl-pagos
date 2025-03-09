module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/jest.setup.ts'],
  testTimeout: 15000,
};
