const fs = require('node:fs');

const configFile = '/config/information.txt';

const getConfigData = async () => {
    let  configData = '';
    try {
        if (fs.existsSync(configFile)) {
            configData = fs.readFileSync(configFile, {encoding: 'utf8', flag: 'r'});
        }
    } catch (error) {
        console.log(error);
    }
    return configData;
}

module.exports = {getConfigData}