import { normalizeString } from '../src/utils/functions';

test('normalize string return a lowercase string and trims white spaces', () => {
  expect(normalizeString(' THIS IS A TEST ')).toBe('this is a test');
});
