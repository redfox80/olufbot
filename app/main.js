#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bot = void 0;

var _botsettings = _interopRequireDefault(require("./botsettings.json"));

var _discord = _interopRequireDefault(require("discord.js"));

var identifier = _interopRequireWildcard(require("./commands/identifier.js"));

var _logger = _interopRequireDefault(require("./services/logger/logger.js"));

var _image = _interopRequireDefault(require("./modules/report_generator/image"));

var _scheduler = _interopRequireDefault(require("./modules/report_generator/scheduler"));

var _handler = _interopRequireDefault(require("./modules/api/handler"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

// apiHandler();
const bot = new _discord.default.Client(_botsettings.default.clientSettings);
exports.bot = bot;
bot.on("ready", async () => {
  console.log(`${bot.user.username} bot is ready!`); //set game for bot

  bot.user.setPresence({
    game: {
      name: `with children | ${_botsettings.default.prefix}help`
    }
  }); //Generate invite and log to console

  bot.generateInvite(3374144).then(link => console.log(`Generated bot invite link: ${link}`)).catch(err => {
    console.log(err.stack);
  });
  (0, _scheduler.default)();
}); //Message listener

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return; //Split up actual command and arguments

  let messageArray = message.content.split(' ');
  let command = messageArray[0];
  let args = messageArray.slice(1); //verify bot prefix

  if (command.startsWith(_botsettings.default.prefix)) {
    identifier.command(message, command, args);
  }

  (0, _logger.default)(message);
  return 0;
}); //Authenticate bot to discord api

bot.login(_botsettings.default.token);