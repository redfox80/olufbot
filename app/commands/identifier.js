"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command = command;

var _botsettings = _interopRequireDefault(require("../botsettings.json"));

var _help = _interopRequireDefault(require("./commands/help.js"));

var _amisexy = _interopRequireDefault(require("./commands/amisexy.js"));

var _sql = _interopRequireDefault(require("./commands/sql.js"));

var _log = _interopRequireDefault(require("./commands/log.js"));

var _yeet = _interopRequireDefault(require("./commands/yeet.js"));

var voice = _interopRequireWildcard(require("./commands/voice.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function command(message, command, args) {
  //Get appropiate command
  let res = commands(); //Run command

  res();

  function commands() {
    //Object containing all commands
    let list = {
      fuckme: () => message.channel.send("You got it boss!"),
      help: () => (0, _help.default)(message),
      amisexy: () => (0, _amisexy.default)(message, args),
      sql: () => (0, _sql.default)(message, args),
      log: () => (0, _log.default)(message, args),
      join: () => voice.join(message, args),
      leave: () => voice.leave(message, args),
      play: () => voice.play(message, args),
      stop: () => voice.stop(message, args),
      yeet: () => (0, _yeet.default)(message, args),
      default: () => message.channel.send("Dafuq you talkin about!?")
    }; //Return command or unknown command response

    return list[command.substr(1, command.length)] || list[`default`];
  }
}