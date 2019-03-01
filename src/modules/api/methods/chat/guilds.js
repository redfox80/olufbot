import { checkToken } from "../auth";
import { guildLog } from "../../../db/models/index";

export default async (req, res) => {
    if(!checkToken(req)) {
        res.sendStatus(403);
        return 0;
    }

    let guilds = await guildLog.findAll()
        .then(r => { return r })
        .catch(err => console.error(err));

    res.send(guilds);

    return 0

}

export async function addGuildToLog(req, res) {
    
}

export async function removeGuildToLog(req, res) {

}