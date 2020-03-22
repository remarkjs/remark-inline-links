# remark-inline-links

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to transform references and definitions into normal
links and images.

## Install

[npm][]:

```sh
npm install remark-inline-links
```

## Use

Say we have the following file, `example.md`:

```markdown
[foo], [foo][], [bar][foo].

![foo], ![foo][], ![bar][foo].

[foo]: http://example.com "Example Domain"
```

And our script, `example.js`, looks as follows:

```js
var fs = require('fs')
var remark = require('remark')
var links = require('remark-inline-links')

remark()
  .use(links)
  .process(fs.readFileSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
```

## API

### `remark().use(inlineLinks[, options])`

Plugin to transform references and definitions into normal links and images.

##### `options`

###### `options.commonmark`

Handle definitions as CommonMark (`boolean`, default: `false`).
The default behavior is to prefer the last found duplicate definition.
Turn on to use CommonMark handling of duplicate definitions: use the first
definition, ignore duplicate definitions.

## Security

Use of `remark-inline-links` does not involve [**rehype**][rehype]
([**hast**][hast]) or user content so there are no openings for
[cross-site scripting (XSS)][xss] attacks.

## Related

*   [`remark-bookmarks`](https://github.com/ben-eb/remark-bookmarks)
    — Link manager
*   [`remark-reference-links`](https://github.com/remarkjs/remark-reference-links)
    — Reverse of `remark-inline-links`, thus rewriting normal links and images
    into references and definitions
*   [`remark-defsplit`](https://github.com/eush77/remark-defsplit)
    — Practically the same as `remark-reference-links`, but with
    URI-based identifiers instead of numerical ones
*   [`remark-unlink`](https://github.com/eush77/remark-unlink)
    — Remove all links, references and definitions

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-inline-links/master.svg

[build]: https://travis-ci.org/remarkjs/remark-inline-links

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-inline-links.svg

[coverage]: https://codecov.io/github/remarkjs/remark-inline-links

[downloads-badge]: https://img.shields.io/npm/dm/remark-inline-links.svg

[downloads]: https://www.npmjs.com/package/remark-inline-links

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-inline-links.svg

[size]: https://bundlephobia.com/result?p=remark-inline-links

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/master/contributing.md

[support]: https://github.com/remarkjs/.github/blob/master/support.md

[coc]: https://github.com/remarkjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
