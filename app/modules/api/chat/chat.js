"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../db/models/index");

var _auth = require("../methods/auth");

var _default = async (req, res) => {
  if (!(0, _auth.checkToken)(req)) {
    res.sendStatus(403);
    return 0;
  }

  let query = "SELECT * FROM olufbot.ChatLogs";

  if (req.body.queryParams) {
    if (typeof req.body.queryParams.guild === "string") console.log('1');
  }

  query += " LIMIT 4";
  let logs = await _index.sequelize.query(query, {
    type: _index.Sequelize.QueryTypes.SELECT
  }).then(res => {
    return res;
  }).catch(err => {
    console.error(err);
  });
  res.send(logs);
  console.log(JSON.stringify(logs));
  return 0;
};

exports.default = _default;