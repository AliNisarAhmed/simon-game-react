import deepEqual from './deepEqual';


test('correctly compares two equal arrays', () => {
  let result = deepEqual(['x', 'y', 'z'], ['x', 'y', 'z']);
  expect(result).toEqual(true);
})

test('correctly compares two unequal arrays', () => {
  let result = deepEqual(['x', 'y', 'z'], ['a', 'y', 'z']);
  expect(result).toEqual(false);
})