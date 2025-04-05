const Redis = require('ioredis');

const writeClient = new Redis()

module.exports = writeClient