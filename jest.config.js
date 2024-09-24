module.exports = {
  coverageReporters: ['json-summary'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/example-specs',
    '<rootDir>/example-outputs',
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
