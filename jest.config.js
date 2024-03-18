module.exports = {
  coverageReporters: ['json-summary'],
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};
