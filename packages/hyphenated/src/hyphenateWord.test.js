import { hyphenateWord } from './hyphenateWord';
import { fromSyllables } from './utils';

describe('hyphenateWord', () => {
  it(`hyphenates the word “hyphenated”
      when pattern trie’s getPoints returns valid points`, () => {
    expect(
      hyphenateWord('hyphenated', {
        getPoints: jest.fn(chars => {
          if (chars === '.hyphenated.') return [[0, 0, 0, 1, 0, 0, 0, 1, 0, 1]];
          return [];
        })
      })
    ).toEqual(fromSyllables('hy', 'phen', 'at', 'ed'));
    expect(
      hyphenateWord('hyphenated', {
        getPoints: jest.fn(chars => {
          if (chars === 'hyphenated.') return [[0, 0, 1]];
          if (chars === 'henated.') return [[0, 0, 0, 1]];
          if (chars === 'ted.') return [[0, 1]];
          return [];
        })
      })
    ).toEqual(fromSyllables('hy', 'phen', 'at', 'ed'));
    expect(
      hyphenateWord('hyphenated', {
        getPoints: jest.fn(chars => {
          if (chars === 'phenated.') return [[1]];
          if (chars === 'ated.') return [[1]];
          if (chars === 'ed.') return [[1]];
          return [];
        })
      })
    ).toEqual(fromSyllables('hy', 'phen', 'at', 'ed'));
  });

  it(`doesn’t hyphenate the word “hyphenated”
      when pattern trie’s getPoints returns no points`, () => {
    expect(
      hyphenateWord('hyphenated', {
        getPoints: jest.fn(() => [])
      })
    ).toEqual('hyphenated');
  });
});
