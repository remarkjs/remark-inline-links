'use strict'

var visit = require('unist-util-visit')
var remove = require('unist-util-remove')
var getDefinitions = require('mdast-util-definitions')

module.exports = inlineLinks

function inlineLinks(options) {
  return transformer

  function transformer(tree) {
    var reference = referenceFactory(tree, options)

    visit(tree, ['imageReference', 'linkReference'], reference)

    remove(tree, 'definition')
  }
}

// Factory to transform a reference based on `definitions`.
function referenceFactory(tree, options) {
  var definitions = getDefinitions(tree, options)

  return reference

  // Transform a reference based on bound `definitions`.
  function reference(node, index, parent) {
    var definition = definitions(node.identifier)
    var replacement
    var image

    if (definition) {
      image = node.type === 'imageReference'

      replacement = {
        type: image ? 'image' : 'link',
        url: definition.url,
        title: definition.title
      }

      if (image) {
        replacement.alt = node.alt
      } else {
        replacement.children = node.children
      }

      parent.children[index] = replacement
    }
  }
}
