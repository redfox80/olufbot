'use strict';

const crypto = require("crypto");
const config = require("../../../../data/config.json");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const hash = crypto.createHmac('sha512', config.hashSecret);
    hash.update('123');
    const hashed = hash.digest('hex');

    return queryInterface.bulkInsert('users', [{
      username: "joakim",
      password: hashed,
      firstname: "Joakim",
      lastname: "Førde",
      email: "joafor2@gmail.com"
    },{
      username: "Oluf",
      password: hashed,
      firstname: "Oluf",
      lastname: "Olufson",
      email: "fackingoluf@gmail.com"
    }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
