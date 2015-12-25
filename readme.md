# remark-inline-links [![Build Status](https://img.shields.io/travis/wooorm/remark-inline-links.svg)](https://travis-ci.org/wooorm/remark-inline-links) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/remark-inline-links.svg)](https://codecov.io/github/wooorm/remark-inline-links)

[**remark**](https://github.com/wooorm/remark) plug-in to transform
references and definitions into normal links and images.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install remark-inline-links
```

**remark-inline-links** is also available for [duo](http://duojs.org/#getting-started),
and as an AMD, CommonJS, and globals module, [uncompressed and
compressed](https://github.com/wooorm/remark-inline-links/releases).

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

### [remark](https://github.com/wooorm/remark#api).[use](https://github.com/wooorm/remark#remarkuseplugin-options)(inlineLinks)

Transform references and definitions into normal links
and images.

## Related

*   [remark-reference-links](https://github.com/wooorm/remark-reference-links)
    — Reverse, thus rewriting normal links and images into references
    and definitions.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
