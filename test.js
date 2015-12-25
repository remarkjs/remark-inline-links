/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:inline-links:test
 * @fileoverview Test suite for remark-inline-links.
 */

'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var remark = require('remark');
var inlineLinks = require('./index.js');

/*
 * Tests.
 */

describe('remark-inline-links', function () {
    it('should work', function (done) {
        remark.use(inlineLinks).process([
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
