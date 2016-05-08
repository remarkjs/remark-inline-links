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

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var visit = require('unist-util-visit');
var remove = require('unist-util-remove');
var getDefinitions = require('mdast-util-definitions');

/**
 * Factory to transform a reference based on `definitions`.
 *
 * @param {Node} tree - Syntax tree.
 * @return {Function} - Reference handler.
 */
function referenceFactory(tree) {
    var definitions = getDefinitions(tree);

    /**
     * Transform a reference based on bound `definitions`.
     *
     * @param {Node} node - Reference node.
     * @param {number} index - Position of `node` in
     *   `parent`
     * @param {Node} parent - Parent of `node`.
     */
    function reference(node, index, parent) {
        var definition = definitions(node.identifier);
        var replacement;

        if (definition) {
            if (node.type === 'imageReference') {
                replacement = {
                    'type': 'image',
                    'url': definition.url,
                    'title': definition.title,
                    'alt': node.alt
                };
            } else {
                replacement = {
                    'type': 'link',
                    'url': definition.url,
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
    var reference = referenceFactory(tree);

    remove(tree, 'definition');

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
