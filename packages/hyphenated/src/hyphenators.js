import enUs from 'hyphenated-en-us';
import { createHyphenator } from './createHyphenator';

const createHyphenators = {};

export const hyphenators = {
  get(language = enUs) {
    if (!createHyphenators[language.id]) {
      createHyphenators[language.id] = createHyphenator(language);
    }
    return createHyphenators[language.id];
  }
};
