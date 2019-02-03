"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.play = play;
exports.stop = stop;

var _main = require("../../main.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var players = [];
var mummiPath = "".concat(__dirname, "/../../data/audio/mummi.mp3"); //Play

function play(_x) {
  return _play.apply(this, arguments);
}

function _play() {
  _play = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(gid) {
    var message,
        cp,
        connection,
        dispatcher,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            //Chack if something is allready playing in users voice channel
            cp = players.find(function (dispatcher) {
              return dispatcher.connection.channel.guild.id === gid;
            }); //If something is currently playing then stop it

            if (cp != null) {
              cp.dispatcher.end();
            } //Get the active connection


            connection = _main.bot.voiceConnections.find(function (connection) {
              return connection.channel.guild.id === gid;
            }); //Play a file

            try {
              dispatcher = connection.playFile(mummiPath).on('start', function () {
                dispatcher.setVolume(0.3);
              }).on('end', function () {
                players.splice(players.findIndex(function (player) {
                  return player.connection.channel.guild.id === gid;
                }), 1);
              });
            } catch (error) {
              console.error(error);
            } //Push to players array


            players.push({
              dispatcher: dispatcher,
              connection: connection
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _play.apply(this, arguments);
}

function stop(_x2) {
  return _stop.apply(this, arguments);
}

function _stop() {
  _stop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(gid) {
    var cp;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cp = players.find(function (ob) {
              return ob.connection.channel.guild.id === gid;
            });

            if (cp != null) {
              cp.dispatcher.setVolume(0);
              cp.dispatcher.end();
            }

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _stop.apply(this, arguments);
}