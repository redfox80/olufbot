"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _botsettings = _interopRequireDefault(require("../../botsettings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(message) {
  var commands = [{
    name: "help",
    desc: "Shows this message"
  }, {
    name: "fuckme",
    desc: "Yaaas!"
  }, {
    name: "amisexy",
    desc: "Oluf never lies, answers are final!"
  }];
  var help = "```You can use the following commands";

  for (var y = 0; y < commands.length; y++) {
    help = help + "\n\n" + _botsettings.default.prefix + commands[y].name + "\n" + commands[y].desc;
  }

  help = help + "```";
  message.author.send(help);
  message.react("✅");
}