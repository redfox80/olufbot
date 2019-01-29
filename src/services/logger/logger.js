import fs from "fs";
import botSettings from "../../botsettings.json";

const cacheFilePath = `${__dirname}/../../cache/log_cache.json`;
let logCache = [];

//Generate empty cache file if not present
if(!fs.existsSync(cacheFilePath)) {
    fs.writeFileSync(cacheFilePath, JSON.stringify([]));
}

const cacheStoreInterval = setInterval(() => {
    if(logCache.length > 0) {
        console.log('stored cache');

        let cacheFile = JSON.parse(fs.readFileSync(cacheFilePath, `utf8`));

        let logCacheTemp = logCache;
        logCache = [];

        for (let i in logCacheTemp) {
            cacheFile.push(logCacheTemp[i]);
        }

        fs.writeFileSync(cacheFilePath, JSON.stringify(cacheFile, null, 4));
    }
}, 60000)

export default (message) => {

    let log = false;

    for(let i in botSettings.logGuilds) {
        if(botSettings.logGuilds[i] === message.guild.id) {
            log = true;
            break;
        }
    }

    if(!log) return 0;

    let event = {
        message: message.content,
        author: {
            id: message.author.id,
            username: message.author.username,
            displayname: message.member.displayName
        },
        guild: {
            id: message.guild.id,
            name: message.guild.name
        },
        channel: {
            name: message.channel.name
        },
        createdTimestamp: message.createdTimestamp
    }

    logCache.push(event);

}