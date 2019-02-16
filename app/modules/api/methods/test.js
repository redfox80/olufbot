"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = require("./auth");

var _default = (req, res) => {
  if (!(0, _auth.checkToken)(req)) {
    res.sendStatus(403);
    return 0;
  }

  res.json({
    ok: "Everything is gucci"
  });
};

exports.default = _default;