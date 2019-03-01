"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = routes;

var _helpers = require("./helpers");

var _auth = _interopRequireDefault(require("./methods/auth"));

var _test = _interopRequireDefault(require("./methods/test"));

var _chat = _interopRequireDefault(require("./methods/chat/chat"));

var _guilds = _interopRequireWildcard(require("./methods/chat/guilds"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(apiServer) {
  //Auth routes
  apiServer.post('/api/auth', (req, res) => (0, _auth.default)(req, res));
  apiServer.post('/api/test', (req, res) => (0, _test.default)(req, res)); //Chat logs

  apiServer.post('/api/chat', (req, res) => (0, _chat.default)(req, res));
  apiServer.post('/api/chat/guilds', (req, res) => (0, _guilds.default)(req, res));
  apiServer.post('/api/chat/guilds/add', (req, res) => (0, _guilds.addGuildToLog)(req, res));
  apiServer.post('/api/chat/guilds/remove', (req, res) => (0, _guilds.removeGuildToLog)(req, res));
}