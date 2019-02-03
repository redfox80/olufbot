"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join = join;
exports.leave = leave;

var _main = require("../../main.js");

function join(message) {
  var cid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (cid != null && message.author.id === "203851266453929984") {
    _main.bot.channels.get(cid).join().catch(function (err) {
      console.error(err);
    });

    return 0;
  }

  if (!message.member.voiceChannel) {
    message.channel.send('You must be in a voice channel!');
    return 0;
  }

  message.member.voiceChannel.join();
}

function leave(message) {
  var cid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (cid != null && message.author.id === "203851266453929984") {
    var vc = _main.bot.voiceConnections.find(function (connection) {
      return connection.channel.id === cid;
    });

    vc.channel.leave();
    return 0;
  }

  if (!message.member.voiceChannel) {
    message.channel.send('No Voice channel specified');
    return 0;
  }

  message.member.voiceChannel.leave();
}