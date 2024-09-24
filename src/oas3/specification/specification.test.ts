import {isSpecification} from './specification';
const petStore1Specs = require('../../../example-specs/petstore1.oas3.json');
const petStore2Specs = require('../../../example-specs/petstore2.oas3.json');
const binanceSpecs = require('../../../example-specs/binance.oas3.json');

test('isSpecification validates pet store 1 specification as correct input', () => {
  expect(isSpecification(petStore1Specs)).toBe(true);
});

test('isSpecification validates pet store 2 specification as correct input', () => {
  expect(isSpecification(petStore2Specs)).toBe(true);
});

test('isSpecification validates binance specification as correct input', () => {
  expect(isSpecification(binanceSpecs)).toBe(true);
});

test('isSpecification invalidates incorrect input', () => {
  expect(isSpecification('foo')).toBe(false);
});
