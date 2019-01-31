import * as db from "../../modules/db/mysql.js";

import {guildLog} from "../../modules/db/models/index.js";

export default (message, args=null) => {

    if(args) {

        if(args[0] === "test") {
            testSQL(message);
            return 0;
        }
    }

    message.channel.send('You need to supply arguments for this command!');
}

function testSQL(message) {
    // message.channel.send('This command does not work yet!');
    guildLog.all()
        .then(res => {
            console.log(res[0].gid);
        })
        .catch(err => {
            console.log(err);
        });
    //console.log(db.test());
}