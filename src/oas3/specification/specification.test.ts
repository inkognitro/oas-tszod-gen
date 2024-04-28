import {isSpecification} from './specification';
const petStoreSpecification = require('./specification.test.petstore.json');

test('isSpecification validates pet store specification as correct input', () => {
  expect(isSpecification(petStoreSpecification)).toBe(true);
});

test('isSpecification invalidates incorrect input', () => {
  expect(isSpecification('foo')).toBe(false);
});
