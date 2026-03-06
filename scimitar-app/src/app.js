const express = require('express');

const {generateUUIDHash} = require("./library/hashgenerator");
const {getPingCounter} = require("./library/pingcounter");
const {getConfigData} = require("./library/config");

const message = process.env.MESSAGE;
const app = express();
let hashCode = '';
getConfigData().then(() => {
    hashCode = generateUUIDHash();
});

app.get('/', async (req, res) => {
    const d = new Date();
    const configData = await getConfigData();
    const hashString = d.toISOString() + '&#160;&#160;&#160;' + hashCode;
    const pings = await getPingCounter();
    const reply = `file content: ${configData} <br>` +
        `env variable: MESSAGE=${message} <br>` +
        `${hashString} <br>` +
        `Ping / Pongs: ${pings} <br>`;
    res.send(reply);
})

app.get('/healthZ', async (req, res) => {
    // Rude, but should enough to work for health check
    let statusCode = 200;
    try {
        const pings = await getPingCounter();
        if (pings === -1) {
            statusCode = 500;
        }
    } catch (error)  {
        res.status(500).send({"healthZ": "failed"})
    }
    res.send(statusCode);
})

module.exports = app;