import { parseText } from './parseText';

describe('parseText', () => {
  it('returns an empty array for an empty text', () => {
    expect(parseText()).toEqual([]);
    expect(parseText('')).toEqual([]);
  });

  it('parses a single word', () => {
    expect(parseText('word123')).toEqual(['word123']);
  });

  it('parses two words separated by whitepace', () => {
    expect(parseText('word word')).toEqual(['word', ' ', 'word']);
    expect(parseText('word  word')).toEqual(['word', '  ', 'word']);
    expect(parseText('word\nword')).toEqual(['word', '\n', 'word']);
  });

  it('joins multiple consequent whitespaces into a single fragment', () => {
    expect(parseText('word\t\r\n \n \t word')).toEqual([
      'word',
      '\t\r\n \n \t ',
      'word'
    ]);
  });

  it('separates a whitespace on the left', () => {
    expect(parseText(' word')).toEqual([' ', 'word']);
    expect(parseText('\tword')).toEqual(['\t', 'word']);
    expect(parseText(' \n \tword')).toEqual([' \n \t', 'word']);
  });

  it('separates a whitespace on the right', () => {
    expect(parseText('word ')).toEqual(['word', ' ']);
    expect(parseText('word\t')).toEqual(['word', '\t']);
    expect(parseText('word \n \t')).toEqual(['word', ' \n \t']);
  });

  it('separates all 25 unicode whitespaces', () => {
    const unicodeWhiteSpaces = [
      '\u0009',
      '\u000A',
      '\u000B',
      '\u000C',
      '\u000D',
      '\u0020',
      '\u0085',
      '\u00A0',
      '\u1680',
      '\u2000',
      '\u2001',
      '\u2002',
      '\u2003',
      '\u2004',
      '\u2005',
      '\u2006',
      '\u2007',
      '\u2008',
      '\u2009',
      '\u200A',
      '\u2028',
      '\u2029',
      '\u202F',
      '\u205F',
      '\u3000'
    ];
    for (const whitespace of unicodeWhiteSpaces) {
      expect(parseText('word' + whitespace + 'word')).toEqual([
        'word',
        whitespace,
        'word'
      ]);
    }
  });

  it('separates exclamation mark', () => {
    expect(parseText('word!word')).toEqual(['word', '!', 'word']);
  });

  it('separates quotation mark', () => {
    expect(parseText('word"word')).toEqual(['word', '"', 'word']);
  });

  it('separates number sign', () => {
    expect(parseText('word#word')).toEqual(['word', '#', 'word']);
  });

  it('separates percent sign', () => {
    expect(parseText('word%word')).toEqual(['word', '%', 'word']);
  });

  it('separates ampersand', () => {
    expect(parseText('word&word')).toEqual(['word', '&', 'word']);
  });

  it('separates parentheses', () => {
    expect(parseText('word(word')).toEqual(['word', '(', 'word']);
    expect(parseText('word)word')).toEqual(['word', ')', 'word']);
  });

  it('separates asterick', () => {
    expect(parseText('word*word')).toEqual(['word', '*', 'word']);
  });

  it('separates comma', () => {
    expect(parseText('word,word')).toEqual(['word', ',', 'word']);
  });

  it('separates hyphen-minus', () => {
    expect(parseText('word-word')).toEqual(['word', '-', 'word']);
  });

  it('separates full stop', () => {
    expect(parseText('word.word')).toEqual(['word', '.', 'word']);
  });

  it('separates solidus', () => {
    expect(parseText('word/word')).toEqual(['word', '/', 'word']);
  });

  it('separates colon', () => {
    expect(parseText('word:word')).toEqual(['word', ':', 'word']);
  });

  it('separates semicolon', () => {
    expect(parseText('word;word')).toEqual(['word', ';', 'word']);
  });

  it('separates question mark', () => {
    expect(parseText('word?word')).toEqual(['word', '?', 'word']);
  });

  it('separates brakets', () => {
    expect(parseText('word[word')).toEqual(['word', '[', 'word']);
    expect(parseText('word]word')).toEqual(['word', ']', 'word']);
  });

  it('separates reverse solidus', () => {
    expect(parseText('word\\word')).toEqual(['word', '\\', 'word']);
  });

  it('separates curly brackets', () => {
    expect(parseText('word{word')).toEqual(['word', '{', 'word']);
    expect(parseText('word}word')).toEqual(['word', '}', 'word']);
  });

  it('separates inverted exclamation mark', () => {
    expect(parseText('word¡word')).toEqual(['word', '¡', 'word']);
  });

  it('separates section sign', () => {
    expect(parseText('word§word')).toEqual(['word', '§', 'word']);
  });

  it('separates double angle quotes', () => {
    expect(parseText('word«word')).toEqual(['word', '«', 'word']);
    expect(parseText('word»word')).toEqual(['word', '»', 'word']);
  });

  it('separates single angle quotes', () => {
    expect(parseText('word‹word')).toEqual(['word', '‹', 'word']);
    expect(parseText('word›word')).toEqual(['word', '›', 'word']);
  });

  it('separates inverted question mark', () => {
    expect(parseText('word¿word')).toEqual(['word', '¿', 'word']);
  });

  it('separates greek question mark', () => {
    expect(parseText('word;word')).toEqual(['word', '\u037E', 'word']);
  });

  it('separates greek ano teleia', () => {
    expect(parseText('word·word')).toEqual(['word', '\u0387', 'word']);
  });

  it('separates en dash', () => {
    expect(parseText('word–word')).toEqual(['word', '–', 'word']);
  });

  it('separates em dash', () => {
    expect(parseText('word—word')).toEqual(['word', '—', 'word']);
  });

  it('separates single quotation marks', () => {
    expect(parseText('word‘word')).toEqual(['word', '‘', 'word']);
    expect(parseText('word’word')).toEqual(['word', '’', 'word']);
  });

  it('separates double quotation marks', () => {
    expect(parseText('word“word')).toEqual(['word', '“', 'word']);
    expect(parseText('word”word')).toEqual(['word', '”', 'word']);
  });

  it('separates single low-9 quotation marks', () => {
    expect(parseText('word‚word')).toEqual(['word', '\u201A', 'word']);
  });

  it('separates double low-9 quotation marks', () => {
    expect(parseText('word„word')).toEqual(['word', '\u201E', 'word']);
  });

  it('separates dagger', () => {
    expect(parseText('word†word')).toEqual(['word', '†', 'word']);
  });

  it('separates double dagger', () => {
    expect(parseText('word‡word')).toEqual(['word', '‡', 'word']);
  });

  it('separates bullet', () => {
    expect(parseText('word•word')).toEqual(['word', '•', 'word']);
  });

  it('separates horizontal ellipsis', () => {
    expect(parseText('word…word')).toEqual(['word', '…', 'word']);
  });

  it('separates per mille sign', () => {
    expect(parseText('word‰word')).toEqual(['word', '‰', 'word']);
  });

  it('doesn’t separate apostrophe', () => {
    expect(parseText("word'word")).toEqual(["word'word"]);
  });

  it('doesn’t separate commercial at', () => {
    expect(parseText('word@word')).toEqual(['word@word']);
  });

  it('doesn’t separate low line', () => {
    expect(parseText('word_word')).toEqual(['word_word']);
  });

  it('doesn’t separate combining diacritical marks', () => {
    expect(parseText('word\u0300word')).toEqual(['word\u0300word']);
    expect(parseText('word\u0301word')).toEqual(['word\u0301word']);
    expect(parseText('word\u0302word')).toEqual(['word\u0302word']);
    expect(parseText('word\u0303word')).toEqual(['word\u0303word']);
    expect(parseText('word\u0304word')).toEqual(['word\u0304word']);
    expect(parseText('word\u0305word')).toEqual(['word\u0305word']);
    expect(parseText('word\u0306word')).toEqual(['word\u0306word']);
    expect(parseText('word\u0307word')).toEqual(['word\u0307word']);
    expect(parseText('word\u0308word')).toEqual(['word\u0308word']);
    expect(parseText('word\u0309word')).toEqual(['word\u0309word']);
    expect(parseText('word\u030Aword')).toEqual(['word\u030Aword']);
    expect(parseText('word\u030Bword')).toEqual(['word\u030Bword']);
    expect(parseText('word\u030Cword')).toEqual(['word\u030Cword']);
    expect(parseText('word\u0312word')).toEqual(['word\u0312word']);
    expect(parseText('word\u0326word')).toEqual(['word\u0326word']);
    expect(parseText('word\u0327word')).toEqual(['word\u0327word']);
    expect(parseText('word\u0328word')).toEqual(['word\u0328word']);
  });

  it('doesn’t separate number', () => {
    expect(parseText('word1word')).toEqual(['word1word']);
    expect(parseText('word12word')).toEqual(['word12word']);
  });

  it('parses a sentence with punctuation', () => {
    expect(parseText('Pos quiatqu; quo—quo: vit, ex-et enis.')).toEqual([
      'Pos',
      ' ',
      'quiatqu',
      ';',
      ' ',
      'quo',
      '—',
      'quo',
      ':',
      ' ',
      'vit',
      ',',
      ' ',
      'ex',
      '-',
      'et',
      ' ',
      'enis',
      '.'
    ]);
  });
});
