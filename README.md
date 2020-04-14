# Hyphenated

[![CircleCI](https://circleci.com/gh/sergeysolovev/hyphenated.svg?style=shield&circle-token=0701315b8c50b1291d10436e180526b252d7172c)](https://circleci.com/gh/sergeysolovev/hyphenated)
[![npm version](https://img.shields.io/npm/v/hyphenated.svg?style=flat)](https://npmjs.org/package/hyphenated)

Better hyphenation for JavaScript. Why?

- **Precise**: uses Franklin Liang’s algorithm under the hood.
- **Versatile**: hyphenates entire text and not just single words.
- **Multiple languages**: can be installed independently for efficient code
  splitting.
- **Flexible licensing**: each language package has a
  [separate license](#license) which is MIT where it’s possible.

[View demo →](https://hyphenated.netlify.com/)

## Quickstart

Install the main package which already includes hyphenation patterns for
American English:

```shell
npm install hyphenated
```

Hyphenate text:

```js
import { hyphenated } from 'hyphenated';

const textWithSoftHyphens = hyphenated(
  'Self-evident. Evident to one’s self and to nobody else.'
);

// To display soft hyphen (\u00AD) positions in console:
console.log(textWithSoftHyphens.replace(/\u00AD/g, '~'));
```

This should output:

```shell
Self-ev~i~dent. Ev~i~dent to one’s self and to no~body else.
```

Here soft hyphens are replaced with `~` only for demonstration purposes.

## Browser example

Although soft hyphens are invisible, they tell the browser where to put visible
hyphens when flowing text.

<p align="center">
  <img src="resources/browser-example.svg" alt="loadable-components" title="loadable-components" width="600">
</p>

```js
import { hyphenated } from 'hyphenated';

const paragraph = document.createElement('p');
const textWithSoftHyphens = hyphenated(
  'Self-evident. Evident to one’s self and to nobody else.'
);

paragraph.innerText = textWithSoftHyphens;
document.body.appendChild(paragraph);
```

## Text in another language

To hyphenate text in a language other than American English, first install an
appropriate language package:

```shell
npm install hyphenated-fr
```

Pass it as an option to `hyphenated`:

```js
import fr from 'hyphenated-fr';
import { hyphenated } from 'hyphenated';

const textWithSoftHyphens = hyphenated(
  "Je suis l'itinéraire donné par Pierre, un ami français.",
  { language: fr }
);

// To display soft hyphen (\u00AD) positions in console:
console.log(textWithSoftHyphens.replace(/\u00AD/g, '~'));
```

This should output:

```shell
Je suis l'iti~né~raire don~né par Pierre, un ami fran~çais.
```

## Supported languages

American English is a default language for hyphenated. It’s not necessary to
install it separately.

| language                   | package                                                                                               | license |
| -------------------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| American English (default) | [hyphenated-en-us](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated-en-us) | MIT     |
| British English            | [hyphenated-en-gb](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated-en-gb) | MIT     |
| German                     | [hyphenated-de](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated-de)       | MIT     |
| French                     | [hyphenated-fr](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated-fr)       | MIT     |
| Russian                    | [hyphenated-ru](https://github.com/denisotree/hyphenated-ru)                                          | LPPL    |
| Spanish                    | [hyphenated-es](https://github.com/vzla0094/hyphenated-es)                                            |
MIT     |

## License

Hyphenated is primarily distributed under the terms of the MIT license. It
includes packages with hyphenation patterns written by third parties. These
packages carry their own copyright notices and license terms.

See [LICENSE](LICENSE) for details.
