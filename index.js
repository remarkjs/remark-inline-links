/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:inline-links
 * @fileoverview
 *   Plug-in to transform references and definitions into
 *   normal links and images.
 */

'use strict';

/*
 * Dependencies.
 */

var visit = require('unist-util-visit');

/**
 * Factory to transform a reference based on `definitions`.
 *
 * @param {Object.<string, Node>} definitions - Map of ids
 *   to definitions.
 * @return {Function} - Reference handler.
 */
function referenceFactory(definitions) {
    /**
     * Transform a reference based on bound `definitions`.
     *
     * @param {Node} node - Reference node.
     * @param {number} index - Position of `node` in
     *   `parent`
     * @param {Node} parent - Parent of `node`.
     */
    function reference(node, index, parent) {
        var definition = definitions[node.identifier.toUpperCase()];
        var replacement;

        if (definition) {
            if (node.type === 'imageReference') {
                replacement = {
                    'type': 'image',
                    'src': definition.link,
                    'title': definition.title,
                    'alt': node.alt
                };
            } else {
                replacement = {
                    'type': 'link',
                    'href': definition.link,
                    'title': definition.title,
                    'children': node.children
                };
            }

            parent.children.splice(index, 1, replacement);
        }
    }

    return reference;
}

/**
 * Transformer.
 *
 * @param {Node} tree - remark node to visit.
 */
function transformer(tree) {
    var definitions = {};
    var reference = referenceFactory(definitions);

    visit(tree, 'definition', function (node, index, parent) {
        definitions[node.identifier.toUpperCase()] = node;

        parent.children.splice(index, 1);
    });

    visit(tree, 'imageReference', reference);
    visit(tree, 'linkReference', reference);
}

/**
 * Attacher.
 *
 * @return {function(node)} - Transformer.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
