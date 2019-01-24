"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var cache = [];

function _default(message) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (args) {
    if (args[0] === "cache" && args[1] === "print") {
      printCache(message);
      return 0;
    } else if (args[0] === "cache" && args[1] === "clear") {
      clearCache(message);
      return 0;
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

  var response = user.sexy ? 'HELL YEAH BITCH!' : 'HELL NO!';
  message.channel.send(response);
}

function printCache(message) {
  var response = "";

  for (var i = 0; i < cache.length; i++) {
    response = "".concat(response, " ").concat(cache[i].id, ": ").concat(cache[i].sexy, "\n");
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