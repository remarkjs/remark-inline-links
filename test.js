/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:inline-links:test
 * @fileoverview Test suite for mdast-inline-links.
 */

'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var mdast = require('mdast');
var inlineLinks = require('./index.js');

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
        ].join('\n'), function (err, file, doc) {
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
