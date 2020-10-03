'use strict'

var visit = require('unist-util-visit')
var getDefinitions = require('mdast-util-definitions')

module.exports = inlineLinks

function inlineLinks() {
  return transformer

  function transformer(tree) {
    var definitions = getDefinitions(tree)

    visit(tree, onvisit)

    function onvisit(node, index, parent) {
      var definition
      var replacement
      var image

      if (node.type === 'definition') {
        parent.children.splice(index, 1)
        return [visit.SKIP, index]
      }

      if (node.type === 'imageReference' || node.type === 'linkReference') {
        definition = definitions(node.identifier)

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
          return [visit.SKIP, index]
        }
      }
    }
  }
}
