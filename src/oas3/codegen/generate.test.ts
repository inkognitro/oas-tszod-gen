import {generateOas3ToTs, Oas3ToTsConfig} from './generate';
const petStore1Specs = require('../../../example-specs/petstore1.oas3.json');
const petStore2Specs = require('../../../example-specs/petstore2.oas3.json');
const binanceSpecs = require('../../../example-specs/binance.oas3.json');
const stripeSpecs = require('../../../example-specs/stripe.oas3.json');

describe('Generator', () => {
  it('can generate files from PetStore1 specs', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(petStore1Specs);
          });
        },
        outputFolderPath: './example-outputs/petstore1',
        importRootAlias: '@example-outputs/petstore1',
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
        outputFolderPath: './example-outputs/petstore1-with-zod',
        importRootAlias: '@example-outputs/petstore1-with-zod',
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
        outputFolderPath: './example-outputs/petstore2',
        importRootAlias: '@example-outputs/petstore2',
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
        outputFolderPath: './example-outputs/petstore2-with-zod',
        importRootAlias: '@example-outputs/petstore2-with-zod',
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
        outputFolderPath: './example-outputs/binance',
        importRootAlias: '@example-outputs/binance',
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
        outputFolderPath: './example-outputs/binance-with-zod',
        importRootAlias: '@example-outputs/binance-with-zod',
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
    outputFolderPath: './example-outputs/stripe',
    importRootAlias: '@example-outputs/stripe',
    logger: {
      log: () => {},
    },
  };

  it('can generate files from Stripe specs', () => {
    expect(() => {
      generateOas3ToTs(stripeConfig);
    }).not.toThrow();
  });

  /*
  it('can generate files from Stripe specs with Zod', () => {
    expect(() => {
      generateOas3ToTs({
        ...stripeConfig,
        outputFolderPath: './example-outputs/stripe-with-zod',
        withZod: true,
        importRootAlias: '@example-outputs/stripe-with-zod',
      });
    }).not.toThrow();
  });
  */
});
