'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ChatLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.STRING
      },
      author_username: {
        type: Sequelize.STRING
      },
      author_displayname: {
        type: Sequelize.STRING
      },
      guild_id: {
        type: Sequelize.STRING
      },
      guild_name: {
        type: Sequelize.STRING
      },
      channel_name: {
        type: Sequelize.STRING
      },
      sent_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ChatLogs');
  }
};