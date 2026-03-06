const axios = require("axios");

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3010';

const getPingCounter = async () => {
    let pings = -1;
    try {
        const res = await axios({
            method: 'get',
            url: BACKEND_URL + '/pings',
            timeout: 1000,
        });
        pings = JSON.parse(res.data).pings;
    } catch (error) {
    }
    return pings;
}

module.exports = {getPingCounter}