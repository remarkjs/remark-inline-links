// Dependencies:
var remark = require('remark');
var inlineLinks = require('./index.js');

// Process:
var file = remark().use(inlineLinks).process([
    '[foo], [foo][], [bar][foo].',
    '',
    '![foo], ![foo][], ![bar][foo].',
    '',
    '[foo]: http://example.com "Example Domain"',
    ''
].join('\n'));

// Yields:
console.log('md', String(file));
