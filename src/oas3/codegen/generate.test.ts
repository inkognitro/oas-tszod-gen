import {generateOas3ToTs, Oas3ToTsConfig} from './generate';
const petStore1Specs = require('../../../examples/specs/petstore1.oas3.json');
const petStore2Specs = require('../../../examples/specs/petstore2.oas3.json');
const binanceSpecs = require('../../../examples/specs/binance.oas3.json');
const stripeSpecs = require('../../../examples/specs/stripe.oas3.json');

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
        importRootAlias: '@/test-outputs/petstore1',
        logger: {
          log: () => {},
        },
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
        importRootAlias: '@/test-outputs/petstore1-with-zod',
        logger: {
          log: () => {},
        },
        withZod: true,
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
        importRootAlias: '@/test-outputs/petstore2',
        logger: {
          log: () => {},
        },
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
        importRootAlias: '@/test-outputs/petstore2-with-zod',
        logger: {
          log: () => {},
        },
        withZod: true,
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
        importRootAlias: '@/test-outputs/binance',
        logger: {
          log: () => {},
        },
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
        importRootAlias: '@/test-outputs/binance-with-zod',
        logger: {
          log: () => {},
        },
        withZod: true,
      });
    }).not.toThrow();
  });

  const stripeConfig: Oas3ToTsConfig = {
    getSpecification: () => {
      return new Promise(resolve => {
        resolve(stripeSpecs);
      });
    },
    outputFolderPath: './src/test-outputs/stripe',
    importRootAlias: '@/test-outputs/stripe',
    logger: {
      log: () => {},
    },
  };

  it('can generate files from Stripe specs', () => {
    expect(() => {
      generateOas3ToTs(stripeConfig);
    }).not.toThrow();
  });

  it('can generate files from Stripe specs with Zod', () => {
    expect(() => {
      generateOas3ToTs({
        ...stripeConfig,
        outputFolderPath: './src/test-outputs/stripe-with-zod',
        withZod: true,
        importRootAlias: '@/test-outputs/stripe-with-zod',
      });
    }).not.toThrow();
  });
});
