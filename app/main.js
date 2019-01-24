#!/usr/bin/env node
"use strict";

var identifier = _interopRequireWildcard(require("./commands/identifier.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('babel-polyfill');

var botsettings = require('./botsettings.json');

var Discord = require('discord.js');

var bot = new Discord.Client(botsettings.clientSettings);
bot.on("ready",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Bot is ready! ".concat(bot.user.username));
          bot.user.setPresence({
            game: {
              name: 'with children | ' + botsettings.prefix + 'help'
            }
          });
          bot.generateInvite(8).then(function (link) {
            return console.log("Generated bot invite link: ".concat(link));
          }).catch(function (err) {
            console.log(err.stack);
          }); // let link = await bot.generateInvite(215104);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
bot.on("message",
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(message) {
    var commands, _help, r;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!message.author.bot) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            if (!(message.channel.type === "dm")) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return");

          case 4:
            identifier.command(message);
            return _context2.abrupt("return", 0);

          case 9:
            message.channel.send("You got it boss");
            return _context2.abrupt("break", 23);

          case 11:
            commands = [{
              name: "help",
              desc: "Shows this message"
            }, {
              name: "fuckme",
              desc: "Yaaas!"
            }, {
              name: "amisexy",
              desc: "Oluf never lies, answers are final!"
            }];
            _help = "```You can use the following commands";

            for (y = 0; y < commands.length; y++) {
              _help = _help + "\n\n" + botsettings.prefix + commands[y].name + "\n" + commands[y].desc;
            }

            _help = _help + "```";
            message.author.send(_help);
            message.react("✅");
            return _context2.abrupt("break", 23);

          case 18:
            r = Math.random();

            if (r > 0.7) {
              message.channel.send("HELL YEAH BITCH!");
            } else {
              message.channel.send("HELL NO!");
            }

            return _context2.abrupt("break", 23);

          case 21:
            message.channel.send("Dafuq you talkin about!?");
            return _context2.abrupt("break", 23);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
bot.login(botsettings.token);

function help() {
  return new Discord.RichEmbed().setAuthor(bot.user.username).setDescription("Available commands").setField(botsettings.prefix + 'help', 'This message').setField(botsettings.prefix + 'fuckme', 'You got it boss, Kappa');
}