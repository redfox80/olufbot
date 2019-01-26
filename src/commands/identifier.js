import botsettings from '../botsettings.json';

import help from './commands/help.js';
import amisexy from './commands/amisexy.js';

export function command(message) {

    //Split up actual command and arguments
    let messageArray = message.content.split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);

    //verify bot prefix
    if(!command.startsWith(botsettings.prefix)) return;

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
    
            default: () => message.channel.send("Dafuq you talkin about!?"),
        };

        //Return command or unknown command response
        return (list[command.substr(1, command.length)] || list[`default`]);
    }

}