module.exports = {
  coverageReporters: ['json-summary'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/src/templates',
    '<rootDir>/generated-files-petstore1',
    '<rootDir>/generated-files-petstore2',
  ],
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@oas3/(.*)': '<rootDir>/src/oas3/$1',
  },
};
