import {generateOas3ToTs} from './generate';
const petStore1Specs = require('./generate.test.petstore1.oas3.json');
const petStore2Specs = require('./generate.test.petstore2.oas3.json');
const binanceSpecs = require('./generate.test.binance.oas3.json');

describe('Generator', () => {
  it('can generate files from PetStore1 specs', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(petStore1Specs);
          });
        },
        outputFolderPath: './src/test-outputs/petstore1',
        logger: {
          log: () => {},
        },
        importRootAlias: '@/test-outputs/petstore1',
      });
    }).not.toThrow();
  });

  it('can generate files from PetStore1 specs with Zod', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(petStore1Specs);
          });
        },
        outputFolderPath: './src/test-outputs/petstore1-with-zod',
        logger: {
          log: () => {},
        },
        withZod: true,
        importRootAlias: '@/test-outputs/petstore1-with-zod',
      });
    }).not.toThrow();
  });

  it('can generate files from PetStore2 specs', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(petStore2Specs);
          });
        },
        outputFolderPath: './src/test-outputs/petstore2',
        logger: {
          log: () => {},
        },
        importRootAlias: '@/test-outputs/petstore2',
      });
    }).not.toThrow();
  });

  it('can generate files from PetStore2 specs with Zod', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(petStore2Specs);
          });
        },
        outputFolderPath: './src/test-outputs/petstore2-with-zod',
        logger: {
          log: () => {},
        },
        withZod: true,
        importRootAlias: '@/test-outputs/petstore2-with-zod',
      });
    }).not.toThrow();
  });

  it('can generate files from Binance specs', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(binanceSpecs);
          });
        },
        outputFolderPath: './src/test-outputs/binance',
        logger: {
          log: () => {},
        },
        importRootAlias: '@/test-outputs/binance',
      });
    }).not.toThrow();
  });

  it('can generate files from Binance specs with Zod', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(binanceSpecs);
          });
        },
        outputFolderPath: './src/test-outputs/binance-with-zod',
        logger: {
          log: () => {},
        },
        withZod: true,
        importRootAlias: '@/test-outputs/binance-with-zod',
      });
    }).not.toThrow();
  });
});
