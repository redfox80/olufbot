import * as vc from "../../services/voice/voice.js";
import {play as dPlay, stop as dStop} from "../../services/voice/player.js";

export function join(message, args) {

    let cid = null;

    if(args) {
        if(args[0]) {
            cid = args[0];
        }
    }

    vc.join(message, cid);

}

export function leave(message, args) {
    
    let cid = null;

    if(args) {
        if(args[0]) {
            cid = args[0];
        }
    }

    vc.leave(message, cid);
}

export function play(message, args) {

    let gid = message.guild.id;

    if(args) {
        if(args[0]) {
            gid = args[0];
        }
    }

    dPlay(gid);

    message.react("✅");

}

export function stop(message, args) {

    let gid = message.guild.id;

    if(args) {
        if(args[0]) {
            gid = args[0];
        }
    }


    dStop(gid);

    message.react("✅");

}