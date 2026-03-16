const {gPool} = require("../db/database");

async function getPingCounter() {
    const client = await gPool.connect();
    const counter = await client.query('SELECT count FROM pingpong where id = 1;', []);
    const theCount = counter.rows[0].count;
    await client.release(true);
    return theCount;
}

async function increasePongByOne() {
    const client = await gPool.connect();
    const counter = await client.query('UPDATE pingpong SET count = count + 1 where id = 1 RETURNING count;');
    const pongs = counter.rows[0].count;
    await client.release(true);
    return pongs;
}

module.exports = {getPingCounter, increasePongByOne}