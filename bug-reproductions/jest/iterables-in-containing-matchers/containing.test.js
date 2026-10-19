// Each test asserts that two values with different contents don't match, so
// every test should pass. The `toEqual` tests do. The tests that use a
// containing matcher fail instead: inside those matchers, a Set, Map, or other
// iterable that isn't an Array or a typed array matches any other of its kind,
// no matter what it contains.

// A custom iterable that keeps its contents in a private field
class Bag {
  #items;

  constructor(items) {
    this.#items = items;
  }

  *[Symbol.iterator]() {
    yield* this.#items;
  }
}

const kinds = [
  ['Set', new Set(['a']), new Set(['b'])],
  ['Map', new Map([['a', 1]]), new Map([['b', 2]])],
  ['Bag', new Bag(['a']), new Bag(['b'])],
];

describe.each(kinds)('%s', (_, expected, received) => {
  test('toEqual tells two different instances apart', () => {
    expect({value: received}).not.toEqual({value: expected});
  });

  test('objectContaining tells two different instances apart', () => {
    expect({value: received}).not.toEqual(
      expect.objectContaining({value: expected}),
    );
  });

  test('arrayContaining tells two different instances apart', () => {
    expect([received]).not.toEqual(expect.arrayContaining([expected]));
  });

  test('arrayOf tells two different instances apart', () => {
    expect([received]).not.toEqual(expect.arrayOf(expected));
  });

  test('toHaveBeenCalledWith with objectContaining tells two different instances apart', () => {
    const fn = jest.fn();
    fn({value: received});
    expect(fn).not.toHaveBeenCalledWith(
      expect.objectContaining({value: expected}),
    );
  });
});
