import {zSpecification} from './specification';
const petStore1Specs = require('../../../example-specs/petstore1.oas3.json');
const petStore2Specs = require('../../../example-specs/petstore2.oas3.json');
const binanceSpecs = require('../../../example-specs/binance.oas3.json');

test('zSpecification.parse throws error with incorrect input', () => {
  expect(() => zSpecification.parse('foo')).toThrow();
});

test('isSpecification validates PetStore1 specification as correct input', () => {
  expect(() => zSpecification.parse(petStore1Specs)).not.toThrow();
});

test('isSpecification validates PetStore2 specification as correct input', () => {
  expect(() => zSpecification.parse(petStore2Specs)).not.toThrow();
});

test('isSpecification validates Binance specification as correct input', () => {
  expect(() => zSpecification.parse(binanceSpecs)).not.toThrow();
});
