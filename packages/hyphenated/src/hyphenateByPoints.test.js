import { hyphenateByPoints } from './hyphenateByPoints';
import { fromSyllables } from './utils';

describe('hyphenateByPoints', () => {
  it('hyphenates the text “hyphenated”', () => {
    expect(
      hyphenateByPoints('hyphenated', [0, 0, 1, 0, 0, 0, 1, 0, 1, 0])
    ).toEqual(fromSyllables('hy', 'phen', 'at', 'ed'));
  });

  it('doesn’t hyphenate when points are not passed', () => {
    expect(hyphenateByPoints('hyphenated')).toEqual('hyphenated');
  });
});
