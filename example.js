// Dependencies:
var mdast = require('mdast');
var inlineLinks = require('./index.js');

// Process:
var doc = mdast().use(inlineLinks).process(`[foo], [foo][], [bar][foo].

![foo], ![foo][], ![bar][foo].

[foo]: http://example.com "Example Domain"`
);

// Yields:
console.log('md', doc);
