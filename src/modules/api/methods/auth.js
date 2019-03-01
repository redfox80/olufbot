import crypto from "crypto";
import config from "../../../../data/config.json";
import { User } from "../../db/models/index";

let sessions = [];

export default async (req, res) => {

    //Validate input format
    if(typeof(req.body.username) !== 'string' || typeof(req.body.password) !== 'string') {
        res.status(400).send('Bad Request');
        return 0;
    }

    //Check password
    const hash = crypto.createHmac('sha512', config.hashSecret);
    hash.update(req.body.password);
    const hashed = hash.digest("hex");

    //Find user in db
    let user = await User.findOne({
            where: {
                username: req.body.username,
                password: hashed
            },
            attributes: [
                'id',
                'username'
            ]
        })
        .then(user => {
            return user;
        });

    //If no match in DB send 403 status
    if(!user) {
        res.status(403).send('Invalid credentials');
        return 0;
    }

    //Valid chars for a random token
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    //Generate random token
    for(let i = 0; i < 30; i++) {
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    //Response to client
    let rjson = {
        token: token,
        time: new Date()
    }


    console.log(JSON.stringify(rjson));
    
    //Add token to sessions list and send to client
    sessions.push(rjson);
    res.json(rjson);

    return 0;

}

export function checkToken(req) {
    if(typeof(req.body.token) !== 'string') {
        return false;
    }

    for(let i in sessions) {
        if(sessions[i].token === req.body.token) {
            return true;
        }
    }

    return false;
}