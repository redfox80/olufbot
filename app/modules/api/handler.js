"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const apiServer = (0, _express.default)();
const port = 8080;
const sPort = 8443; //Becayse, exports

var _default = () => {
  return ":)";
}; //Apply middlewares


exports.default = _default;
apiServer.use('*', (0, _cors.default)({
  origin: true
}));
apiServer.use('/api', _bodyParser.default.urlencoded({
  extended: true
}));
apiServer.use('/api', _bodyParser.default.json()); //Routes defined in routes.js

(0, _routes.routes)(apiServer);
const options = {
  key: _fs.default.readFileSync('/webdev/STAR-fungy-no/server.key'),
  cert: _fs.default.readFileSync('/webdev/STAR-fungy-no/STAR-fungy-no.crt')
}; // apiServer.listen(port, () => console.log(`API listening on port ${port}`));

_http.default.createServer(apiServer).listen(port);

_https.default.createServer(options, apiServer).listen(sPort);