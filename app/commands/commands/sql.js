"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var db = _interopRequireWildcard(require("../../modules/db/mysql.js"));

var _index = require("../../modules/db/models/index.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = function _default(message) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (args) {
    if (args[0] === "test") {
      testSQL(message);
      return 0;
    }
  }

  message.channel.send('You need to supply arguments for this command!');
};

exports.default = _default;

function testSQL(message) {
  // message.channel.send('This command does not work yet!');
  _index.guildLog.all().then(function (res) {
    console.log(res[0].gid);
  }).catch(function (err) {
    console.log(err);
  }); //console.log(db.test());

}