import {bot} from "../../main.js";

let players = [];
const mummiPath =  `${__dirname}/../../data/audio/mummi.mp3`;

//Play
export async function play(gid, message=null) {

    //Chack if something is allready playing in users voice channel
    let cp = players.find(dispatcher => dispatcher.connection.channel.guild.id === gid);

    //If something is currently playing then stop it
    if(cp != null) {
        cp.dispatcher.end();
    }

    //Get the active connection
    let connection = bot.voiceConnections.find(connection => connection.channel.guild.id === gid);

    //Play a file

    let dispatcher;
    try {

        dispatcher = connection.playFile(mummiPath)
            .on('start', () => {
                dispatcher.setVolume(0.3);
            })
            .on('end', () => {
                players.splice(players.findIndex(player => player.connection.channel.guild.id === gid), 1);
            });

    } catch (error) { console.error(error); }

    //Push to players array
    players.push({
        dispatcher: dispatcher,
        connection: connection
    });
}

export async function stop(gid) {
    
    let cp = players.find(ob => ob.connection.channel.guild.id === gid);

    if(cp != null) {

        cp.dispatcher.setVolume(0);
        cp.dispatcher.end();
    }
}