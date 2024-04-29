import {isSpecification} from './specification';
const petStore1Specification = require('./specification.test.petstore1.json');
const petStore2Specification = require('./specification.test.petstore2.json');

test('isSpecification validates pet store one specification as correct input', () => {
  expect(isSpecification(petStore1Specification)).toBe(true);
});

test('isSpecification validates pet store two specification as correct input', () => {
  expect(isSpecification(petStore2Specification)).toBe(true);
});

test('isSpecification invalidates incorrect input', () => {
  expect(isSpecification('foo')).toBe(false);
});
