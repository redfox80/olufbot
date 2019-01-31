'use strict';

module.exports = function (sequelize, DataTypes) {
  var guildLog = sequelize.define('guildLog', {
    gid: DataTypes.STRING,
    text: DataTypes.BOOLEAN,
    images: DataTypes.BOOLEAN
  }, {});

  guildLog.associate = function (models) {// associations can be defined here
  };

  return guildLog;
};