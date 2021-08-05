import {visit, SKIP} from 'unist-util-visit'
import {definitions} from 'mdast-util-definitions'

export default function remarkInlineLinks() {
  return transformer

  function transformer(tree) {
    var definition = definitions(tree)

    visit(tree, onvisit)

    function onvisit(node, index, parent) {
      var def
      var replacement
      var image

      if (node.type === 'definition') {
        parent.children.splice(index, 1)
        return [SKIP, index]
      }

      if (node.type === 'imageReference' || node.type === 'linkReference') {
        def = definition(node.identifier)

        /* istanbul ignore else - plugins could inject undefined references. */
        if (def) {
          image = node.type === 'imageReference'

          replacement = {
            type: image ? 'image' : 'link',
            url: def.url,
            title: def.title
          }

          if (image) {
            replacement.alt = node.alt
          } else {
            replacement.children = node.children
          }

          parent.children[index] = replacement
          return [SKIP, index]
        }
      }
    }
  }
}
