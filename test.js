'use strict';

var test = require('tape');
var remark = require('remark');
var inlineLinks = require('./');

test('remark-inline-links', function (t) {
  remark().use(inlineLinks).process([
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
    t.ifErr(err);

    t.equal(file.toString(), [
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
    ].join('\n'));

    t.end();
  });
});
