'use strict';

module.exports = flattenNodes;

/**
 * Flattens `expr.nodes` array and returns it (the flattened array, not the `expr`).
 *
 * @param  {StylusObject} expr
 * @return {Array}
 */
function flattenNodes(nodes) {
	return nodes.reduce((acc, item) => {
		if (item.nodes) acc.push(...flattenNodes(item.nodes))
		else acc.push(item);
		return acc;
	}, []);
}