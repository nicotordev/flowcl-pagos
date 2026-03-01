const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: path.join(__dirname, '..'),
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/src/jest.setup.ts'],
  testTimeout: 15000,
};
