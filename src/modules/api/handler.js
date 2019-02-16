import fs from "fs";
import http from "http";
import https from "https";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { routes } from "./routes";

const apiServer = express();
const port = 8080;
const sPort = 8443;

//Becayse, exports
export default () => {
    return ":)";
}

//Apply middlewares
apiServer.use('*', cors({origin: true}))
apiServer.use('/api', bodyParser.urlencoded({ extended: true }));
apiServer.use('/api', bodyParser.json());

//Routes defined in routes.js
routes(apiServer);

const options = {
    key: fs.readFileSync('/webdev/STAR-fungy-no/server.key'),
    cert: fs.readFileSync('/webdev/STAR-fungy-no/STAR-fungy-no.crt')
};

// apiServer.listen(port, () => console.log(`API listening on port ${port}`));
http.createServer(apiServer).listen(port);
https.createServer(options, apiServer).listen(sPort);