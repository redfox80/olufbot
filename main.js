#!/usr/bin/env node
const botsettings = require('./botsettings.json');
const Discord = require('discord.js');

const bot = new Discord.Client(botsettings.clientSettings);

bot.on("ready", async () => {
    console.log(`Bot is ready! ${bot.user.username}`);

    bot.user.setPresence({
        game: {
            name: 'with children | +help'
        }
    });

    bot.generateInvite(215104)
        .then(link => console.log(`Generated bot invite link: ${link}`))
        .catch(err => {
            console.log(err.stack);
        });

    // let link = await bot.generateInvite(215104);

});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split();
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(botsettings.prefix)) return;

    switch(command.substr(1, command.length))
    {
        case "fuckme":
            message.channel.send("You got it boss");
            break;

        case "help":

            let commands = [
                {
                    name: "help",
                    desc: "Shows this message"
                },
                {
                    name: "fuckme",
                    desc: "Yaaas!"
                },
                {
                    name: "amisexy",
                    desc: "Oluf never lies, answers are final!"
                }
            ];
        
            let help = "```You can use the following commands";
        
            for(y = 0; y < commands.length; y++) {
                help = help + "\n\n" + botsettings.prefix + commands[y].name + "\n" + commands[y].desc; 
            }
        
            help = help + "```";
        
            message.author.send(help);
            message.react("✅");
            break;

        case "amisexy":
            let r = Math.random();
            if(r > 0.7)
            {
                message.channel.send("HELL YEAH BITCH!");
            } else {
                message.channel.send("HELL NO!");
            }
            break;

        default:
            message.channel.send("Dafuq you talkin about!?");
            break;
    }
});

bot.login(botsettings.token);

function help() {
    return new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setDescription("Available commands")
        .setField(botsettings.prefix+'help', 'This message')
        .setField(botsettings.prefix+'fuckme', 'You got it boss, Kappa');
}