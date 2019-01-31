"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGuild = addGuild;
exports.removeGuild = removeGuild;
exports.checkGuild = checkGuild;
exports.default = void 0;

var _index = require("../../modules/db/models/index.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('babel-polyfill');

//Cache before pushed to file/db
var logCache = []; //Array of guilds to log from

var serversToLog = []; //Update serverToLog variable from db

updateServersToLog(); //Store log cache to db if not empty

var cacheStoreInterval = setInterval(function () {
  if (logCache.length > 0) {
    var logCacheTemp = logCache;
    logCache = [];

    _index.ChatLog.bulkCreate(logCacheTemp).catch(function (err) {
      console.error(err);
    });
  }
}, 60000); //60 Seconds between each storage attempt
//Log function

var _default = function _default(message) {
  var log = false;

  for (var i in serversToLog) {
    if (serversToLog[i] === message.guild.id) {
      log = true;
      break;
    }
  }

  if (!log) return 0;
  var event = {
    message: message.content,
    author_id: message.author.id,
    author_username: message.author.username,
    author_displayname: message.member.displayName,
    guild_id: message.guild.id,
    guild_name: message.guild.name,
    channel_name: message.channel.name,
    sent_at: message.createdTimestamp
  };
  logCache.push(event);
}; //Add guild to log group


exports.default = _default;

function addGuild(_x) {
  return _addGuild.apply(this, arguments);
}

function _addGuild() {
  _addGuild = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(gid) {
    var text,
        images,
        currentGuilds,
        i,
        res,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
            images = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            _context.next = 4;
            return _index.guildLog.findAll().then(function (qr) {
              currentGuilds = qr;
            }).catch(function (err) {
              console.error(err);
            });

          case 4:
            _context.t0 = regeneratorRuntime.keys(currentGuilds);

          case 5:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 11;
              break;
            }

            i = _context.t1.value;

            if (!(currentGuilds[i].gid === gid)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", true);

          case 9:
            _context.next = 5;
            break;

          case 11:
            res = false;
            _context.next = 14;
            return _index.guildLog.create({
              gid: gid,
              text: text,
              images: images
            }).then(function () {
              updateServersToLog();
              res = true;
            }).catch(function (err) {
              console.error(err);
              res = false;
            });

          case 14:
            return _context.abrupt("return", res);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _addGuild.apply(this, arguments);
}

function removeGuild(_x2) {
  return _removeGuild.apply(this, arguments);
}

function _removeGuild() {
  _removeGuild = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(gid) {
    var res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = false;
            _context2.next = 3;
            return _index.guildLog.destroy({
              where: {
                gid: gid
              }
            }).then(function () {
              res = true;
              updateServersToLog();
            }).catch(function (err) {
              console.error(err);
            });

          case 3:
            return _context2.abrupt("return", res);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _removeGuild.apply(this, arguments);
}

function checkGuild(_x3) {
  return _checkGuild.apply(this, arguments);
} //Update log group cache var from db


function _checkGuild() {
  _checkGuild = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(gid) {
    var res;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res = false;
            _context3.next = 3;
            return _index.guildLog.findOne({
              where: {
                gid: gid
              }
            }).then(function (Guild) {
              if (Guild != null) {
                res = true;
              }
            }).catch(function (err) {
              console.error(err);
            });

          case 3:
            return _context3.abrupt("return", res);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _checkGuild.apply(this, arguments);
}

function updateServersToLog() {
  _index.guildLog.findAll().then(function (res) {
    var temp = [];

    for (var i in res) {
      temp.push(res[i].gid);
    }

    serversToLog = temp;
    return 0;
  }).catch(function (err) {
    console.error(err);
    return 1;
  });
}