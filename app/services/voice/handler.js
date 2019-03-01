"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _voice = require("./voice.js");

var _main = require("../../main");

var _default = async () => {
  //Join channels select with join command
  setInterval(() => {
    let shouldJoin = (0, _voice.ServersToJoin)();
    let shouldLeave = (0, _voice.ServersToLeave)();
    if (shouldJoin.length < 1 && shouldLeave.length < 1) return 0;

    for (let i in shouldJoin) {
      _main.bot.channels.get(shouldJoin[i]).join().catch(err => {
        console.error(err);
      });
    }

    for (let i in shouldLeave) {
      _main.bot.channels.get(shouldLeave[i].disconnect()).catch(err => {
        console.error(err);
      });
    }
  }, 1500);
};

exports.default = _default;