import {isSpecification} from './specification';
const petStore1Specs = require('../../../example-specs/petstore1.oas3.json');
const petStore2Specs = require('../../../example-specs/petstore2.oas3.json');

test('isSpecification validates pet store one specification as correct input', () => {
  expect(isSpecification(petStore1Specs)).toBe(true);
});

test('isSpecification validates pet store two specification as correct input', () => {
  expect(isSpecification(petStore2Specs)).toBe(true);
});

test('isSpecification invalidates incorrect input', () => {
  expect(isSpecification('foo')).toBe(false);
});
