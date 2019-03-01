import { verifyString } from "./helpers";
import authMethod from "./methods/auth";
import test from "./methods/test";
import getLogs from "./methods/chat/chat";
import getLogsGuilds, { addGuildToLog, removeGuildToLog } from "./methods/chat/guilds";

export function routes(apiServer) {

    //Auth routes
    apiServer.post('/api/auth', (req, res) => authMethod(req, res));
    apiServer.post('/api/test', (req, res) => test(req, res));
    

    //Chat logs
    apiServer.post('/api/chat', (req, res) => getLogs(req, res));
    
    apiServer.post('/api/chat/guilds', (req, res) => getLogsGuilds(req, res));
    apiServer.post('/api/chat/guilds/add', (req, res) => addGuildToLog(req, res));
    apiServer.post('/api/chat/guilds/remove', (req, res) => removeGuildToLog(req, res));

}