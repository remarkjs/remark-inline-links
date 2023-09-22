import assert from 'node:assert/strict'
import test from 'node:test'
import {remark} from 'remark'
import remarkInlineLinks from './index.js'

test('remark-inline-links', async function (t) {
  await t.test('should work', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkInlineLinks)
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
            ].join('\n')
          )
      ),
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
    )
  })

  await t.test('should prefer the first definition', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkInlineLinks)
          .process(
            [
              '[foo][].',
              '',
              '[foo]: http://alpha.com',
              '',
              '[foo]: http://bravo.com',
              ''
            ].join('\n')
          )
      ),
      '[foo](http://alpha.com).\n'
    )
  })
})
