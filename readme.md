# mdast-inline-links [![Build Status](https://img.shields.io/travis/wooorm/mdast-inline-links.svg?style=flat)](https://travis-ci.org/wooorm/mdast-inline-links) [![Coverage Status](https://img.shields.io/coveralls/wooorm/mdast-inline-links.svg?style=flat)](https://coveralls.io/r/wooorm/mdast-inline-links?branch=master)

[**mdast**](https://github.com/wooorm/mdast) plug-in to transform
references and definitions into normal links and images.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-inline-links
```

**mdast-inline-links** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](mdast-inline-links.js) and
[compressed](mdast-inline-links.min.js).

## Usage

Dependencies:

```javascript
var mdast = require('mdast');
var inlineLinks = require('mdast-inline-links');
```

Process:

```javascript
var doc = mdast().use(inlineLinks).process(`[foo], [foo][], [bar][foo].
![foo], ![foo][], ![bar][foo].
[foo]: http://example.com "Example Domain"`
);
```

Yields:

```md
[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
```

## API

### [mdast](https://github.com/wooorm/mdast#api).[use](https://github.com/wooorm/mdast#mdastuseplugin-options)(inlineLinks)

Transform references and definitions into normal links
and images.

## Related

*   [mdast-reference-links](https://github.com/wooorm/mdast-reference-links)
    — Reverse, thus rewriting normal links and images into references
    and definitions.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
