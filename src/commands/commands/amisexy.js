import fs from "fs";

export default function(message, args=null) {

    let cache = null;
    
    fs.exists(`amisexy_cache.json`, exists => {
        if(exists) {
            cache = fs.readFile(`amisexy_cache.json`);
        }
    });

    if(args) {
        if(args[0] === "cache") {

            if(args[1] === "print") {

                printCache(message);
                return 0;

            } else if (args[1] === "clear") {

                clearCache(message);
                return 0;

            }

        }
    }

    let newUser = true;
    let user = false;

    for(let i = 0; i < cache.length; i++) {
        if(cache[i].id = message.author.id) {
            newUser = false;
            user = cache[i];
            break;
        }
    }

    if(newUser) {
        let rand = Math.random();
        user = {
            id: message.author.id,
            sexy: (rand > 0.7) ? true:false,
        }
        cache.push(user);
    }

    async () => {
        fs.writeFile(`amisexy_cache.json`, cache);
        return 0;
    }

    let response = user.sexy ? 'HELL YEAH BITCH!':'HELL NO!';

    message.channel.send(response);

}

function printCache (message) {
    let response = "";

    for(let i = 0; i < cache.length; i++) {
        response = `${response}${cache[i].id}: ${cache[i].sexy}\n`;
    }

    response = `${response}\n`;

    if(response != "\n" && response != null) {
        message.channel.send(response);
    } else {
        message.channel.send('Cache is empty');
    }
}

function clearCache(message) {

    if(message.author.id != "203851266453929984") {
        message.channel.send('You do not have permission to do this!');
        return 0;
    }

    cache = [];
    message.channel.send('Cache cleared!');
}