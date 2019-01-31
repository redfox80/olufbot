'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatLog = sequelize.define('ChatLog', {
    message: DataTypes.STRING,
    author_id: DataTypes.STRING,
    author_username: DataTypes.STRING,
    author_displayname: DataTypes.STRING,
    guild_id: DataTypes.STRING,
    guild_name: DataTypes.STRING,
    channel_name: DataTypes.STRING,
    sent_at: DataTypes.DATE
  }, {});
  ChatLog.associate = function(models) {
    // associations can be defined here
  };
  return ChatLog;
};