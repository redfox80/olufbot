"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import https from "https";
const apiServer = (0, _express.default)();
const port = 8080;

var _default = () => {
  return ":)";
};

exports.default = _default;
apiServer.use('/api', _bodyParser.default.json());
apiServer.post('/api', (req, res) => {
  if (req.body.token) {
    if (req.body.token === "Joakim er kul!") {
      let a = req.body.a;
      let b = req.body.b;
      let result = a + b;
      res.send(JSON.stringify(result));
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});
apiServer.get('*', (req, res) => {
  res.status(200).send('OK');
});
const options = {
  key: _fs.default.readFileSync('/webdev/STAR-fungy-no/server.key'),
  cert: _fs.default.readFileSync('/webdev/STAR-fungy-no/cerver.crt')
};
apiServer.listen(port, () => console.log(`API listening on port ${port}`)); // https.createServer(app).listen(8443);