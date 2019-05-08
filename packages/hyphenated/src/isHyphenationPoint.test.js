import { isHyphenationPoint } from './isHyphenationPoint';

describe('isHyphenationPoint', () => {
  it('returns a truthy for odd numbers', () => {
    expect(isHyphenationPoint(1)).toBeTruthy();
    expect(isHyphenationPoint(3)).toBeTruthy();
    expect(isHyphenationPoint(5)).toBeTruthy();
    expect(isHyphenationPoint(7)).toBeTruthy();
    expect(isHyphenationPoint(9)).toBeTruthy();
  });

  it('returns a falsy for even numbers', () => {
    expect(isHyphenationPoint(0)).toBeFalsy();
    expect(isHyphenationPoint(2)).toBeFalsy();
    expect(isHyphenationPoint(4)).toBeFalsy();
    expect(isHyphenationPoint(6)).toBeFalsy();
    expect(isHyphenationPoint(8)).toBeFalsy();
  });

  it('returns a falsy when called with no args', () => {
    expect(isHyphenationPoint()).toBeFalsy();
  });

  it('returns a falsy for null', () => {
    expect(isHyphenationPoint(null)).toBeFalsy();
  });
});
