import config from "../../../data/config.json";
import fs from "fs";
import http from "http";
import https from "https";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { verifyInput } from "./helpers";
import { routes } from "./routes";

//Becayse, exports
export default () => {
    return ":)";
}

//If api is not enabled in config don't do anything...
if(config.api.enabled) {

    //Define stuff
    const apiServer = express();
    const port = config.api.port;
    const sPort = config.api.sPort;
    
    //Apply middlewares
    apiServer.use('*', cors({origin: true}))
    apiServer.use('/api', bodyParser.urlencoded({ extended: true }));
    apiServer.use('/api', bodyParser.json());
    apiServer.use('/api', verifyInput);
    
    //Routes defined in routes.js
    routes(apiServer);
    
    //Options for https module
    const options = {
        key: fs.readFileSync(config.api.key),
        cert: fs.readFileSync(config.api.cert)
    };
    
    // apiServer.listen(port, () => console.log(`API listening on port ${port}`));
    http.createServer(apiServer).listen(port);
    https.createServer(options, apiServer).listen(sPort);

}