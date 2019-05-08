const whiteSpaceRegex = /\s|\u0085/u;
const separatorRegex = /(?!['@_])[\s\p{P}]/u;

const getSpacesAndFragments = text => {
  const fragments = [];
  let fragment = '';
  let space = '';
  const addFragment = () => {
    if (fragment.length > 0) {
      fragments.push(fragment);
      fragment = '';
    }
  };
  const addSpace = () => {
    if (space.length > 0) {
      fragments.push(space);
      space = '';
    }
  };
  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    const char = text.charAt(charIndex);
    if (whiteSpaceRegex.test(char)) {
      addFragment();
      space += char;
    } else {
      addSpace();
      fragment += char;
    }
  }
  addFragment();
  addSpace();
  return fragments;
};

const getWordsAndCharacters = fragment => {
  let wordStartIndex = null;
  let charIndex;
  const words = [];
  const addCharacter = char => words.push(char);
  const addWord = characterIndex => {
    if (wordStartIndex !== null) {
      const word = fragment.slice(wordStartIndex, characterIndex);
      wordStartIndex = null;
      words.push(word);
    }
  };
  for (charIndex = 0; charIndex < fragment.length; charIndex++) {
    const char = fragment.charAt(charIndex);
    const isSeparator = separatorRegex.test(char);
    if (isSeparator) {
      addWord(charIndex);
      addCharacter(char);
    } else {
      if (wordStartIndex === null) {
        wordStartIndex = charIndex;
      }
    }
  }
  addWord(fragment.length);
  return words;
};

export const parseText = (text = '') => {
  const allFragments = [];
  const spacesAndFragments = getSpacesAndFragments(text);
  if (spacesAndFragments.length) {
    let isSpace = whiteSpaceRegex.test(spacesAndFragments[0]);
    for (const fragment of spacesAndFragments) {
      if (isSpace) {
        allFragments.push(fragment);
      } else {
        const wordsAndCharacters = getWordsAndCharacters(fragment);
        allFragments.push(...wordsAndCharacters);
      }
      isSpace = !isSpace;
    }
  }
  return allFragments;
};
