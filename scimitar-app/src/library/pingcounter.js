const axios = require("axios");

const getPingCounter = async () => {
    const res = await axios({
        method: 'get',
        url: 'http://scimitar-backend-svc.exercises:2346/pings',
    });
    return JSON.parse(res.data).pings;
}

module.exports = {getPingCounter}