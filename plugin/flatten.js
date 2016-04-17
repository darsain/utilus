'use strict';

const flattenNodes = require('../lib/flatten-nodes');

module.exports = function () {
	return function (stylus) {
		flatten.raw = true;
		stylus.define('flatten', flatten);

		function flatten() {
			let expr = new stylus.nodes.Expression();
			expr.nodes = flattenNodes(Array.from(arguments));
			return expr;
		}
	};
};