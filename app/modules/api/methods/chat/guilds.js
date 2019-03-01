"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGuildToLog = addGuildToLog;
exports.removeGuildToLog = removeGuildToLog;
exports.default = void 0;

var _auth = require("../auth");

var _index = require("../../../db/models/index");

var _default = async (req, res) => {
  if (!(0, _auth.checkToken)(req)) {
    res.sendStatus(403);
    return 0;
  }

  let guilds = await _index.guildLog.findAll().then(r => {
    return r;
  }).catch(err => console.error(err));
  res.send(guilds);
  return 0;
};

exports.default = _default;

async function addGuildToLog(req, res) {}

async function removeGuildToLog(req, res) {}