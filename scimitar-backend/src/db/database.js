const Pool = require('pg').Pool;

const DB_NAME = process.env.DB_NAME || 'postgres';
const DB_USER = process.env.DB_USER || 'admin';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin';

const gPool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: 5432,
})

const getPingCounter = async () => {
    const client = await gPool.connect();
    const result = await client.query('SELECT count FROM pingpong');
    await client.release(true);
    return result.rows[0].count;
}

module.exports = {setupDatabase, getPingCounter, gPool};
