# Iterables in Jest's containing matchers

Reproduction for a Jest bug: inside `expect.objectContaining`, `expect.arrayContaining`, and `expect.arrayOf`, a `Set`, `Map`, or other iterable that isn't an `Array` or a typed array matches any other of its kind, no matter what it contains. Reported as [jestjs/jest#16508](https://github.com/jestjs/jest/issues/16508).

## Environment

- Jest 30.5.2, pinned in `package.json`
- Node.js 24

## Steps to Reproduce

1. `npm install`
2. `npm test`

## Expected Result

Every test passes. For a `Set`, a `Map`, and a custom iterable, the tests check that two instances with different contents don't match: once with `toEqual`, and once with each containing matcher.

## Actual Result

For each type, the `toEqual` test passes, and every test that uses a containing matcher fails.

## Additional Notes

- `toEqual` compares iterables with `iterableEquality`. The three containing matchers don't pass it to `equals`, which then compares only own enumerable properties, and these values keep their contents elsewhere.
- An `Array` or a typed array is compared correctly, because its elements are own properties.
