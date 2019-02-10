#!/usr/bin/env node

require('babel-polyfill');

import botsettings from './botsettings.json';
import Discord from 'discord.js';
import * as identifier from './commands/identifier.js';
import logger from './services/logger/logger.js';
import report from './modules/report_generator/image';
import reportScheduler from './modules/report_generator/scheduler';
// import apiHandler from './modules/api/handler';

// apiHandler();

export const bot = new Discord.Client(botsettings.clientSettings);

bot.on("ready", async () => {
    console.log(`${bot.user.username} bot is ready!`);

    //set game for bot
    bot.user.setPresence({
        game: {
            name: `with children | ${botsettings.prefix}help`
        }
    });

    //Generate invite and log to console
    bot.generateInvite(3374144)
        .then(link => console.log(`Generated bot invite link: ${link}`))
        .catch(err => {
            console.log(err.stack);
        });
        
    reportScheduler();

});

//Message listener
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //Split up actual command and arguments
    let messageArray = message.content.split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);

    //verify bot prefix
    if(command.startsWith(botsettings.prefix)) {
        
        identifier.command(message, command, args);

    }

    logger(message);

    return 0;

    
});

//Authenticate bot to discord api
bot.login(botsettings.token);