import mysql from "mysql";
import botsettings from "../botsettings.json";

function connect() {
    return mysql.createConnection({
        host: botsettings.sql.host,
        user: botsettings.sql.user,
        password: botsettings.sql.password,
        database: botsettings.sql.database
    });
}

function disconnect(connection) {
    if(connection != null) {
        connection.end();
        connection = null;
    }
}

function queryF(connection, qs) {
    connection.query(qs, (error, results, fields) => {
        if(error) console.log('ERROR\n'+error);
        return "Hi there";
    });

    return "hei?";
}

export function query(qs) {

    let connection = connect();

    let res = queryF(connection, qs);
    
    disconnect(connection);

    return res;
}

export function test() {
    connect();
    let res = queryF("SELECT version()");
    disconnect();

    return res;
}