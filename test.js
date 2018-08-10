'use strict';

var test = require('tape');
var remark = require('remark');
var inlineLinks = require('.');

test('remark-inline-links', function (t) {
  t.plan(4);

  remark()
    .use(inlineLinks)
    .process([
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
    ].join('\n'), function (err, file) {
      t.deepEqual(
        [err, String(file)],
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
            '[baz], [baz][], [bar][baz].',
            '',
            '![baz], ![baz][], ![bar][baz].',
            ''
          ].join('\n')
        ],
        'should process'
      );
    });

  remark()
    .use(inlineLinks, {commonmark: true})
    .process([
      '[foo][].',
      '',
      '[foo]: http://alpha.com',
      '',
      '[foo]: http://bravo.com',
      ''
    ].join('\n'), function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '[foo](http://alpha.com).\n'],
        'should support `commonmark: true`'
      );
    });

  remark()
    .use(inlineLinks, {commonmark: false})
    .process([
      '[foo][].',
      '',
      '[foo]: http://alpha.com',
      '',
      '[foo]: http://bravo.com',
      ''
    ].join('\n'), function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '[foo](http://bravo.com).\n'],
        'should support `commonmark: false`'
      );
    });

  remark()
    .use(inlineLinks)
    .process([
      '[foo][].',
      '',
      '[foo]: http://alpha.com',
      '',
      '[foo]: http://bravo.com',
      ''
    ].join('\n'), function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '[foo](http://bravo.com).\n'],
        'should default to `commonmark: false`'
      );
    });
});
