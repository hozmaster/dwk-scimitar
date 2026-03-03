const crypto = require("crypto");

const generateUUIDHash = () => {
    return crypto.randomUUID()
}

const generateShortHash = () => {
    return Math.random().toString(36).slice(2)
}

module.exports = {generateUUIDHash, generateShortHash}