const amqp = require("amqplib");

let channel;
let connection;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect("amqp://127.0.0.1:5672")

        channel = await connection.createChannel();

        console.log("RabbitMQ Connected");

    } catch (error) {
        console.error("RabbitMQ Error:", error.message);
        process.exit(1);
    }
};

const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    return channel;
};

module.exports = {
    connectRabbitMQ,
    getChannel,
};