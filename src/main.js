#!/usr/bin/env node

require('babel-polyfill');

import botsettings from './botsettings.json';
import Discord from 'discord.js';
import * as identifier from './commands/identifier.js';

const bot = new Discord.Client(botsettings.clientSettings);

bot.on("ready", async () => {
    console.log(`${bot.user.username} bot is ready!`);

    //set game for bot
    bot.user.setPresence({
        game: {
            name: `with children | ${botsettings.prefix}help`
        }
    });

    //Generate invite and log to console
    bot.generateInvite(8)
        .then(link => console.log(`Generated bot invite link: ${link}`))
        .catch(err => {
            console.log(err.stack);
        });

});

//Message listener
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    identifier.command(message);

    return 0;

    
});

//Authenticate bot to discord api
bot.login(botsettings.token);