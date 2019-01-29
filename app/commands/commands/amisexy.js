"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = [];

function _default(message) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var cacheFilePath = "".concat(__dirname, "/../../cache/amisexy_cache.json"); //Load cache file if it exists

  if (_fs.default.existsSync(cacheFilePath)) {
    cache = JSON.parse(_fs.default.readFileSync(cacheFilePath, "utf8"));
  } else {
    _fs.default.writeFileSync(cacheFilePath, JSON.stringify("[]"));
  } //Check for arguments and run appropiate function if present


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
  } //Declaring for later use


  var user = false; //Check if user is allready in cache

  for (var i in cache) {
    if (cache[i].id == message.author.id) {
      user = cache[i];
      break;
    }
  } //If not in cache, create new cache object


  if (!user) {
    var rand = Math.random();
    user = {
      id: message.author.id,
      username: message.author.username,
      displayname: message.member.displayName,
      sexy: rand > 0.7 ? true : false
    };
    cache.push(user); //Write changes to cache

    _fs.default.writeFile(cacheFilePath, JSON.stringify(cache, null, 4), function (error) {
      if (error) console.log(error.stack);
    });
  } //Determine appropiate response


  var response = user.sexy ? "".concat(message.member.displayName, " IS HELLA SEXY!") : 'HELL NO!'; //Respond

  message.channel.send(response);
} //Prints out cache


function printCache(message) {
  var response = "";

  for (var i in cache) {
    response = "".concat(response).concat(cache[i].id, " - ").concat(cache[i].displayname, ": ").concat(cache[i].sexy, "\n");
  }

  response = "".concat(response, "\n");

  if (response != "\n" && response != null) {
    message.channel.send(response);
  } else {
    message.channel.send('Cache is empty');
  }
} //Clears cache if authorized user


function clearCache(message) {
  if (message.author.id != "203851266453929984") {
    message.channel.send('You do not have permission to do this!');
    return 0;
  }

  cache = [];

  _fs.default.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 4), function (error) {
    if (error) console.log(error.stack);
  });

  message.channel.send('Cache cleared!');
}