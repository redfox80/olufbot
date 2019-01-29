import * as db from "../../modules/mysql.js";

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
    message.channel.send('This command does not work yet!');
    //console.log(db.test());
}