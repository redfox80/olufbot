"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = checkToken;
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _config = _interopRequireDefault(require("../../../../data/config.json"));

var _index = require("../../db/models/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let sessions = [];

var _default = async (req, res) => {
  //Validate input format
  if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string') {
    res.status(400).send('Bad Request');
    return 0;
  } //Find user in db


  let user = await _index.User.findOne({
    where: {
      username: req.body.username
    },
    attributes: ['id', 'username', 'password']
  }).then(user => {
    return user;
  }); //If no match in DB send 403 status

  if (!user) {
    res.status(403).send('Invalid credentials');
    return 0;
  } //Check password


  const hash = _crypto.default.createHmac('sha512', _config.default.hashSecret);

  hash.update(req.body.password);
  const hashed = hash.digest("hex");

  if (user.password !== hashed) {
    res.status(403).send('Invalid credentials');
    return 0;
  } //Valid chars for a random token


  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = ""; //Generate random token

  for (let i = 0; i < 30; i++) {
    token += possible.charAt(Math.floor(Math.random() * possible.length));
  } //Response to client


  let rjson = {
    token: token,
    time: new Date()
  };
  console.log(JSON.stringify(rjson)); //Add token to sessions list and send to client

  sessions.push(rjson);
  res.json(rjson);
  return 0;
};

exports.default = _default;

function checkToken(req) {
  if (typeof req.body.token !== 'string') {
    return false;
  }

  for (let i in sessions) {
    if (sessions[i].token === req.body.token) {
      return true;
    }
  }

  return false;
}