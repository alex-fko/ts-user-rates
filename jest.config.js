/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    // '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  }
};