const router = require('express').Router();
const {getPingCounter, increasePongByOne} = require("./support");

router.get('/', async (req, res) => {
    console.log ("backend: /");
    res.sendStatus(200);
});

router.get('/pingpong', async (req, res) => {
    console.log ("backend: /pingpong");
    try {
        let pongs = await increasePongByOne();
        res.send(`Pong: ${pongs}\n`);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/pings', async (req, res) => {
    console.log ("backend: /pings");
    try {
        let pongs = await getPingCounter();
        res.setHeader('Content-Type', 'application/json');
        res.json({pings: pongs});
    } catch (error) {
        console.log(error);
        res.sendStatus(503);
    }
});

router.get('/healthZ', async (req, res) => {
    console.log ("backend: /healthZ");
    try {
        let pongs = await getPingCounter();
        if (pongs) {
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(503);
    }
});

module.exports = router;