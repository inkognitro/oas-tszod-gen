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
      outputFolderPath: './generated-files-binance',
      logger: {
        log: () => {},
      },
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
      outputFolderPath: './generated-files-binance',
      logger: {
        log: () => {},
      },
      withZod: true,
    });
  }).not.toThrow();
});
