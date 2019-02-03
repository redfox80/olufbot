"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join = join;
exports.leave = leave;
exports.play = play;
exports.stop = stop;

var vc = _interopRequireWildcard(require("../../services/voice/voice.js"));

var _player = require("../../services/voice/player.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function join(message, args) {
  var cid = null;

  if (args) {
    if (args[0]) {
      cid = args[0];
    }
  }

  vc.join(message, cid);
}

function leave(message, args) {
  var cid = null;

  if (args) {
    if (args[0]) {
      cid = args[0];
    }
  }

  vc.leave(message, cid);
}

function play(message, args) {
  var gid = message.guild.id;

  if (args) {
    if (args[0]) {
      gid = args[0];
    }
  }

  (0, _player.play)(gid);
  message.react("✅");
}

function stop(message, args) {
  var gid = message.guild.id;

  if (args) {
    if (args[0]) {
      gid = args[0];
    }
  }

  (0, _player.stop)(gid);
  message.react("✅");
}