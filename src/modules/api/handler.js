import fs from "fs";
// import https from "https";
import express from "express";
import bodyParser from "body-parser";

const apiServer = express();
const port = 8080;

export default () => {
    return ":)";
}

apiServer.use('/api', bodyParser.json());

apiServer.post('/api', (req, res) => {

    if(req.body.token) {

        if(req.body.token === "Joakim er kul!") {
            let a = req.body.a;
            let b = req.body.b;

            let result = a + b;

            res.send(JSON.stringify(result));
        } else {
            res.sendStatus(403);
        }

    } else {
        res.sendStatus(400);
    }

});

apiServer.get('*', (req, res) => {
    res.status(200).send('OK');
});

const options = {
    key: fs.readFileSync('/webdev/STAR-fungy-no/server.key'),
    cert: fs.readFileSync('/webdev/STAR-fungy-no/cerver.crt')
}

apiServer.listen(port, () => console.log(`API listening on port ${port}`));
// https.createServer(app).listen(8443);