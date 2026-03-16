const app = require("../app");
const {getPingCounter, increasePongByOne} = require("./support");
const {gPool} = require("../db/database");
const router = require('express').Router();

router.get('/pingpong', async (req, res) => {
    try {
        let pongs = await increasePongByOne();
        res.send(`Pong: ${pongs}\n`);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/pings', async (req, res) => {
    try {
        let pongs = await getPingCounter();
        res.setHeader('Content-Type', 'application/json');
        res.json({pings: pongs});
    } catch (error) {
        console.log(error);
        res.sendStatus(503);
    }
});


module.exports = router;