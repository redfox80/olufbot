import { ChatLog, sequelize, Sequelize } from "../../../db/models/index";
import { checkToken } from "../auth";

export default async (req, res) => {
    if(!checkToken(req)) {
        res.sendStatus(403);
        return 0;
    }

    let query = "SELECT * FROM olufbot.ChatLogs";
    
    if(req.body.queryParams) {

        if(typeof(req.body.queryParams.guild) === "string") console.log('1');

    }

    // query += " LIMIT 4";

    let logs = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
        .then(res => { return res; })
        .catch(err => { console.error(err); });

        res.send(logs);
        
        return 0;
}