const { createClient } = require("ioredis");

const redisClient = createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379,
    },
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

module.exports = {
    redisClient
};