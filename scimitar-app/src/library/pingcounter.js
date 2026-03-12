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
        const response = res.data;
        pings = response.pings;
    } catch (error) {
        console.error(error);
    }
    return pings;
}

module.exports = {getPingCounter}