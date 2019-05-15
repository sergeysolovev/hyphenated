# Hyphenated

[![CircleCI](https://circleci.com/gh/sergeysolovev/hyphenated.svg?style=shield&circle-token=0701315b8c50b1291d10436e180526b252d7172c)](https://circleci.com/gh/sergeysolovev/hyphenated)

Better hyphenation for JavaScript. Why?

- **Precise**: uses Franklin Liang’s algorithm under the hood.
- **Versatile**: hyphenates entire text and not just single words.
- **Multiple languages**: can be installed independently for efficient code
  splitting.
- **Flexible licensing**: each language package has a
  [separate license](#license) which is MIT where it’s possible.

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

```
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

## Supported languages

American English is a default language for hyphenated. It’s not necessary to
install it separately.

| language         | package                                                                                               | license |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| American English | [hyphenated-en-us](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated-en-us) | MIT     |
| British English  | [hyphenated-en-gb](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated-en-gb) | MIT     |
| German           | [hyphenated-de](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated-de)       | MIT     |
| French           | [hyphenated-fr](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated-fr)       | MIT     |

## License

Hyphenated consists of the main
[hyphenated](https://github.com/sergeysolovev/hyphenated/tree/master/packages/hyphenated)
package and additional [language packages](#supported-languages) which are
distributed independently. The hyphenated package is licensed under the
[MIT license](https://github.com/sergeysolovev/hyphenated/blob/master/packages/hyphenated/LICENSE).
Each language package has a separate license based on a license of the original
work. Refer to the LICENSE document in each language package for more details.
