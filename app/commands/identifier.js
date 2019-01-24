"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command = command;

var _botsettings = _interopRequireDefault(require("../botsettings.json"));

var _help = _interopRequireDefault(require("./commands/help.js"));

var _amisexy = _interopRequireDefault(require("./commands/amisexy.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function command(message) {
  var messageArray = message.content.split(' ');
  var command = messageArray[0];
  var args = messageArray.slice(1);
  if (!command.startsWith(_botsettings.default.prefix)) return;

  switch (command.substr(1, command.length)) {
    case "fuckme":
      message.channel.send("You got it boss");
      break;

    case "help":
      (0, _help.default)(message);
      break;

    case "amisexy":
      (0, _amisexy.default)(message, args);
      break;

    default:
      message.channel.send('Dafuq you talkin about!?');
      break;
  }
}