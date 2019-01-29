import botsettings from '../botsettings.json';

import help from './commands/help.js';
import amisexy from './commands/amisexy.js';
import sql from './commands/sql.js';

export function command(message, command) {

    //Get appropiate command
    let res = commands();
    //Run command
    res();

    function commands() {

        //Object containing all commands
        let list = {
            fuckme: () => message.channel.send("You got it boss!"),
    
            help: () => help(message),
    
            amisexy: () => amisexy(message, args),

            sql: () => sql(message, args),
    
            default: () => message.channel.send("Dafuq you talkin about!?"),
        };

        //Return command or unknown command response
        return (list[command.substr(1, command.length)] || list[`default`]);
    }

}