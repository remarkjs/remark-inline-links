'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var inlineLinks = require('./index.js');
var mdast = require('mdast');
var assert = require('assert');

/*
 * Tests.
 */

describe('mdast-inline-links', function () {
    it('should work', function (done) {
        mdast.use(inlineLinks).process([
            '[foo], [foo][], [bar][foo].',
            '',
            '![foo], ![foo][], ![bar][foo].',
            '',
            '[baz], [baz][], [bar][baz].',
            '',
            '![baz], ![baz][], ![bar][baz].',
            '',
            '[foo]: http://example.com "Example Domain"',
            ''
        ].join('\n'), function (err, doc) {
            done(err);

            assert.equal(doc, [
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
        });
    });
});
