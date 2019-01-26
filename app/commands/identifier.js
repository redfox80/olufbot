"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command = command;

var _botsettings = _interopRequireDefault(require("../botsettings.json"));

var _help2 = _interopRequireDefault(require("./commands/help.js"));

var _amisexy2 = _interopRequireDefault(require("./commands/amisexy.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function command(message) {
  //Split up actual command and arguments
  var messageArray = message.content.split(' ');
  var command = messageArray[0];
  var args = messageArray.slice(1); //verify bot prefix

  if (!command.startsWith(_botsettings.default.prefix)) return; //Get appropiate command

  var res = commands(); //Run command

  res();

  function commands() {
    //Object containing all commands
    var list = {
      fuckme: function fuckme() {
        return message.channel.send("You got it boss!");
      },
      help: function help() {
        return (0, _help2.default)(message);
      },
      amisexy: function amisexy() {
        return (0, _amisexy2.default)(message, args);
      },
      default: function _default() {
        return message.channel.send("Dafuq you talkin about!?");
      }
    }; //Return command or unknown command response

    return list[command.substr(1, command.length)] || list["default"];
  }
}