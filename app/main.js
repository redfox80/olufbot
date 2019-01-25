#!/usr/bin/env node
"use strict";

var _botsettings = _interopRequireDefault(require("./botsettings.json"));

var _discord = _interopRequireDefault(require("discord.js"));

var identifier = _interopRequireWildcard(require("./commands/identifier.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('babel-polyfill');

var bot = new _discord.default.Client(_botsettings.default.clientSettings);
bot.on("ready",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("".concat(bot.user.username, " bot is ready!"));
          bot.user.setPresence({
            game: {
              name: "with children | ".concat(_botsettings.default.prefix, "help")
            }
          });
          bot.generateInvite(8).then(function (link) {
            return console.log("Generated bot invite link: ".concat(link));
          }).catch(function (err) {
            console.log(err.stack);
          });

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

          case 6:
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
bot.login(_botsettings.default.token);