module.exports = function (opts) {
	return function (stylus) {
		stylus.include(__dirname);
	}
};