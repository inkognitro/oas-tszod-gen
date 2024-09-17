module.exports = {
  coverageReporters: ['json-summary'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/src/templates',
    '<rootDir>/src/test-outputs',
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
    '@/(.*)': '<rootDir>/src/$1',
  },
};
