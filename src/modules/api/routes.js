import authMethod from "./methods/auth";
import test from "./methods/test";
import getLogs from "./methods/chat/chat";
import getLogsGuilds from "./methods/chat/guilds";

export function routes(apiServer) {

    apiServer.post('/api', (req, res) => {
    
        if(req.body.token) {
    
            if(req.body.token === "Joakim er kul!") {
                let a = req.body.a;
                let b = req.body.b;
    
                let result = a + b;
    
                res.send(JSON.stringify(result));
            } else {
                res.status(403).send('Denied');
            }
    
        } else {
            res.status(400).send('Bad Request');
        }
    
    });

    apiServer.post('/api/auth', (req, res) => { authMethod(req, res); });
    apiServer.post('/api/test', (req, res) => { test(req, res); });
    
    apiServer.post('/api/chat', (req, res) => { getLogs(req, res); })
    apiServer.post('/api/chat/guilds', (req, res) => getLogsGuilds(req, res));
    

    apiServer.get('/', (req, res) => {
        res.status(200).send('OK');
    });

}