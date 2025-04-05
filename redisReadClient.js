const Redis = require('ioredis')

const readClient = new Redis();

module.exports = readClient