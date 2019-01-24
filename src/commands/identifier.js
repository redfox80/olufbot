import botsettings from '../botsettings.json';

import help from './commands/help.js';
import amisexy from './commands/amisexy.js';

export function command(message) {

    let messageArray = message.content.split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(botsettings.prefix)) return;
    
    switch(command.substr(1, command.length))
    {
        case "fuckme":
            message.channel.send("You got it boss");
            break;
            
        case "help":
            help(message);
            break;

        case "amisexy":
            amisexy(message, args);
            break;

        default:
            message.channel.send('Dafuq you talkin about!?');
            break;
    }

}