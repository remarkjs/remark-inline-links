'use strict'

var test = require('tape')
var remark = require('remark')
var inlineLinks = require('.')

test('remark-inline-links', function (t) {
  t.plan(2)

  remark()
    .use(inlineLinks)
    .process(
      [
        '[foo], [foo][], [bar][foo].',
        '',
        '![foo], ![foo][], ![bar][foo].',
        '',
        '[baz], [baz][], [bar][baz].',
        '',
        '![baz], ![baz][], ![bar][baz].',
        '',
        '[foo]: http://example.com "Example Domain"',
        '',
        '[qux]: http://example.com#qux "Qux"',
        ''
      ].join('\n'),
      function (error, file) {
        t.deepEqual(
          [error, String(file)],
          [
            null,
            [
              '[foo](http://example.com "Example Domain"), ' +
                '[foo](http://example.com "Example Domain"), ' +
                '[bar](http://example.com "Example Domain").',
              '',
              '![foo](http://example.com "Example Domain"), ' +
                '![foo](http://example.com "Example Domain"), ' +
                '![bar](http://example.com "Example Domain").',
              '',
              '\\[baz], \\[baz]\\[], \\[bar]\\[baz].',
              '',
              '!\\[baz], !\\[baz]\\[], !\\[bar]\\[baz].',
              ''
            ].join('\n')
          ],
          'should process'
        )
      }
    )

  remark()
    .use(inlineLinks)
    .process(
      [
        '[foo][].',
        '',
        '[foo]: http://alpha.com',
        '',
        '[foo]: http://bravo.com',
        ''
      ].join('\n'),
      function (error, file) {
        t.deepEqual(
          [error, String(file)],
          [null, '[foo](http://alpha.com).\n'],
          'should prefer the first definition'
        )
      }
    )
})
