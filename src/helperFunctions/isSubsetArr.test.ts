import isSubsetArr from './isSubsetArr';

describe('testing isSubsetArr function', () => {
  test('Returns true for correct sequence', () => {
    let arr = ['red', 'blue'];
    let mainArr = ['red', 'blue', 'yellow', 'green'];
    expect(isSubsetArr(arr, mainArr)).toBeTruthy();
  });
  test('returns true for a full match', () => {
    let arr = ['red', 'green', 'yellow', 'blue'];
    let mainArr = ['red', 'green', 'yellow', 'blue'];
    expect(isSubsetArr(arr, mainArr)).toBeTruthy();
  })
  test('returns false for non-matching sequence', () => {
    let arr = ['red', 'green'];
    let mainArr = ['red', 'blue', 'yellow', 'green'];
    expect(isSubsetArr(arr, mainArr)).toBeFalsy();
  });
})