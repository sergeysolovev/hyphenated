import defaults from './defaults';
import enUs from 'hyphenated-en-us';
import { fromSyllables } from './utils';
import { hyphenated } from '.';

let { minWordLength } = defaults;

describe('hyphenated', () => {
  beforeEach(() => {
    defaults.minWordLength = minWordLength;
  });

  it('hyphenates the text “hyphenated”', () => {
    expect(hyphenated('hyphenated')).toEqual(
      fromSyllables('hy', 'phen', 'at', 'ed')
    );
  });

  it('hyphenates the text “hyphenated” when en-us language is passed explicitly', () => {
    expect(hyphenated('hyphenated', { language: enUs })).toEqual(
      fromSyllables('hy', 'phen', 'at', 'ed')
    );
  });

  it('hyphenates the text “hyphenated” when language has matching patterns', () => {
    const language = {
      id: 'limited-patterns',
      patterns: ['hy3ph', 'he2n', 'hen5at', '2t1ed']
    };
    expect(hyphenated('hyphenated', { language })).toEqual(
      fromSyllables('hy', 'phen', 'at', 'ed')
    );
  });

  it('hyphenates the text “hyphenated” when language has a matching exception', () => {
    const language = {
      id: 'limited-exceptions',
      exceptions: ['hy-phen-at-ed']
    };
    expect(hyphenated('hyphenated', { language })).toEqual(
      fromSyllables('hy', 'phen', 'at', 'ed')
    );
  });

  it(`hyphenates the text “hyphenated” using exception only
      when matching patterns are also present`, () => {
    const language = {
      id: 'limited-patterns-and-exception',
      patterns: ['hy3ph', 'he2n', 'hen5at', '2t1ed'],
      exceptions: ['hyp-he-nated']
    };
    expect(hyphenated('hyphenated', { language })).toEqual(
      fromSyllables('hyp', 'he', 'nated')
    );
  });

  it(`doesn’t hyphenate the text “hyphenated”
      when language has no appropriate patterns and exceptions`, () => {
    const language = { id: 'empty' };
    expect(hyphenated('hyphenated', { language })).toEqual('hyphenated');
  });

  it('doesn’t hyphenate short words', () => {
    const patterns = ['ca1fé'];
    const word = 'café';
    defaults.minWordLength = word.length;
    expect(
      hyphenated(word, { language: { id: 'min-word-length-4', patterns } })
    ).toEqual(word);
    defaults.minWordLength = word.length - 1;
    expect(
      hyphenated(word, { language: { id: 'min-word-length-3', patterns } })
    ).toEqual(fromSyllables('ca', 'fé'));
  });
});
