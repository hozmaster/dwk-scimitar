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

const setupDatabase = async () => {
    const client = await gPool.connect();
    const res = await gPool.query(`SELECT datname
                                  FROM pg_catalog.pg_database
                                  WHERE datname = '${DB_NAME}'`);
    if (res.rowCount === 0) {
        console.log(`${DB_NAME} database not found, creating it.`);
        await client.query(`CREATE DATABASE "${DB_NAME}";`);
        console.log(`${DB_NAME} database not found, creating it.`);
    } else {
        console.log(`${DB_NAME} database already exists.`);
    }

    await client.query("CREATE TABLE if not exists pingpong AS SELECT * FROM (VALUES (1, 0)) AS t(id, count) WITH DATA;");
}

const getPingCounter = async () => {
    const client = await gPool.connect();
    const result = await client.query('SELECT count FROM pingpong');
    await client.release(true);
    return result.rows[0].count;
}

module.exports = {setupDatabase, getPingCounter, gPool};
