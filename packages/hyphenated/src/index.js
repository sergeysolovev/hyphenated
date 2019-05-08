import { hyphenators } from './hyphenators';

export const hyphenated = (text, { language } = {}) => {
  return hyphenators.get(language)(text);
};
