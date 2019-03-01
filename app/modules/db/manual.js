"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("./config/config.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = () => {
  return new _sequelize.default(_config.default.database, _config.default.username, _config.default.password, _config.default);
};

exports.default = _default;