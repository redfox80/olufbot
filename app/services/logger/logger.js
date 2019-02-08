"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGuild = addGuild;
exports.removeGuild = removeGuild;
exports.checkGuild = checkGuild;
exports.default = void 0;

var _index = require("../../modules/db/models/index.js");

require('babel-polyfill');

//Cache before pushed to file/db
let logCache = []; //Array of guilds to log from

let serversToLog = []; //Update serverToLog variable from db

updateServersToLog(); //Store log cache to db if not empty

const cacheStoreInterval = setInterval(() => {
  if (logCache.length > 0) {
    let logCacheTemp = logCache;
    logCache = [];

    _index.ChatLog.bulkCreate(logCacheTemp).catch(err => {
      console.error(err);
    });
  }
}, 60000); //60 Seconds between each storage attempt
//Log function

var _default = message => {
  let log = false;

  for (let i in serversToLog) {
    if (serversToLog[i] === message.guild.id) {
      log = true;
      break;
    }
  }

  if (!log) return 0;
  let event = {
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

async function addGuild(gid, text = true, images = false) {
  let currentGuilds;
  await _index.guildLog.findAll().then(qr => {
    currentGuilds = qr;
  }).catch(err => {
    console.error(err);
  });

  for (let i in currentGuilds) {
    if (currentGuilds[i].gid === gid) {
      return true;
    }
  }

  let res = false;
  await _index.guildLog.create({
    gid: gid,
    text: text,
    images: images
  }).then(() => {
    updateServersToLog();
    res = true;
  }).catch(err => {
    console.error(err);
    res = false;
  });
  return res;
}

async function removeGuild(gid) {
  let res = false;
  await _index.guildLog.destroy({
    where: {
      gid: gid
    }
  }).then(() => {
    res = true;
    updateServersToLog();
  }).catch(err => {
    console.error(err);
  });
  return res;
}

async function checkGuild(gid) {
  let res = false;
  await _index.guildLog.findOne({
    where: {
      gid: gid
    }
  }).then(Guild => {
    if (Guild != null) {
      res = true;
    }
  }).catch(err => {
    console.error(err);
  });
  return res;
} //Update log group cache var from db


function updateServersToLog() {
  _index.guildLog.findAll().then(res => {
    let temp = [];

    for (let i in res) {
      temp.push(res[i].gid);
    }

    serversToLog = temp;
    return 0;
  }).catch(err => {
    console.error(err);
    return 1;
  });
}