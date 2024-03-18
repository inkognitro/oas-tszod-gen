import {isComponentRef} from './componentRef';

const testComponentRef = {
  $ref: 'foo',
};

test('isComponentRef validates correct input', () => {
  expect(isComponentRef(testComponentRef)).toBe(true);
});

test('isComponentRef invalidates incorrect input', () => {
  expect(isComponentRef('foo')).toBe(false);
});
