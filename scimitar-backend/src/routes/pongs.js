const {gPool, getPingCounter} = require("../db/database");
const router = require('express').Router();

router.get('/pingpong', async (req, res) => {
    let pongCounter = await getPingCounter();
    pongCounter++;
    const client = await gPool.connect();
    const result = await client.query('UPDATE pingpong SET count = $1 where id = 1;', [pongCounter]);
    await client.release(true);
    res.send(`Pong: ${pongCounter}\n`);
});

router.get('/pings', async (req, res) => {
    const client = await gPool.connect();
    const counter = await client.query('SELECT count FROM pingpong');
    await client.release(true);
    res.json(JSON.stringify({
        'pings': counter
    }));
});


module.exports = router;