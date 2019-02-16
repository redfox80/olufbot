"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = routes;

var _auth = _interopRequireDefault(require("./methods/auth"));

var _test = _interopRequireDefault(require("./methods/test"));

var _chat = _interopRequireDefault(require("./methods/chat/chat"));

var _guilds = _interopRequireDefault(require("./methods/chat/guilds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(apiServer) {
  apiServer.post('/api', (req, res) => {
    if (req.body.token) {
      if (req.body.token === "Joakim er kul!") {
        let a = req.body.a;
        let b = req.body.b;
        let result = a + b;
        res.send(JSON.stringify(result));
      } else {
        res.status(403).send('Denied');
      }
    } else {
      res.status(400).send('Bad Request');
    }
  });
  apiServer.post('/api/auth', (req, res) => {
    (0, _auth.default)(req, res);
  });
  apiServer.post('/api/test', (req, res) => {
    (0, _test.default)(req, res);
  });
  apiServer.post('/api/chat', (req, res) => {
    (0, _chat.default)(req, res);
  });
  apiServer.post('/api/chat/guilds', (req, res) => (0, _guilds.default)(req, res));
  apiServer.get('/', (req, res) => {
    res.status(200).send('OK');
  });
}