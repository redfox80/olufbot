"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _botsettings = _interopRequireDefault(require("../../botsettings.json"));

var logger = _interopRequireWildcard(require("../../services/logger/logger.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(message) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (message.author.id != "203851266453929984") {
    message.channel.send("".concat(message.member.displayName, " does not have permission to use `").concat(_botsettings.default.prefix, "log` command"));
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

function add(_x, _x2) {
  return _add.apply(this, arguments);
}

function _add() {
  _add = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(message, args) {
    var gid;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            gid = message.guild.id;
            _context.next = 3;
            return logger.addGuild(gid);

          case 3:
            _context.t0 = _context.sent;

            if (!(_context.t0 === true)) {
              _context.next = 8;
              break;
            }

            message.react("✅");
            _context.next = 9;
            break;

          case 8:
            message.react("❌");

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _add.apply(this, arguments);
}

function remove(_x3, _x4) {
  return _remove.apply(this, arguments);
}

function _remove() {
  _remove = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(message, args) {
    var gid;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            gid = message.guild.id; // logger.removeGuild(gid);

            _context2.next = 3;
            return logger.removeGuild(gid);

          case 3:
            if (!_context2.sent) {
              _context2.next = 7;
              break;
            }

            message.react("✅");
            _context2.next = 8;
            break;

          case 7:
            message.react("❌");

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _remove.apply(this, arguments);
}

function check(_x5, _x6) {
  return _check.apply(this, arguments);
}

function _check() {
  _check = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(message, args) {
    var gid;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            gid = message.guild.id;
            _context3.next = 3;
            return logger.checkGuild(gid);

          case 3:
            _context3.t0 = _context3.sent;

            if (!(_context3.t0 === true)) {
              _context3.next = 8;
              break;
            }

            message.channel.send("".concat(message.guild.name, " is beeing logged"));
            _context3.next = 9;
            break;

          case 8:
            message.channel.send("".concat(message.guild.name, " is not beeing logged"));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _check.apply(this, arguments);
}