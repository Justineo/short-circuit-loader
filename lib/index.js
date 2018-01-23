'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loader;

var _loaderUtils = require('loader-utils');

var DEFAULT_EXPR = 'typeof window !== \'undefined\'';

function loader(content) {
  var _ref = (0, _loaderUtils.getOptions)(this) || {},
      _ref$expr = _ref.expr,
      expr = _ref$expr === undefined ? DEFAULT_EXPR : _ref$expr;

  return 'if (' + expr + ') {\n' + content + '\n}';
}
module.exports = exports['default'];