"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _default(message) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var cache = null;

  _fs.default.exists("amisexy_cache.json", function (exists) {
    if (exists) {
      cache = _fs.default.readFile("amisexy_cache.json");
    }
  });

  if (args) {
    if (args[0] === "cache") {
      if (args[1] === "print") {
        printCache(message);
        return 0;
      } else if (args[1] === "clear") {
        clearCache(message);
        return 0;
      }
    }
  }

  var newUser = true;
  var user = false;

  for (var i = 0; i < cache.length; i++) {
    if (cache[i].id = message.author.id) {
      newUser = false;
      user = cache[i];
      break;
    }
  }

  if (newUser) {
    var rand = Math.random();
    user = {
      id: message.author.id,
      sexy: rand > 0.7 ? true : false
    };
    cache.push(user);
  }

  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _fs.default.writeFile("amisexy_cache.json", cache);

            return _context.abrupt("return", 0);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  var response = user.sexy ? 'HELL YEAH BITCH!' : 'HELL NO!';
  message.channel.send(response);
}

function printCache(message) {
  var response = "";

  for (var i = 0; i < cache.length; i++) {
    response = "".concat(response).concat(cache[i].id, ": ").concat(cache[i].sexy, "\n");
  }

  response = "".concat(response, "\n");

  if (response != "\n" && response != null) {
    message.channel.send(response);
  } else {
    message.channel.send('Cache is empty');
  }
}

function clearCache(message) {
  if (message.author.id != "203851266453929984") {
    message.channel.send('You do not have permission to do this!');
    return 0;
  }

  cache = [];
  message.channel.send('Cache cleared!');
}