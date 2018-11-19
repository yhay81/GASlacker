import { queryEncode, createPayload } from '../src/util';
jest.unmock('../src/util');

describe('util', () => {
  describe('queryEncode()', () => {
    it('can encode object properly.', () => {
      const params = {
        a: 'a',
        b: 0,
        c: { 0: 0 },
        d: true,
        e: [0, 1],
        f: undefined
      };
      expect(queryEncode(params)).toEqual('a=a&b=0&c={"0":0}&d=true&e=0,1&f=undefined');
    });

    it('can encode array properly.', () => {
      const params = ['a', 0, { 0: 0 }, true, [0, 1], undefined];
      expect(queryEncode(params)).toEqual('0=a&1=0&2={"0":0}&3=true&4=0,1&5=undefined');
    });

    it('can encode null properly.', () => {
      const params = null;
      expect(queryEncode(params)).toEqual('');
    });
  });

  describe('createPayload()', () => {
    it('can create payload from object properly.', () => {
      const params = {
        a: 'a',
        b: 0,
        c: { 0: 0 },
        d: true,
        e: [0, 1],
        f: undefined
      };
      expect(createPayload(params)).toEqual({
        a: 'a',
        b: '0',
        c: '{"0":0}',
        d: 'true',
        e: '[0,1]'
      });
    });

    it('can create payload from array properly.', () => {
      const params = ['a', 0, { 0: 0 }, true, [0, 1], undefined];
      expect(createPayload(params)).toEqual({
        '0': 'a',
        '1': '0',
        '2': '{"0":0}',
        '3': 'true',
        '4': '[0,1]'
      });
    });

    it('can create payload from null properly.', () => {
      const params = null;
      expect(createPayload(params)).toEqual({});
    });
  });
});
