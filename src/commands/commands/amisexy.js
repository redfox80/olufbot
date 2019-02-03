import fs from "fs";
// import {test as sqltest} from "../../modules/db/mysql.js";

let cache = [];

export const definition = {
    command: "amisexy",
    name: "Am I sexy",
    description: "Determines wether you are sexy or not, will Oluf find you worthy?",
}

export default function(message, args=null) {

    const cacheFilePath = `${__dirname}/../../cache/amisexy_cache.json`;
    
    //Load cache file if it exists
    if(fs.existsSync(cacheFilePath)) {
        cache = JSON.parse(fs.readFileSync(cacheFilePath, `utf8`));
    } else {
        fs.writeFileSync(cacheFilePath, JSON.stringify("[]"));
    }

    //Check for arguments and run appropiate function if present
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

    //Declaring for later use
    let user = false;

    //Check if user is allready in cache
    for(let i in cache) {
        if(cache[i].id == message.author.id) {
            user = cache[i];
            break;
        }
    }

    //If not in cache, create new cache object
    if(!user) {
        let rand = Math.random();
        user = {
            id: message.author.id,
            username: message.author.username,
            displayname: message.member.displayName,
            sexy: (rand > 0.7) ? true:false,
        }
        cache.push(user);

        //Write changes to cache
        fs.writeFile(cacheFilePath, JSON.stringify(cache, null, 4), error => {
            if(error) console.log(error.stack);
        });
    }

    //Determine appropiate response
    let response = user.sexy ? `${message.member.displayName} IS HELLA SEXY!`:'HELL NO!';

    //Respond
    message.channel.send(response);

}

//Prints out cache
function printCache (message) {
    let response = "";

    for(let i in cache) {
        response = `${response}${cache[i].id} - ${cache[i].displayname}: ${cache[i].sexy}\n`;
    }

    response = `${response}\n`;

    if(response != "\n" && response != null) {
        message.channel.send(response);
    } else {
        message.channel.send('Cache is empty');
    }
}

//Clears cache if authorized user
function clearCache(message) {

    if(message.author.id != "203851266453929984") {
        message.channel.send('You do not have permission to do this!');
        return 0;
    }

    cache = [];
    fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 4), error => {
        if(error) console.log(error.stack);
    });

    message.channel.send('Cache cleared!');
}