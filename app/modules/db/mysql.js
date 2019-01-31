"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = test;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _botsettings = _interopRequireDefault(require("../../botsettings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbReady = false;
var db = _botsettings.default.sql.database;
var user = _botsettings.default.sql.user;
var pass = _botsettings.default.sql.password;
var host = _botsettings.default.sql.host;
var sequelize = new _sequelize.default(db, user, pass, {
  host: host,
  dialect: 'mysql'
});
sequelize.authenticate().then(function () {
  dbReady = true;
  console.log('Connected to DB');
}).catch(function (err) {
  console.error('Unable to connect to DB!', err);
});

function test() {
  return "test";
}