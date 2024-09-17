import {generateOas3ToTs} from './generate';
const binanceApiSpecification = require('./generate.binance.test.specs.json');

test('can generate files from binance api specification', () => {
  expect(() => {
    generateOas3ToTs({
      getSpecification: () => {
        return new Promise(resolve => {
          resolve(binanceApiSpecification);
        });
      },
      outputFolderPath: './src/test-outputs/binance',
      logger: {
        log: () => {},
      },
      importRootAlias: '@/src/test-outputs/binance',
    });
  }).not.toThrow();
});

test('can generate files from binance api specification with Zod', () => {
  expect(() => {
    generateOas3ToTs({
      getSpecification: () => {
        return new Promise(resolve => {
          resolve(binanceApiSpecification);
        });
      },
      outputFolderPath: './src/test-outputs/binance-with-zod',
      logger: {
        log: () => {},
      },
      withZod: true,
      importRootAlias: '@/src/test-outputs/binance-with-zod',
    });
  }).not.toThrow();
});
