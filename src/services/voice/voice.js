import {bot} from '../../main.js';

export function join(message, cid=null) {

    if(cid != null && message.author.id === "203851266453929984") {
        bot.channels.get(cid).join()
            .catch(err => {
                console.error(err);
            });
        return 0;
    }

    if(!message.member.voiceChannel) {
        message.channel.send('You must be in a voice channel!');
        return 0;
    }

    message.member.voiceChannel.join();

}

export function leave(message, cid=null) {

    if(cid != null && message.author.id === "203851266453929984") {
        let vc = bot.voiceConnections.find(connection => connection.channel.id === cid);
        vc.channel.leave();
        return 0;
    }

    if(!message.member.voiceChannel) {
        message.channel.send('No Voice channel specified');
        return 0;
    }

    message.member.voiceChannel.leave();
}