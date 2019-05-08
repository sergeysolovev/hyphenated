import defaults from './defaults';
import { isHyphenationPoint } from './isHyphenationPoint';

export const hyphenateByPoints = (word, points = []) => {
  let hyphenated = '';
  for (let i = 0; i < word.length; i++) {
    hyphenated +=
      (isHyphenationPoint(points[i]) ? defaults.joiner : '') +
      word.charAt(i);
  }
  return hyphenated;
};
