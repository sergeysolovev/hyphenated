import HyphenatedEnUs from 'hyphenated-en-us';
import { createHyphenator } from './createHyphenator';

jest.mock('hyphenated-en-us');
jest.mock('./createHyphenator');

createHyphenator.mockImplementation(() => () => {});

describe('hyphenators', () => {
  describe('get', () => {
    afterEach(() => {
      jest.resetModules();
    });

    it('creates a hyphenator for en-US language when called without args', () => {
      const { hyphenators } = require('./hyphenators');
      hyphenators.get();
      expect(createHyphenator).toHaveBeenCalledWith(HyphenatedEnUs);
    });

    it('creates a hyphenator only once when called without args', () => {
      const { hyphenators } = require('./hyphenators');
      expect(hyphenators.get()).toBe(hyphenators.get());
      expect(createHyphenator).toHaveBeenCalledTimes(1);
    });

    it('creates a hyphenator only once for a particular language', () => {
      const { hyphenators } = require('./hyphenators');
      const language = { id: 'en-gb' };
      expect(hyphenators.get(language)).toBe(hyphenators.get(language));
      expect(createHyphenator).toHaveBeenCalledTimes(1);
    });
  });
});
