import pickRandomColor from './pickRandomColor';

describe('Testing pickRandomColor Function', () => {
  test("returns a random color from Blue, Green, Yellow & Red", () => {
    let result = pickRandomColor();
    expect(["red", "blue", "yellow", "green"]).toContain(result);
  })
})