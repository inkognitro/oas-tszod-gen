import {generateOas3ToTs} from './generate';
const petStore1Specification = require('./generate.petstore1.test.specs.json');
const petStore2Specification = require('./generate.petstore2.test.specs.json');

test('can generate files from pet store one specification', () => {
  expect(() => {
    generateOas3ToTs({
      getSpecification: () => {
        return new Promise(resolve => {
          resolve(petStore1Specification);
        });
      },
      outputFolderPath: './src/test-outputs/petstore1',
      logger: {
        log: () => {},
      },
      importRootAlias: '@/src/test-outputs/petstore1',
    });
  }).not.toThrow();
});

test('can generate files from pet store one specification with Zod', () => {
  expect(() => {
    generateOas3ToTs({
      getSpecification: () => {
        return new Promise(resolve => {
          resolve(petStore1Specification);
        });
      },
      outputFolderPath: './src/test-outputs/petstore1-with-zod',
      logger: {
        log: () => {},
      },
      withZod: true,
      importRootAlias: '@/src/test-outputs/petstore1-with-zod',
    });
  }).not.toThrow();
});

test('can generate files from pet store two specification', () => {
  expect(() => {
    generateOas3ToTs({
      getSpecification: () => {
        return new Promise(resolve => {
          resolve(petStore2Specification);
        });
      },
      outputFolderPath: './src/test-outputs/petstore2',
      logger: {
        log: () => {},
      },
      importRootAlias: '@/src/test-outputs/petstore2',
    });
  }).not.toThrow();
});

test('can generate files from pet store two specification with Zod', () => {
  expect(() => {
    generateOas3ToTs({
      getSpecification: () => {
        return new Promise(resolve => {
          resolve(petStore2Specification);
        });
      },
      outputFolderPath: './src/test-outputs/petstore2-with-zod',
      logger: {
        log: () => {},
      },
      withZod: true,
      importRootAlias: '@/src/test-outputs/petstore2-with-zod',
    });
  }).not.toThrow();
});
