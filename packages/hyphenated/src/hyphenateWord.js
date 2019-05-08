import defaults from './defaults';
import { hyphenateByPoints } from './hyphenateByPoints';

const { borderMarker: marker } = defaults;

export const hyphenateWord = (word, patternTrie) => {
  const pattern = marker + word.toLocaleLowerCase() + marker;
  const patternPoints = new Array(pattern.length + 1).fill(0);
  for (let i = 0; i < pattern.length; i++) {
    const fragment = pattern.slice(i);
    for (const fragmentPoints of patternTrie.getPoints(fragment)) {
      for (let j = 0; j < fragmentPoints.length; j++) {
        patternPoints[i + j] = Math.max(
          patternPoints[i + j],
          fragmentPoints[j]
        );
      }
    }
  }
  // drop the first and the last point (which correspond to the markers)
  // and then replace first two and last two points with zeros:
  const points = [
    0,
    0,
    ...patternPoints.slice(3, patternPoints.length - 3),
    0,
    0
  ];
  return hyphenateByPoints(word, points);
};
