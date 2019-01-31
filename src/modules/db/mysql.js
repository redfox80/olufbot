import Sequelize from "sequelize";

import botsettings from "../../botsettings.json";

let dbReady = false;

const db = botsettings.sql.database;
const user = botsettings.sql.user;
const pass = botsettings.sql.password;
const host = botsettings.sql.host;

const sequelize = new Sequelize(db, user, pass, {
    host: host,
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        dbReady = true;
        console.log('Connected to DB');
    })
    .catch(err => {
        console.error('Unable to connect to DB!', err);
    })

export function test() {
    return "test";
}