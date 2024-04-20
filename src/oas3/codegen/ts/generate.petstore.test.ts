import {generateOas3ToTs} from './generate';
const petStoreSpecification = require('./generate.petstore.test.specs.json');

test('can generate files from petstore specification', () => {
  generateOas3ToTs({
    getSpecification: () => {
      return new Promise<object>(resolve => {
        resolve(petStoreSpecification);
      });
    },
    outputFolderPath: './generated-files-petstore',
  });
});
