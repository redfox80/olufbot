"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../../../data/config.json"));

var _fs = _interopRequireDefault(require("fs"));

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helpers = require("./helpers");

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Becayse, exports
var _default = () => {
  return ":)";
}; //If api is not enabled in config don't do anything...


exports.default = _default;

if (_config.default.api.enabled) {
  //Define stuff
  const apiServer = (0, _express.default)();
  const port = _config.default.api.port;
  const sPort = _config.default.api.sPort; //Apply middlewares

  apiServer.use('*', (0, _cors.default)({
    origin: true
  }));
  apiServer.use('/api', _bodyParser.default.urlencoded({
    extended: true
  }));
  apiServer.use('/api', _bodyParser.default.json());
  apiServer.use('/api', _helpers.verifyInput); //Routes defined in routes.js

  (0, _routes.routes)(apiServer); //Options for https module

  const options = {
    key: _fs.default.readFileSync(_config.default.api.key),
    cert: _fs.default.readFileSync(_config.default.api.cert)
  }; // apiServer.listen(port, () => console.log(`API listening on port ${port}`));

  _http.default.createServer(apiServer).listen(port);

  _https.default.createServer(options, apiServer).listen(sPort);
}