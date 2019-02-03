import {ServersToJoin, ServersToLeave} from './voice.js';
import {bot as client} from '../../main';

export default async () => {

    //Join channels select with join command
    setInterval(() => {
        let shouldJoin = ServersToJoin();
        let shouldLeave = ServersToLeave();

        if(shouldJoin.length < 1 && shouldLeave.length < 1) return 0;

        for(let i in shouldJoin) {
            client.channels.get(shouldJoin[i]).join()
                .catch(err => {
                    console.error(err);
                });
        }

        for(let i in shouldLeave) {
            client.channels.get(shouldLeave[i].disconnect())
                .catch(err => {
                    console.error(err);
                });
        }

    }, 1500);
}