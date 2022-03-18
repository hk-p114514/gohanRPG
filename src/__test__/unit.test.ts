test('find method test', () => {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = [6, 7, 8];
  const sorted = [...array1, ...array2].sort((a, b) => b - a);
  expect(sorted.map((value) => value)).toBe([8, 7, 6, 5, 4, 3, 2, 1]);
});
