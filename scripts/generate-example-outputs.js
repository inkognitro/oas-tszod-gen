const {generateOas3ToTs} = require('../dist');
const petStore1Specs = require('../examples/specs/petstore1.oas3.json');

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(petStore1Specs);
    });
  },
  outputFolderPath: './examples/outputs/petstore1',
  logger: {
    log: () => {},
  },
});
