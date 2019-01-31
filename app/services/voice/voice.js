"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join = join;

function join(message) {
  var cid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!message.member.voiceChannel) {
    message.channel.send('You must be in a voice channel!');
    return 0;
  }

  message.member.voiceChannel.join();
}