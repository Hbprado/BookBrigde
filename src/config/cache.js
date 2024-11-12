const redis = require('redis');
const client = redis.createClient();

//Implementação do cacher com redis
client.on('error', (err) => console.error('Redis Client Error', err));

client.connect().then(() => console.log('Connected to Redis'));

module.exports = client;
