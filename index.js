import {visit, SKIP} from 'unist-util-visit'
import {definitions} from 'mdast-util-definitions'

export default function remarkInlineLinks() {
  return transformer

  function transformer(tree) {
    const definition = definitions(tree)

    visit(tree, onvisit)

    function onvisit(node, index, parent) {
      if (node.type === 'definition') {
        parent.children.splice(index, 1)
        return [SKIP, index]
      }

      if (node.type === 'imageReference' || node.type === 'linkReference') {
        const def = definition(node.identifier)

        /* istanbul ignore else - plugins could inject undefined references. */
        if (def) {
          const image = node.type === 'imageReference'
          const replacement = {
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
