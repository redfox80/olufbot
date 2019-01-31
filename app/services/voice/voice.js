"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join = join;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function join(_x) {
  return _join.apply(this, arguments);
}

function _join() {
  _join = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(message) {
    var cid,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cid = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;

            if (message.member.voiceChannel) {
              _context.next = 4;
              break;
            }

            message.channel.send('You must be in a voice channel!');
            return _context.abrupt("return", 0);

          case 4:
            message.member.voiceChannel.join();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _join.apply(this, arguments);
}