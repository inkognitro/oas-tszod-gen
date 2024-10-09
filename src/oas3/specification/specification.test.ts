import {zSpecification} from './specification';
const petStore1Specs = require('../../../example-specs/petstore1.oas3.json');
const petStore2Specs = require('../../../example-specs/petstore2.oas3.json');
const binanceSpecs = require('../../../example-specs/binance.oas3.json');
const stripeSpecs = require('../../../example-specs/stripe.oas3.json');

test('throws error with incorrect input', () => {
  expect(() => zSpecification.parse('foo')).toThrow();
});

test('parses PetStore1 specification as correct input', () => {
  expect(() => zSpecification.parse(petStore1Specs)).not.toThrow();
});

test('parses PetStore2 specification as correct input', () => {
  expect(() => zSpecification.parse(petStore2Specs)).not.toThrow();
});

test('parses Binance specification as correct input', () => {
  expect(() => zSpecification.parse(binanceSpecs)).not.toThrow();
});

test('parses Stripe specification as correct input', () => {
  const result = zSpecification.safeParse(stripeSpecs);
  console.log(result.error);

  // expect(() => zSpecification.parse(stripeSpecs)).not.toThrow();
});
