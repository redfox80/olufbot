"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _botsettings = _interopRequireDefault(require("../../botsettings.json"));

var logger = _interopRequireWildcard(require("../../services/logger/logger.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (message, args = null) => {
  if (message.author.id != "203851266453929984") {
    message.channel.send(`${message.member.displayName} does not have permission to use \`${_botsettings.default.prefix}log\` command`);
    return 0;
  }

  if (args) {
    if (args[0] === "add") {
      add(message, args);
      return 0;
    } else if (args[0] === "remove") {
      remove(message, args);
      return 0;
    } else if (args[0] === "?") {
      check(message, args);
      return 0;
    }
  }

  message.channel.send('You must supply an argument for this command!');
};

exports.default = _default;

async function add(message, args) {
  let gid = message.guild.id;

  if ((await logger.addGuild(gid)) === true) {
    message.react("✅");
  } else {
    message.react("❌");
  }
}

async function remove(message, args) {
  let gid = message.guild.id; // logger.removeGuild(gid);

  if (await logger.removeGuild(gid)) {
    message.react("✅");
  } else {
    message.react("❌");
  }
}

async function check(message, args) {
  let gid = message.guild.id;

  if ((await logger.checkGuild(gid)) === true) {
    message.channel.send(`${message.guild.name} is beeing logged`);
  } else {
    message.channel.send(`${message.guild.name} is not beeing logged`);
  }
}