# remark-inline-links [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[**remark**][remark] plug-in to transform references and definitions
into normal links and images.

## Installation

[npm][]:

```bash
npm install remark-inline-links
```

## Usage

```javascript
var remark = require('remark');
var inlineLinks = require('remark-inline-links');

var file = remark().use(inlineLinks).processSync([
  '[foo], [foo][], [bar][foo].',
  '',
  '![foo], ![foo][], ![bar][foo].',
  '',
  '[foo]: http://example.com "Example Domain"',
  ''
].join('\n'));

console.log(String(file));
```

Yields:

```md
[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
```

## API

### `remark().use(inlineLinks)`

Transform references and definitions into normal links and images.

## Related

*   [`wooorm/remark-reference-links`](https://github.com/wooorm/remark-reference-links)
    — Reverse, thus rewriting normal links and images into references
    and definitions;
*   [`eush77/remark-defsplit`](https://github.com/eush77/remark-defsplit)
    — Practically the same as `remark-reference-links`, but with
    URI-based identifiers instead of numerical ones.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/remark-inline-links.svg

[build-status]: https://travis-ci.org/wooorm/remark-inline-links

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-inline-links.svg

[coverage-status]: https://codecov.io/github/wooorm/remark-inline-links

[chat-badge]: https://img.shields.io/gitter/room/wooorm/remark.svg

[chat]: https://gitter.im/wooorm/remark

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark
