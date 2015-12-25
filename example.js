// Dependencies:
var remark = require('remark');
var inlineLinks = require('./index.js');

// Process:
var doc = remark().use(inlineLinks).process(`[foo], [foo][], [bar][foo].

![foo], ![foo][], ![bar][foo].

[foo]: http://example.com "Example Domain"`
);

// Yields:
console.log('md', doc);
