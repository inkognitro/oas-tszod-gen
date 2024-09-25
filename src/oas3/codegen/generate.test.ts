import {generateOas3ToTs} from './generate';
const petStore1Specs = require('../../../example-specs/petstore1.oas3.json');
const petStore2Specs = require('../../../example-specs/petstore2.oas3.json');
const binanceSpecs = require('../../../example-specs/binance.oas3.json');
// const githubSpecs = require('../../../example-specs/github.oas3.json');

// todo: implement githubSpecs tests

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
        logger: {
          log: () => {},
        },
        importRootAlias: '@example-outputs/petstore1',
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
        logger: {
          log: () => {},
        },
        withZod: true,
        importRootAlias: '@example-outputs/petstore1-with-zod',
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
        logger: {
          log: () => {},
        },
        importRootAlias: '@example-outputs/petstore2',
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
        logger: {
          log: () => {},
        },
        withZod: true,
        importRootAlias: '@example-outputs/petstore2-with-zod',
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
        logger: {
          log: () => {},
        },
        importRootAlias: '@example-outputs/binance',
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
        logger: {
          log: () => {},
        },
        withZod: true,
        importRootAlias: '@example-outputs/binance-with-zod',
      });
    }).not.toThrow();
  });

  /*
  it('can generate files from Github specs', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(githubSpecs);
          });
        },
        outputFolderPath: './example-outputs/github',
        logger: {
          log: () => {},
        },
        importRootAlias: '@example-outputs/github',
      });
    }).not.toThrow();
  });

  it('can generate files from Github specs with Zod', () => {
    expect(() => {
      generateOas3ToTs({
        getSpecification: () => {
          return new Promise(resolve => {
            resolve(githubSpecs);
          });
        },
        outputFolderPath: './example-outputs/github-with-zod',
        logger: {
          log: () => {},
        },
        withZod: true,
        importRootAlias: '@example-outputs/github-with-zod',
      });
    }).not.toThrow();
  });
  */
});
