import { extend } from './util';
jest.unmock('./util');

describe('util', () => {
  describe('extend()', () => {
    it('extend', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3 };
      expect(extend(obj1, obj2)).toEqual({ a: 1, b: 3 });
    });
  });
});
