import {generateOas3ToTs} from './generate';
const petStore1Specification = require('./generate.petstore1.test.specs.json');
const petStore2Specification = require('./generate.petstore2.test.specs.json');

test('can generate files from pet store one specification', () => {
  expect(() => {
    generateOas3ToTs({
      getSpecification: () => {
        return new Promise<object>(resolve => {
          resolve(petStore1Specification);
        });
      },
      outputFolderPath: './generated-files-petstore1',
    });
  }).not.toThrow();
});

test('can generate files from pet store two specification', () => {
  expect(() => {
    generateOas3ToTs({
      getSpecification: () => {
        return new Promise<object>(resolve => {
          resolve(petStore2Specification);
        });
      },
      outputFolderPath: './generated-files-petstore2',
    });
  }).not.toThrow();
});
