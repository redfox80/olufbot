"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _botsettings = _interopRequireDefault(require("../../botsettings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cacheFilePath = "".concat(__dirname, "/../../cache/log_cache.json");
var logCache = []; //Generate empty cache file if not present

if (!_fs.default.existsSync(cacheFilePath)) {
  _fs.default.writeFileSync(cacheFilePath, JSON.stringify([]));
}

var cacheStoreInterval = setInterval(function () {
  if (logCache.length > 0) {
    console.log('stored cache');
    var cacheFile = JSON.parse(_fs.default.readFileSync(cacheFilePath, "utf8"));
    var logCacheTemp = logCache;
    logCache = [];

    for (var i in logCacheTemp) {
      cacheFile.push(logCacheTemp[i]);
    }

    _fs.default.writeFileSync(cacheFilePath, JSON.stringify(cacheFile, null, 4));
  }
}, 60000);

var _default = function _default(message) {
  var log = false;

  for (var i in _botsettings.default.logGuilds) {
    if (_botsettings.default.logGuilds[i] === message.guild.id) {
      log = true;
      break;
    }
  }

  if (!log) return 0;
  var event = {
    message: message.content,
    author: {
      id: message.author.id,
      username: message.author.username,
      displayname: message.member.displayName
    },
    guild: {
      id: message.guild.id,
      name: message.guild.name
    },
    channel: {
      name: message.channel.name
    },
    createdTimestamp: message.createdTimestamp
  };
  logCache.push(event);
};

exports.default = _default;