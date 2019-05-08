import { hyphenateException } from './hyphenateException';
import { fromSyllables } from './utils';

describe('decodeException', () => {
  it('correctly hyphenates hy-phen-at-ed', () => {
    expect(hyphenateException('hy-phen-at-ed')).toMatchObject({
      key: 'hyphenated',
      value: fromSyllables('hy', 'phen', 'at', 'ed')
    });
  });

  it('correctly hyphenates project', () => {
    expect(hyphenateException('project')).toMatchObject({
      key: 'project',
      value: 'project'
    });
  });

  it('correctly hyphenates úhlo-příč-ky', () => {
    expect(hyphenateException('úhlo-příč-ky')).toMatchObject({
      key: 'úhlopříčky',
      value: fromSyllables('úhlo', 'příč', 'ky')
    });
  });

  it('correctly hyphenates пре-вы́-спрєн-нѧѧ', () => {
    expect(hyphenateException('пре-вы́-спрєн-нѧѧ')).toMatchObject({
      key: 'превы́спрєннѧѧ',
      value: fromSyllables('пре', 'вы́', 'спрєн', 'нѧѧ')
    });
  });

  it('correctly hyphenates sørpe-is', () => {
    expect(hyphenateException('sørpe-is')).toMatchObject({
      key: 'sørpeis',
      value: fromSyllables('sørpe', 'is')
    });
  });

  it('correctly hyphenates pó-łach', () => {
    expect(hyphenateException('pó-łach')).toMatchObject({
      key: 'półach',
      value: fromSyllables('pó', 'łach')
    });
  });

  it('correctly hyphenates впол-уха', () => {
    expect(hyphenateException('впол-уха')).toMatchObject({
      key: 'вполуха',
      value: fromSyllables('впол', 'уха')
    });
  });

  it('correctly hyphenates ра-спе-ће', () => {
    expect(hyphenateException('ра-спе-ће')).toMatchObject({
      key: 'распеће',
      value: fromSyllables('ра', 'спе', 'ће')
    });
  });
});
