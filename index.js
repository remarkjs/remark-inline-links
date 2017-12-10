'use strict';

var visit = require('unist-util-visit');
var remove = require('unist-util-remove');
var getDefinitions = require('mdast-util-definitions');

module.exports = inlineLinks;

function inlineLinks(options) {
  return transformer;

  function transformer(tree) {
    var reference = referenceFactory(tree, options);

    remove(tree, 'definition');

    visit(tree, 'imageReference', reference);
    visit(tree, 'linkReference', reference);
  }
}

/* Factory to transform a reference based on `definitions`. */
function referenceFactory(tree, options) {
  var definitions = getDefinitions(tree, options);

  return reference;

  /* Transform a reference based on bound `definitions`. */
  function reference(node, index, parent) {
    var definition = definitions(node.identifier);
    var replacement;

    if (definition) {
      if (node.type === 'imageReference') {
        replacement = {
          type: 'image',
          url: definition.url,
          title: definition.title,
          alt: node.alt
        };
      } else {
        replacement = {
          type: 'link',
          url: definition.url,
          title: definition.title,
          children: node.children
        };
      }

      parent.children.splice(index, 1, replacement);
    }
  }
}
