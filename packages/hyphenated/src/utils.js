import defaults from './defaults';

export const fromSyllables = (...syllables) => {
  return syllables.join(defaults.joiner);
};
