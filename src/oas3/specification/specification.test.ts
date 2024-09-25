import {isSpecification, zSpecification} from './specification';
const petStore1Specs = require('../../../example-specs/petstore1.oas3.json');
const petStore2Specs = require('../../../example-specs/petstore2.oas3.json');
const binanceSpecs = require('../../../example-specs/binance.oas3.json');

test('isSpecification invalidates incorrect input', () => {
  expect(isSpecification('foo')).toBe(false);
});

test('zSpecification.parse throws error with incorrect input', () => {
  expect(() => zSpecification.parse('foo')).toThrow();
});

test('isSpecification validates PetStore1 specification as correct input', () => {
  expect(isSpecification(petStore1Specs)).toBe(true);
});

test('isSpecification validates PetStore2 specification as correct input', () => {
  expect(isSpecification(petStore2Specs)).toBe(true);
});

test('isSpecification validates Binance specification as correct input', () => {
  expect(isSpecification(binanceSpecs)).toBe(true);
});
