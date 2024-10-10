const {generateOas3ToTs} = require('../dist');
const petStore1Specs = require('../examples/specs/petstore1.oas3.json');
const petStore2Specs = require('../examples/specs/petstore2.oas3.json');
const binanceSpecs = require('../examples/specs/binance.oas3.json');
const stripeSpecs = require('../examples/specs/stripe.oas3.json');

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

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(petStore1Specs);
    });
  },
  outputFolderPath: './examples/outputs/petstore1-with-zod',
  logger: {
    log: () => {},
  },
  withZod: true,
});

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(petStore2Specs);
    });
  },
  outputFolderPath: './examples/outputs/petstore2',
  logger: {
    log: () => {},
  },
});

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(petStore2Specs);
    });
  },
  outputFolderPath: './examples/outputs/petstore2-with-zod',
  logger: {
    log: () => {},
  },
  withZod: true,
});

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(binanceSpecs);
    });
  },
  outputFolderPath: './examples/outputs/binance',
  logger: {
    log: () => {},
  },
});

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(binanceSpecs);
    });
  },
  outputFolderPath: './examples/outputs/binance-with-zod',
  logger: {
    log: () => {},
  },
  withZod: true,
});

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(stripeSpecs);
    });
  },
  outputFolderPath: './examples/outputs/stripe',
  logger: {
    log: () => {},
  },
});

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(stripeSpecs);
    });
  },
  outputFolderPath: './examples/outputs/stripe-with-zod',
  logger: {
    log: () => {},
  },
  withZod: true,
});
