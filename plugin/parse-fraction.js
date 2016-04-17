'use strict';

const flattenNodes = require('../lib/flatten-nodes.js');

module.exports = function () {
	return function (stylus) {
		parseFraction.raw = true;
		stylus.define('parse-fraction', parseFraction);

		function parseFraction() {
			let args = flattenNodes(Array.from(arguments)).map(o => o.val);

			if (args[1] === '/') {
				return new stylus.nodes.Unit(args[0] / args[2]);;
			}

			if (typeof args[0] === 'string' && ~args[0].indexOf('/')) {
				let parts = args[0].split('/');
				return new stylus.nodes.Unit(parts[0] / parts[1]);
			}

			return new stylus.nodes.Unit(args[0] * 1);
		}
	}
};