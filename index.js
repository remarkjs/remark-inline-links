'use strict';

var visit = require('unist-util-visit');
var remove = require('unist-util-remove');
var getDefinitions = require('mdast-util-definitions');

module.exports = inlineLinks;

function inlineLinks() {
  return transformer;
}

/* Transformer. */
function transformer(tree) {
  var reference = referenceFactory(tree);

  remove(tree, 'definition');

  visit(tree, 'imageReference', reference);
  visit(tree, 'linkReference', reference);
}

/* Factory to transform a reference based on `definitions`. */
function referenceFactory(tree) {
  var definitions = getDefinitions(tree);

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
