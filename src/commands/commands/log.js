import botsettings from "../../botsettings.json";
import * as logger from "../../services/logger/logger.js";

export default (message, args=null) => {

    if(message.author.id != "203851266453929984") {
        message.channel.send(`${message.member.displayName} does not have permission to use \`${botsettings.prefix}log\` command`);
        return 0;
    }

    if(args) {
        if(args[0] === "add") {
            add(message, args);
            return 0;
        } else if(args[0] === "remove") {
            remove(message, args);
            return 0;
        } else if(args[0] === "?") {
            check(message, args);
            return 0;
        }
    }

    message.channel.send('You must supply an argument for this command!');
}

async function add(message, args) {

    let gid = message.guild.id;

    if(await logger.addGuild(gid) === true) {
        message.react("✅");
    } else {
        message.react("❌");
    }


}

async function remove(message, args) {

    let gid = message.guild.id;

    // logger.removeGuild(gid);

    if(await logger.removeGuild(gid)) {
        message.react("✅");
    } else {
        message.react("❌");
    }

}

async function check(message, args) {
    
    let gid = message.guild.id;

    if(await logger.checkGuild(gid) === true) {
        message.channel.send(`${message.guild.name} is beeing logged`);
    } else {
        message.channel.send(`${message.guild.name} is not beeing logged`);
    }
}