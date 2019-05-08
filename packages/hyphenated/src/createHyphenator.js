import PatternTrie from './PatternTrie';
import defaults from './defaults';
import { decodePattern } from './decodePattern';
import { hyphenateException } from './hyphenateException';
import { parseText } from './parseText';
import { hyphenateWord } from './hyphenateWord';

export const createHyphenator = ({ patterns = [], exceptions = [] }) => {
  const hyphenatedWords = {};
  const patternTrie = new PatternTrie();
  for (const pattern of patterns) {
    const { chars, points } = decodePattern(pattern);
    patternTrie.insert(chars, points);
  }
  for (const exception of exceptions) {
    const { key, value } = hyphenateException(exception);
    hyphenatedWords[key] = value;
  }
  return text => {
    return parseText(text)
      .map(fragment => {
        const shouldHyphenate = fragment.length > defaults.minWordLength;
        if (shouldHyphenate) {
          if (!hyphenatedWords[fragment]) {
            const hyphenatedWord = hyphenateWord(fragment, patternTrie);
            hyphenatedWords[fragment] = hyphenatedWord;
          }
          return hyphenatedWords[fragment];
        }
        return fragment;
      })
      .join('');
  };
};
