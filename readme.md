# remark-inline-links [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[**remark**][remark] plug-in to transform references and definitions
into normal links and images.

## Installation

[npm][]:

```bash
npm install remark-inline-links
```

## Usage

Say we have the following file, `example.md`:

```markdown
[foo], [foo][], [bar][foo].

![foo], ![foo][], ![bar][foo].

[foo]: http://example.com "Example Domain"
```

And our script, `example.js`, looks as follows:

```javascript
var fs = require('fs');
var remark = require('remark');
var links = require('remark-inline-links');

remark()
  .use(links)
  .process(fs.readFileSync('example.md'), function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

Now, running `node example` yields:

```markdown
[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
```

## API

### `remark().use(inlineLinks)`

Transform references and definitions into normal links and images.

## Related

*   [`remark-reference-links`](https://github.com/remarkjs/remark-reference-links)
    — Reverse, thus rewriting normal links and images into references
    and definitions
*   [`remark-defsplit`](https://github.com/eush77/remark-defsplit)
    — Practically the same as `remark-reference-links`, but with
    URI-based identifiers instead of numerical ones

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-inline-links.svg

[build-status]: https://travis-ci.org/remarkjs/remark-inline-links

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-inline-links.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark-inline-links

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/remark

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark
