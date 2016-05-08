# remark-inline-links [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**remark**][remark] plug-in to transform
references and definitions into normal links and images.

## Installation

[npm][npm-install]:

```bash
npm install remark-inline-links
```

**remark-inline-links** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var remark = require('remark');
var inlineLinks = require('remark-inline-links');
```

Process:

```javascript
var doc = remark().use(inlineLinks).process([
    '[foo], [foo][], [bar][foo].',
    '',
    '![foo], ![foo][], ![bar][foo].',
    '',
    '[foo]: http://example.com "Example Domain"',
    ''
].join('\n'));
```

Yields:

```md
[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
```

## API

### `remark.use(inlineLinks)`

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

[travis-badge]: https://img.shields.io/travis/wooorm/remark-inline-links/master.svg

[travis]: https://travis-ci.org/wooorm/remark-inline-links

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-inline-links.svg

[codecov]: https://codecov.io/github/wooorm/remark-inline-links

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/remark-inline-links/releases

[license]: LICENSE

[author]: http://wooorm.com

[remark]: https://github.com/wooorm/remark
