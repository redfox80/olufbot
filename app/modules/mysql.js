"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;
exports.test = test;

var _mysql = _interopRequireDefault(require("mysql"));

var _botsettings = _interopRequireDefault(require("../botsettings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connect() {
  return _mysql.default.createConnection({
    host: _botsettings.default.sql.host,
    user: _botsettings.default.sql.user,
    password: _botsettings.default.sql.password,
    database: _botsettings.default.sql.database
  });
}

function disconnect(connection) {
  if (connection != null) {
    connection.end();
    connection = null;
  }
}

function queryF(connection, qs) {
  connection.query(qs, function (error, results, fields) {
    if (error) console.log('ERROR\n' + error);
    return "Hi there";
  });
  return "hei?";
}

function query(qs) {
  var connection = connect();
  var res = queryF(connection, qs);
  disconnect(connection);
  return res;
}

function test() {
  connect();
  var res = queryF("SELECT version()");
  disconnect();
  return res;
}