import { decodePattern } from './decodePattern';

describe('decodePattern', () => {
  it('correctly decodes .ach4', () => {
    expect(decodePattern('.ach4')).toMatchObject({
      chars: '.ach',
      points: [0, 0, 0, 0, 4]
    });
  });

  it('correctly decodes .eq5ui5t', () => {
    expect(decodePattern('.eq5ui5t')).toMatchObject({
      chars: '.equit',
      points: [0, 0, 0, 5, 0, 5, 0]
    });
  });

  it('correctly decodes .an4on.', () => {
    expect(decodePattern('.an4on.')).toMatchObject({
      chars: '.anon.',
      points: [0, 0, 0, 4, 0, 0, 0]
    });
  });

  it('correctly decodes .rü5hi', () => {
    expect(decodePattern('.rü5hi')).toMatchObject({
      chars: '.rühi',
      points: [0, 0, 0, 5, 0, 0]
    });
  });

  it(`correctly decodes 2'2`, () => {
    expect(decodePattern(`2'2`)).toMatchObject({
      chars: `'`,
      points: [2, 2]
    });
  });

  it(`correctly decodes 6ч'1`, () => {
    expect(decodePattern(`6ч'1`)).toMatchObject({
      chars: `ч'`,
      points: [6, 0, 1]
    });
  });

  it(`correctly decodes 2z''`, () => {
    expect(decodePattern(`2z''`)).toMatchObject({
      chars: `z''`,
      points: [2, 0, 0, 0]
    });
  });

  it('correctly decodes 8-1', () => {
    expect(decodePattern('8-1')).toMatchObject({
      chars: '-',
      points: [8, 1]
    });
  });

  it('correctly decodes 1ç', () => {
    expect(decodePattern('1ç')).toMatchObject({
      chars: 'ç',
      points: [1, 0]
    });
  });

  it('correctly decodes г3ґ', () => {
    expect(decodePattern('г3ґ')).toMatchObject({
      chars: 'гґ',
      points: [0, 3, 0]
    });
  });

  it('correctly decodes 8ё-', () => {
    expect(decodePattern('8ё-')).toMatchObject({
      chars: 'ё-',
      points: [8, 0, 0]
    });
  });

  it('correctly decodes -ы8', () => {
    expect(decodePattern('-ы8')).toMatchObject({
      chars: '-ы',
      points: [0, 0, 8]
    });
  });

  it('correctly decodes ‍2\u200D2 (with zero-width joiner)', () => {
    expect(decodePattern('2\u200D2')).toMatchObject({
      chars: '\u200D',
      points: [2, 2]
    });
  });

  it('correctly decodes ‍1\u200C1 (with zero-width non joiner)', () => {
    expect(decodePattern('1\u200C1')).toMatchObject({
      chars: '\u200C',
      points: [1, 1]
    });
  });

  it('correctly decodes 2ঃ1 (with bengali visarga)', () => {
    expect(decodePattern('2ঃ1')).toMatchObject({
      chars: '\u0983',
      points: [2, 1]
    });
  });

  it('correctly decodes 2ϩ0. (with a coptic character)', () => {
    expect(decodePattern('2ϩ0.')).toMatchObject({
      chars: 'ϩ.',
      points: [2, 0, 0]
    });
  });

  it('correctly decodes 2ϣⲇ (with a coptic character)', () => {
    expect(decodePattern('2ϣⲇ')).toMatchObject({
      chars: 'ϣⲇ',
      points: [2, 0, 0]
    });
  });

  it('correctly decodes .а҆с7сѷр (with a church slavonic character)', () => {
    expect(decodePattern('.а҆с7сѷр')).toMatchObject({
      chars: '.а҆ссѷр',
      points: [0, 0, 0, 0, 7, 0, 0, 0]
    });
  });

  it('correctly decodes 4β᾿ (with greek psili)', () => {
    expect(decodePattern('4β᾿')).toMatchObject({
      chars: 'β᾿',
      points: [4, 0, 0]
    });
  });

  it('correctly decodes ο2ἷ', () => {
    expect(decodePattern('ο2ἷ')).toMatchObject({
      chars: 'οἷ',
      points: [0, 2, 0]
    });
  });

  it('correctly decodes ա1վե', () => {
    expect(decodePattern('ա1վե')).toMatchObject({
      chars: 'ավե',
      points: [0, 1, 0, 0]
    });
  });

  it('correctly decodes .ავ4რწყა', () => {
    expect(decodePattern('.ავ4რწყა')).toMatchObject({
      chars: '.ავრწყა',
      points: [0, 0, 0, 4, 0, 0, 0, 0]
    });
  });

  it('correctly decodes 1ꬣ1', () => {
    expect(decodePattern('1ꬣ1')).toMatchObject({
      chars: 'ꬣ',
      points: [1, 1]
    });
  });

  it('correctly decodes ก2ว', () => {
    expect(decodePattern('ก2ว')).toMatchObject({
      chars: 'กว',
      points: [0, 2, 0]
    });
  });
});
