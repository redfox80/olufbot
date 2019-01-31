"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command = command;

var _botsettings = _interopRequireDefault(require("../botsettings.json"));

var _help2 = _interopRequireDefault(require("./commands/help.js"));

var _amisexy2 = _interopRequireDefault(require("./commands/amisexy.js"));

var _sql2 = _interopRequireDefault(require("./commands/sql.js"));

var _log2 = _interopRequireDefault(require("./commands/log.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function command(message, command, args) {
  //Get appropiate command
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
      sql: function sql() {
        return (0, _sql2.default)(message, args);
      },
      log: function log() {
        return (0, _log2.default)(message, args);
      },
      default: function _default() {
        return message.channel.send("Dafuq you talkin about!?");
      }
    }; //Return command or unknown command response

    return list[command.substr(1, command.length)] || list["default"];
  }
}